import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

function InputSearch({...props}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="flex border rounded-md border-slate-200 text-slate-600 px-4 py-2">
			<input
				className="focus:outline-0 text-slate-600"
				{...props}
			/>
			<Icon
				icon="mdi:search"
				className="size-6 text-slate-300"
			/>
		</div>
	)
}

export default InputSearch
