import type {ElementType, Position} from '../../interfaces/drop-form.interface'

interface FormElementPreviewProps {
	type: ElementType
	position: Position
	isVisible: boolean
}

function FormElementPreview({
	isVisible,
	position,
	type,
}: FormElementPreviewProps) {
	if (!isVisible || !type) return null

	return (
		<div
			className="absolute pointer-events-none opacity-50 bg-blue-50 p-2 rounded border-2 border-blue-300 shadow-lg w-1/2"
			style={{
				left: position.x,
				top: position.y,
				transform: 'translate(-50%, 20px)',
				maxWidth: '400px',
			}}
		>
			{type === 'singleLine' && (
				<div>
					<label className="block text-sm mb-1">Single line (Preview)</label>
					<input
						type="text"
						placeholder="Single line"
						className="w-full p-2 border rounded"
						disabled
					/>
				</div>
			)}

			{type === 'multiline' && (
				<div>
					<label className="block text-sm mb-1">Multiline (Preview)</label>
					<textarea
						placeholder="Multiline"
						className="w-full p-2 border rounded"
						disabled
					/>
				</div>
			)}

			{type === 'number' && (
				<div>
					<label className="block text-sm mb-1">Number (Preview)</label>
					<input
						type="number"
						placeholder="Number"
						className="w-full p-2 border rounded"
						disabled
					/>
				</div>
			)}
		</div>
	)
}

export default FormElementPreview
