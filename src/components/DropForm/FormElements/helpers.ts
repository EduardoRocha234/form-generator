import {FormElementProperties} from '@/core/interfaces/form'

export interface BaseElementProps {
	id: string
	properties: FormElementProperties | undefined
	handlePropertiesChange: (
		id: string,
		properties: FormElementProperties
	) => void
}
