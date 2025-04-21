import {FormElementProperties} from './drop-form.interface'

export interface BaseElementProps {
	id: string
	properties: FormElementProperties | undefined
	handlePropertiesChange: (
		id: string,
		properties: FormElementProperties
	) => void
}
