import {BaseElementProps} from '@/interfaces'
import classNames from 'classnames'

interface NumberElementProps extends BaseElementProps {}

function NumberElement({
	id,
	handlePropertiesChange,
	properties,
}: NumberElementProps) {
	const defaultProperties = properties || {
		label: 'Number Element',
		placeholder: '',
		required: false,
		description: '',
		defaultValue: '',
	}

	return (
		<div>
			<label
				htmlFor={id}
				className={classNames(
					'block text-md mb-2 font-semibold text-slate-600',
					{required: defaultProperties.required}
				)}
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
				type="number"
				className="py-2 px-4 rounded-md border bg-slate-50 border-slate-300 w-full focus:outline-0"
				placeholder={defaultProperties?.placeholder}
				required={defaultProperties.required}
				defaultValue={defaultProperties.defaultValue}
			/>
		</div>
	)
}

export default NumberElement
