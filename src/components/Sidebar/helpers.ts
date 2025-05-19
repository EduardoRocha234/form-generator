import {ElementType, FormElement} from '@/core/interfaces'
import EmptyFormPrint from '@/assets/img/empty-form-template.png'
import {v4 as uuidv4} from 'uuid'

type Element = {
	type: ElementType
	label: string
	icon: string
}

type ElementOption = {
	sectionName: string
	elements: Element[]
}

type TemplateOption = {
	id: string
	label: string
	image: string
	elements: FormElement[]
}

export const elementsList: ElementOption[] = [
	{
		sectionName: 'Text Elements',
		elements: [
			{
				icon: 'ci:text',
				label: 'Single line',
				type: 'singleLine',
			},
			{
				icon: 'majesticons:text-line',
				label: 'Multiline',
				type: 'multiline',
			},
			{
				icon: 'tabler:number-123',
				label: 'Number',
				type: 'number',
			},
		],
	},
]

// this is temporary, in the future there will be an API 
export const templatesList: TemplateOption[] = [
	{
		id: uuidv4(),
		image: EmptyFormPrint,
		label: 'Empty form',
		elements: [],
	},
	{
		id: uuidv4(),
		image: EmptyFormPrint,
		label: 'E-mail form',
		elements: [],
	},
	{
		id: uuidv4(),
		image: EmptyFormPrint,
		label: 'Address form',
		elements: [],
	},
]
