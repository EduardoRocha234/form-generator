import type {
	FormElement,
	FormElementProperties,
} from '@/interfaces/drop-form.interface'
import FormElementEditor from './FormElementEditor'

interface FormRowProps {
	elements: FormElement[]
	rowNumber: number
	rowRef: React.RefCallback<HTMLDivElement>
	onWidthChange: (id: string, width: number) => void
	handlePropertiesChange: (
		id: string,
		properties: FormElementProperties
	) => void
	handleRemoveComponent: (id: string) => void
}

function FormRow({
	elements,
	onWidthChange,
	handlePropertiesChange,
	handleRemoveComponent,
	rowRef,
}: FormRowProps) {
	return (
		<div
			className="form-row w-full flex mb-2"
			ref={rowRef}
		>
			{elements
				.sort((a, b) => a.position - b.position)
				.map((element) => (
					<FormElementEditor
						key={element.id}
						elements={elements}
						element={element}
						onWidthChange={onWidthChange}
						handlePropertiesChange={handlePropertiesChange}
						handleRemoveComponent={handleRemoveComponent}
					/>
				))}
		</div>
	)
}

export default FormRow
