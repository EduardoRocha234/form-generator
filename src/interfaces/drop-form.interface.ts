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

export interface DynamicFormScale {
	width: number
	height: number
}

export interface DynamicForm {
	id: string
	title: string
	description: string
	createdAt: Date
	elements: FormElement[]
	scale: DynamicFormScale
}

export interface DragItem {
	type: ElementType
	id?: string
}

export interface DropPosition {
	row: number
	position: number
}

export interface Position {
	x: number
	y: number
}

export interface HoverPosition {
	x: number
	y: number
	row: number
	timestamp: number
}
