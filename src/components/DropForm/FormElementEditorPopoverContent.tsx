import {FormElement, FormElementProperties} from '@/interfaces'
import {Icon} from '@iconify/react/dist/iconify.js'
import {useState} from 'react'
import {Checkbox} from '../ui/checkbox'

interface PopoverElementContentProps {
	element: FormElement
	handleRemoveComponent: (id: string) => void
	handlePropertiesChange: (
		id: string,
		properties: FormElementProperties
	) => void
}

function PopoverElementContent({
	element,
	handlePropertiesChange,
	handleRemoveComponent,
}: PopoverElementContentProps) {
	const {id, width} = element

	const initialStatePropertiesBool = {
		setPlaceholder: false,
		setDefaultValue: false,
	}

	const [propertiesBool, setPropertiesBool] = useState(
		initialStatePropertiesBool
	)

	const handleSetPropertiesBool = (
		prop: keyof typeof propertiesBool,
		val: boolean
	) => {
		setPropertiesBool({...propertiesBool, [prop]: val})
	}

	// const capitalizeFirstLetter = (str: string) => {
	// 	if (!str) return ''
	// 	return str.charAt(0).toUpperCase() + str.slice(1)
	// }

	return (
		<ul>
			<li className="hover:bg-slate-100 p-2 rounded-md text-sm font-medium leading-none text-slate-600">
				{!propertiesBool.setPlaceholder && (
					<button
						className="w-full h-full cursor-pointer text-start py-1"
						onClick={() => handleSetPropertiesBool('setPlaceholder', true)}
					>
						{!element.properties?.placeholder
							? 'Set placeholder'
							: 'Edit placeholder'}
					</button>
				)}
				{propertiesBool.setPlaceholder && (
					<div className="flex">
						<input
							placeholder="Type a placeholder here"
							className="outline-0 w-full"
							value={element.properties?.placeholder}
							onChange={(e) =>
								handlePropertiesChange(id, {
									...element.properties,
									placeholder: e.target.value,
								})
							}
						/>
						<button
							className="p-1 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
							title="Remove placeholder"
							onClick={() => {
								handleSetPropertiesBool('setPlaceholder', false)
							}}
						>
							<Icon
								icon={'mdi:close'}
								className="size-4"
							/>
						</button>
					</div>
				)}
			</li>
			<li className="hover:bg-slate-100 p-2 rounded-md text-sm font-medium leading-none text-slate-600">
				{!propertiesBool.setDefaultValue && (
					<button
						className="w-full h-full cursor-pointer text-start py-1"
						onClick={() => handleSetPropertiesBool('setDefaultValue', true)}
					>
						{!element.properties?.defaultValue
							? 'Set default value'
							: 'Edit default value'}
					</button>
				)}
				{propertiesBool.setDefaultValue && (
					<div className="flex">
						<input
							placeholder="Type a default value here"
							className="outline-0 w-full"
                            type={element.type === 'number' ? 'number' : 'text'}
							value={element.properties?.defaultValue}
							onChange={(e) =>
								handlePropertiesChange(id, {
									...element.properties,
									defaultValue: e.target.value,
								})
							}
						/>
						<button
							className="p-1 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
							title="Remove placeholder"
							onClick={() => {
								handleSetPropertiesBool('setDefaultValue', false)
							}}
						>
							<Icon
								icon={'mdi:close'}
								className="size-4"
							/>
						</button>
					</div>
				)}
			</li>

			<li className="hover:bg-slate-100 p-2 rounded-md text-sm font-medium leading-none text-slate-600">
				<div className="flex items-center justify-between space-x-2 w-full cursor-pointer">
					<label
						htmlFor="required"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full cursor-pointer"
					>
						Input required
					</label>
					<Checkbox
						id="required"
						checked={element.properties?.required}
						onCheckedChange={() =>
							handlePropertiesChange(id, {
								...element.properties,
								required: !element.properties?.required,
							})
						}
					/>
				</div>
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
	)
}

export default PopoverElementContent
