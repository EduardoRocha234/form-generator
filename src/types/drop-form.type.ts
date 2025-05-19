import {ElementType, FormElementProperties} from '@/core/interfaces'

export type DragItem = {
	type: ElementType
	id?: string
	properties?: FormElementProperties
}

export type DropPosition = {
	row: number
	position: number
}

export type Position = {
	x: number
	y: number
}

export type HoverPosition = {
	x: number
	y: number
	row: number
	timestamp: number
}
