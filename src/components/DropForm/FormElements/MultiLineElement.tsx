interface MultilineElementProps {
	id: string
}

function MultilineElement({id}: MultilineElementProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm mb-1"
			>
				Multiline
			</label>
			<textarea
				id={id}
				placeholder="Multiline"
				className="p-2 border rounded w-full"
			/>
		</div>
	)
}

export default MultilineElement
