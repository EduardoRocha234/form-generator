import {ElementType} from '@/interfaces'

type Element = {
	type: ElementType
	label: string
	icon: string
}

type ElementOption = {
	sectionName: string
	elements: Element[]
}


export const elementsList: ElementOption[] = [
    {
        sectionName: 'Text Elements',
        elements: [
            {
                icon: 'ci:text',
                label: 'Single line',
                type: 'singleLine'
            },
            {
                icon: 'majesticons:text-line',
                label: 'Multiline',
                type: 'multiline'
            },
            {
                icon: 'tabler:number-123',
                label: 'Number',
                type: 'number'
            },
        ]
    },
]
