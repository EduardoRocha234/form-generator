import {useRef, useState} from 'react'
import {useDrag} from 'react-dnd'
import type {
	FormElement,
	FormElementProperties,
} from '../../interfaces/drop-form.interface'
import {
	SingleLineElement,
	MultilineElement,
	NumberElement,
} from './FormElements'
import {Icon} from '@iconify/react/dist/iconify.js'

interface FormElementEditorProps {
	element: FormElement
	elements: FormElement[]
	onWidthChange: (id: string, width: number) => void
	handlePropertiesChange: (
		id: string,
		properties: FormElementProperties
	) => void
	handleRemoveComponent: (id: string) => void
}

function FormElementEditor({
	element,
	elements,
	onWidthChange,
	handlePropertiesChange,
	handleRemoveComponent,
}: FormElementEditorProps) {
	const {id, type, width} = element
	const containerRef = useRef<HTMLDivElement>(null)
	const [isResizing, setIsResing] = useState<boolean>(false)
	const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)

	const toggleDropdownVisible = () => setDropdownVisible(!dropdownVisible)

	const lastElementoOfRow = elements[elements.length - 1]
	const isLastElementOfRow = lastElementoOfRow
		? lastElementoOfRow.id === id
		: false

	const [{isDragging}, dragRef] = useDrag(() => ({
		type: 'FORM_ELEMENT',
		item: {type, id},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	const handleMouseDown = (event: React.MouseEvent) => {
		const container = containerRef.current
		if (!container) return

		const parent = container.offsetParent as HTMLElement
		const parentWidth = parent?.offsetWidth || 1

		setIsResing(true)
		const startX = event.clientX
		const startWidthPx = container.offsetWidth

		document.body.style.cursor = 'col-resize'

		const handleMouseMove = (e: MouseEvent) => {
			const dx = e.clientX - startX
			const newWidthPx = startWidthPx + dx
			const newWidthPercent = Math.floor((newWidthPx / parentWidth) * 100)
			const clamped = Math.max(10, Math.min(newWidthPercent, 100))
			onWidthChange(id, clamped)
			container.style.width = `${clamped}%`
		}

		const handleMouseUp = () => {
			setIsResing(false)

			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)

			document.body.style.cursor = 'default'
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<div
			ref={containerRef}
			className={`p-2 bg-white rounded mb-2 relative hover:bg-slate-100 transition-all pr-4 group ${
				isDragging ? 'opacity-50' : ''
			} ${isResizing ? '!bg-slate-100' : ''}`}
			style={{width: `${width}%`}}
		>
			{dragRef(
				<div>
					{type === 'singleLine' && (
						<SingleLineElement
							id={id}
							properties={element.properties}
							handlePropertiesChange={handlePropertiesChange}
						/>
					)}
					{type === 'multiline' && <MultilineElement id={id} />}
					{type === 'number' && <NumberElement id={id} />}
				</div>
			)}

			<div className="absolute top-2 right-4 flex gap-3 items-center opacity-0 group-hover:opacity-100 transition-all">
				{width >= 25 && (
					<span
						className="size-5 text-red-400 hover:text-red-600 cursor-pointer transition-all"
						title="Remove component"
						onClick={() => handleRemoveComponent(id)}
					>
						<Icon
							icon={'mdi:trash-outline'}
							className="h-full w-full"
						/>
					</span>
				)}
				<span
					className="size-5 text-slate-500 hover:text-slate-600 cursor-pointer transition-all relative"
					onClick={() => toggleDropdownVisible()}
				>
					<Icon
						icon={'mdi:dots-vertical'}
						className="h-full w-full"
					/>
					{dropdownVisible && (
						<div className="absolute bg-white min-w-[10rem] z-30 shadow-md border border-slate-200 rounded-md ">
							<ul className="py-2 px-2">
								<li className="hover:bg-slate-100 p-2 rounded-md text-sm">
									Set placeholder
								</li>
								<li className="hover:bg-slate-100 p-2 rounded-md text-sm">
									Set default value
								</li>
								{width < 25 && (
									<li
										className="hover:bg-slate-100 p-2 rounded-md text-sm"
										onClick={() => handleRemoveComponent(id)}
									>
										Remove component
									</li>
								)}
							</ul>
						</div>
					)}
				</span>
			</div>

			{!isLastElementOfRow && (
				<div
					onMouseDown={handleMouseDown}
					className={`absolute top-0 right-0 h-full w-2 cursor-col-resize bg-blue-300 opacity-0 hover:opacity-100 ${
						isResizing && 'opacity-100'
					}`}
				/>
			)}
		</div>
	)
}

export default FormElementEditor
