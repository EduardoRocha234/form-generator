import {BaseElementProps} from '../../../interfaces'

interface SingleLineElementProps extends BaseElementProps {}

function SingleLineElement({
	id,
	properties,
	handlePropertiesChange,
}: SingleLineElementProps) {
	const defaultProperties = properties || {
		label: 'Single Element',
		placeholder: '',
		required: false,
		description: '',
		defaultValue: '',
	}

	return (
		<div>
			<label
				htmlFor={id}
				className="block text-md mb-2 font-semibold text-slate-600"
			>
				<input
					value={defaultProperties.label}
					onChange={(e) =>
						handlePropertiesChange(id, {...properties, label: e.target.value})
					}
					className="focus:outline-0 hover:border-b-2 border-slate-400 transition-all duration-100 w-[80%]"
				/>
			</label>
			<input
				id={id}
				type="text"
				className="py-2 px-4 rounded-md border bg-slate-50 border-slate-300 w-full focus:outline-0"
			/>
		</div>
	)
}

export default SingleLineElement
