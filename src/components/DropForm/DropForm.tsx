import {useState, useRef, JSX, ElementType, useEffect} from 'react'
import {useDrop} from 'react-dnd'
import {Icon} from '@iconify/react/dist/iconify.js'
import type {
	DynamicForm,
	FormElement,
	FormElementProperties,
} from '@/core/interfaces'
import {calculateDropElements, calculateResizeElements} from './helpers'
import {useUndoRedoContext} from '@/contexts/UndoRedoContext'
import FormRow from './FormRow'
import FormElementPreview from './FormElementPreview'
import { DragItem, HoverPosition, Position } from '@/types'

interface DropFormProps {
	form?: DynamicForm
	setForm: (form: DynamicForm) => void
}

function DropForm({form, setForm}: DropFormProps) {
	const HOVER_DEBONCE_TIME = 150

	const dropAreaRef = useRef<HTMLDivElement | null>(null)
	const rowsRef = useRef<(HTMLDivElement | null)[]>([])

	const {elements, setElements, undo, redo} = useUndoRedoContext()
	const [previewState, setPreviewState] = useState<{
		elements: FormElement[] | null
		position: Position
		type: ElementType | null
	}>({
		elements: null,
		position: {x: 0, y: 0},
		type: null,
	})
	const [lastHoverPosition, setLastHoverPosition] =
		useState<HoverPosition | null>(null)
	const [inputDescriptionVisible, setInputDescriptionVisible] =
		useState<boolean>(false)

	const getStableTargetRow = (
		x: number,
		y: number,
		formRows: NodeListOf<Element>,
		currentTime: number
	) => {
		let calculatedRow = 0
		let minDistance = Infinity

		formRows.forEach((rowElem, idx) => {
			const rect = rowElem.getBoundingClientRect()
			const rowMiddle = rect.top + rect.height / 2
			const distance = Math.abs(y - rowMiddle)

			if (distance < minDistance) {
				minDistance = distance
				calculatedRow = idx
			}
		})

		let shouldCreateNewRow = false
		if (formRows.length > 0) {
			const lastRowRect = formRows[formRows.length - 1].getBoundingClientRect()

			if (y > lastRowRect.bottom + 10) {
				calculatedRow = formRows.length + 1
				shouldCreateNewRow = true
			}
		}

		if (
			lastHoverPosition &&
			currentTime - lastHoverPosition.timestamp < HOVER_DEBONCE_TIME &&
			Math.abs(y - lastHoverPosition.y) < 20 &&
			!shouldCreateNewRow
		) {
			return lastHoverPosition.row
		}

		setLastHoverPosition({
			x,
			y,
			row: calculatedRow,
			timestamp: currentTime,
		})

		return calculatedRow
	}

	const [{isOver}, dropRef] = useDrop(
		() => ({
			accept: 'FORM_ELEMENT',

			hover: (item: DragItem, monitor) => {
				const offset = monitor.getClientOffset()
				if (!dropAreaRef.current || !offset) return

				const currentTime = Date.now()
				const formRows = document.querySelectorAll('.form-row')

				const targetRow = getStableTargetRow(
					offset.x,
					offset.y,
					formRows,
					currentTime
				)

				const previewElements = calculateDropElements(
					item,
					elements,
					targetRow,
					true
				)

				const dropRect = dropAreaRef.current.getBoundingClientRect()
				const relX = offset.x - dropRect.left
				const relY = offset.y - dropRect.top

				setPreviewState({
					elements: previewElements,
					position: {x: relX, y: relY},
					type: item.type as ElementType | null,
				})
			},

			drop: (item: DragItem, monitor) => {
				const offset = monitor.getClientOffset()
				if (!dropAreaRef.current || !offset) return

				const formRows = document.querySelectorAll('.form-row')
				const targetRow = getStableTargetRow(
					offset.x,
					offset.y,
					formRows,
					Date.now()
				)

				const updatedElements = calculateDropElements(item, elements, targetRow)

				setElements(updatedElements)

				setPreviewState({
					elements: null,
					position: {x: 0, y: 0},
					type: null,
				})

				setLastHoverPosition(null)
			},

			collect: (monitor) => ({
				isOver: monitor.isOver(),
			}),
		}),
		[elements, lastHoverPosition]
	)

	const combineRefs = (el: HTMLDivElement | null) => {
		dropRef(el)
		dropAreaRef.current = el
	}

	const handleWidthChange = (id: string, newWidth: number) => {
		setElements(calculateResizeElements(elements, id, newWidth))
	}

	const handlePropertiesChange = (
		id: string,
		newProperties: FormElementProperties
	) => {
		const index = elements.findIndex((el) => el.id === id)

		if (index !== -1) {
			const updatedElements = [...elements]
			updatedElements[index] = {
				...updatedElements[index],
				properties: {...newProperties},
			}

			setElements(updatedElements)
		}
	}

	const handleRemoveComponent = (id: string) => {
		const index = elements.findIndex((el) => el.id === id)

		if (index !== -1) {
			const updatedElements = [...elements]
			const elementToRemove = updatedElements[index]

			const newElementsWithoutRemovedElement = updatedElements.filter(
				(el) => el.id !== id
			)

			const elementsInSameRow = newElementsWithoutRemovedElement.filter(
				(el) => el.row === elementToRemove.row && el.id !== id
			)

			const newElementsList = newElementsWithoutRemovedElement.map((el) => {
				if (el.row !== elementToRemove.row) return el

				return {
					...el,
					width: 100 / elementsInSameRow.length,
				}
			})

			setElements(newElementsList)
		}
	}

	const elementsToRender =
		isOver && previewState.elements ? previewState.elements : elements

	const renderRows = (): JSX.Element[] => {
		const rows: Record<number, FormElement[]> = {}
		elementsToRender.forEach((el) => {
			if (!rows[el.row]) rows[el.row] = []
			rows[el.row].push(el)
		})

		return Object.keys(rows).map((rowNumStr) => {
			const rowNum = parseInt(rowNumStr, 10)
			return (
				<FormRow
					key={`row-${rowNum}`}
					elements={rows[rowNum]}
					rowNumber={rowNum}
					onWidthChange={handleWidthChange}
					handlePropertiesChange={handlePropertiesChange}
					handleRemoveComponent={handleRemoveComponent}
					rowRef={(el: HTMLDivElement | null) => {
						if (el) {
							rowsRef.current[rowNum] = el
						}
					}}
				/>
			)
		})
	}

	const onSetFormTitle = (value: string) => {
		if (!form) return

		setForm({...form, title: value})
	}

	const onSetFormDescription = (value: string) => {
		if (!form) return

		setForm({...form, description: value})
	}

	const setIntialValues = () => {
		if (!form) return

		if (form.description.length) setInputDescriptionVisible(true)

		setElements(form.elements)
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === 'z') {
				undo()
			} else if (
				e.ctrlKey &&
				(e.key === 'y' || (e.shiftKey && e.key === 'Z'))
			) {
				redo()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [undo, redo])

	useEffect(() => {
		if (!form) return

		setForm({...form, elements: elements})
	}, [elements])

	useEffect(() => {
		setIntialValues()
	}, [form])

	return (
		<div
			ref={combineRefs}
			className={`min-h-full rounded-lg shadow-sm w-full bg-white relative p-4 ${
				isOver ? 'bg-blue-100' : ''
			}`}
		>
			<div className="flex flex-col justify-start items-start gap-1 mb-4 ml-2">
				<input
					className="focus:outline-0 text-xl font-semibold"
					value={form?.title || ''}
					onChange={(e) => onSetFormTitle(e.target.value)}
				/>
				{!inputDescriptionVisible && (
					<button
						className="text-blue-400 cursor-pointer font-semibold"
						onClick={() => setInputDescriptionVisible(true)}
					>
						Add description
					</button>
				)}
				{inputDescriptionVisible && (
					<textarea
						className="focus:outline-0  text-slate-600 w-full appearance-none resize-none"
						placeholder="Type a description here..."
						value={form?.description || ''}
						onChange={(e) => onSetFormDescription(e.target.value)}
					/>
				)}
			</div>
			{
				<div>
					{renderRows()}
					{previewState.type && isOver && (
						<FormElementPreview
							type={previewState.type}
							position={previewState.position}
						/>
					)}
				</div>
			}
			{elements.length === 0 && !isOver && (
				<div className="h-full w-full flex flex-col mt-10 items-center font-semibold text-lg justify-center text-slate-400">
					<Icon
						icon={'ri:drag-drop-line'}
						className="size-20 "
					/>
					Drag an Drop components here
				</div>
			)}
		</div>
	)
}

export default DropForm
