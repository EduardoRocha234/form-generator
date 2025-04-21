interface NumberElementProps {
	id: string
}

function NumberElement({id}: NumberElementProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm mb-1"
			>
				Number
			</label>
			<input
				id={id}
				type="number"
				placeholder="Number"
				className="p-2 border rounded w-full"
			/>
		</div>
	)
}

export default NumberElement
