import {Icon} from '@iconify/react/dist/iconify.js'
import {useDrag} from 'react-dnd'

const DraggableItem = ({
	type,
	label,
	icon,
}: {
	type: string
	label: string
	icon: string
}) => {
	const [{isDragging}, drag] = useDrag(() => ({
		type: 'FORM_ELEMENT',
		item: {type},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	return drag(
		<div
			className={`text-sm flex hover:bg-slate-100 transition-all items-center gap-2 min-w-[7rem] border rounded-md px-2 py-4 border-slate-300 text-slate-600 bg-slate-50 cursor-move ${
				isDragging ? 'opacity-50' : ''
			}`}
		>
			<Icon
				icon={icon}
				className="size-5 text-slate-600"
			/>
			{label}
		</div>
	)
}

export default DraggableItem
