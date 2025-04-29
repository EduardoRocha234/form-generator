import {useEffect, useState} from 'react'
import {Icon} from '@iconify/react/dist/iconify.js'
import type {DynamicForm} from '../../interfaces'
import InputSearch from '../InputSearch'
import {formService} from '../../core'

function FormsBar() {
	const [search, setSearch] = useState('')
	const [forms, setForms] = useState<DynamicForm[]>([])

	const getForms = async () => {
		const userForms = await formService.getAllForms()

		setForms(userForms)
	}

	useEffect(() => {
		getForms()
	}, [])

	return (
		<div className="h-full w-full flex flex-col px-4">
			<div className="mb-7">
				<InputSearch
					placeholder={'Search in my forms'}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-wrap gap-4">
				{forms.map((form) => (
					<div
						key={form.id}
						className="text-sm flex flex-col justify-center hover:bg-slate-100 transition-all items-center gap-2 max-w-[6rem] border rounded-md px-2 py-4 border-slate-300 text-slate-600 bg-slate-50 cursor-pointer"
						title={form.title}
					>
						<Icon
							icon={'mdi:form-outline'}
							className="size-8 text-slate-500"
						/>
						<span className="truncate w-full">{form.title}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormsBar
