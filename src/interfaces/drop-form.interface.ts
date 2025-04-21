// Definição dos tipos
export type ElementType = 'singleLine' | 'multiline' | 'number'

export interface FormElementProperties {
	label?: string
	placeholder?: string
	required?: boolean
	description?: string
	options?: string[] // For select, radio, checkbox groups
	defaultValue?: string
}

export interface FormElement {
	id: string
	type: ElementType
	width: number
	row: number
	position: number
	properties?: FormElementProperties
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
