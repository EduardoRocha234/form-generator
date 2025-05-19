export type ElementType = 'singleLine' | 'multiline' | 'number'

export interface FormElementProperties {
	label?: string
	placeholder?: string
	required?: boolean
	description?: string
	options?: string[]
	defaultValue?: string
	validationMessage?: string
}

export interface FormElement {
	id: string
	type: ElementType
	width: number
	row: number
	position: number
	properties?: FormElementProperties
}

export interface DynamicForm {
	id: string
	title: string
	description: string
	createdAt?: Date
	elements: FormElement[]
}
