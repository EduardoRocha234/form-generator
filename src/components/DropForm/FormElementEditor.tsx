import React, {useRef, useState} from 'react'
import classNames from 'classnames'
import {useDrag} from 'react-dnd'
import {Icon} from '@iconify/react/dist/iconify.js'
import type {
	BaseElementProps,
	FormElement,
	FormElementProperties,
} from '@/interfaces'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import PopoverElementContent from './FormElementEditorPopoverContent'

const componentMap: Record<
	string,
	React.LazyExoticComponent<React.ComponentType<BaseElementProps>>
> = {
	singleLine: React.lazy(() => import('./FormElements/SigleLineElement')),
	number: React.lazy(() => import('./FormElements/NumberElement')),
	multiline: React.lazy(() => import('./FormElements/MultiLineElement')),
}

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

	// const toggleDropdownVisible = () => setDropdownVisible(!dropdownVisible)

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

	const Component = componentMap[type]

	return (
		<div
			ref={containerRef}
			className={classNames(
				'p-2 bg-white rounded mb-2 relative hover:bg-slate-100 transition-all pr-4 group',
				{
					'opacity-50': isDragging,
					'!bg-slate-100': isResizing,
					'border border-dashed border-blue-600 !bg-blue-50':
						id === 'preview' || isDragging,
				}
			)}
			style={{width: `${width}%`}}
		>
			{dragRef(
				<div>
					<Component
						id={id}
						properties={element.properties}
						handlePropertiesChange={handlePropertiesChange}
					/>
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
				<Popover>
					<PopoverTrigger>
						<Icon
							icon={'mdi:dots-vertical'}
							className="size-5 h-full w-full text-slate-500 hover:text-slate-600 cursor-pointer"
						/>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverElementContent
							element={element}
							handlePropertiesChange={handlePropertiesChange}
							handleRemoveComponent={handleRemoveComponent}
						/>
					</PopoverContent>
				</Popover>
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
