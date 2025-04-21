import {useState, useRef, JSX, ElementType} from 'react'
import {useDrop} from 'react-dnd'
import FormRow from './FormRow'
import FormElementPreview from './FormElementPreview'
import {
	DragItem,
	FormElement,
	FormElementProperties,
	HoverPosition,
	Position,
} from '../../interfaces'
import {calculateDropElements, calculateResizeElements} from './helpers'
import {Icon} from '@iconify/react/dist/iconify.js'

function DropForm() {
	const HOVER_DEBONCE_TIME = 150
	const dropAreaRef = useRef<HTMLDivElement | null>(null)
	const rowsRef = useRef<(HTMLDivElement | null)[]>([])
	const [elements, setElements] = useState<FormElement[]>([])
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
			if (y > lastRowRect.bottom) {
				calculatedRow = formRows.length
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
				// const relX = offset.x
				// const relY = offset.y

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

				if (!item.id) {
					setElements((prev) => calculateDropElements(item, prev, targetRow))
				}

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
		setElements((prevElements) =>
			calculateResizeElements(prevElements, id, newWidth)
		)
	}

	const handlePropertiesChange = (
		id: string,
		newProperties: FormElementProperties
	) => {
		const index = elements.findIndex((el) => el.id === id)

		if (index !== -1) {
			setElements((prev) => {
				const updatedElements = [...prev]
				updatedElements[index] = {
					...updatedElements[index],
					properties: {...newProperties},
				}
				return updatedElements
			})
		}
	}

	const handleRemoveComponent = (id: string) => {
		const index = elements.findIndex((el) => el.id === id)

		if (index !== -1) {
			setElements((prev) => {
				const updatedElements = [...prev]
				const elementToRemove = updatedElements[index]

				const newElementsWithoutRemovedElement = updatedElements.filter(
					(el) => el.id !== id
				)

				const elementsInSameRow = newElementsWithoutRemovedElement.filter(
					(el) => el.row === elementToRemove.row && el.id !== id
				)

				return newElementsWithoutRemovedElement.map((el) => {
					if (el.row !== elementToRemove.row) return el

					return {
						...el,
						width: 100 / elementsInSameRow.length,
					}
				})
			})
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

	return (
		<div
			ref={combineRefs}
			className={`h-full rounded-lg shadow-sm w-full bg-white relative ${
				isOver ? 'bg-blue-100' : ''
			}`}
		>
			<div className="mx-6 mt-4 flex flex-col justify-start items-start gap-1 mb-2">
				<input
					className="focus:outline-0 text-xl font-semibold"
					value={'My Form'}
				/>
				<button className="text-blue-400 cursor-pointer font-semibold">
					Add description
				</button>
			</div>
			{
				<div className="p-4">
					{renderRows()}
					<FormElementPreview
						type={previewState.type as ElementType | null}
						position={previewState.position}
						isVisible={isOver}
					/>
				</div>
			}
			{elements.length === 0 && !isOver && (
				<div className="h-full w-full flex flex-col -mt-20 items-center font-semibold text-lg justify-center text-slate-400">
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
