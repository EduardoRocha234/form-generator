import {useEffect, useState} from 'react'
import InputSearch from '../InputSearch'
import {templatesList} from './helpers'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {v4 as uuidv4} from 'uuid'
import {formService} from '@/core'
import {useNavigate} from 'react-router-dom'
import {toast} from 'sonner'
import {Toolbar} from './SideBar'

interface Props {
	setToolbarSelected: (value: Toolbar) => void
}

function TemplatesBar({setToolbarSelected}: Props) {
	const navigate = useNavigate()

	const [search, setSearch] = useState('')
	const [templates, setTemplates] = useState(templatesList)
	const [dialogNewFormVisible, setDialogNewFormVisible] =
		useState<boolean>(false)
	const [templateIdSelected, setTemplateIdSelected] = useState<string>('')
	const [newFormTitle, setNewFormTitle] = useState<string>('')

	const handleClickTemplate = (templateId: string) => {
		setDialogNewFormVisible(true)
		setTemplateIdSelected(templateId)
	}

	const createNewForm = async () => {
		const templateElements = templatesList.find(
			(i) => i.id === templateIdSelected
		)?.elements

		if (templateElements) {
			const newForm = {
				id: uuidv4(),
				title: newFormTitle || 'New Form',
				description: '',
				elements: templateElements,
				createdAt: new Date(),
			}

			await formService.saveForm(newForm)

			await navigate(`/form/${newForm.id}`)

			toast.success('New Form created with success')
			setToolbarSelected('elements')
			setDialogNewFormVisible(false)
		}
	}

	const cancel = () => {
		setDialogNewFormVisible(false)
		setTemplateIdSelected('')
	}

	useEffect(() => {
		const serializedSearch = search.toLowerCase().trim()
		const filteredElements = templatesList.filter((el) => {
			const serializedLabel = el.label.toLowerCase().trim()

			return serializedLabel.includes(serializedSearch)
		})

		setTemplates(filteredElements)
	}, [search])

	return (
		<>
			<div className="h-full w-full flex flex-col px-4">
				<div className="mb-7">
					<InputSearch
						placeholder={'Search Templates'}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex flex-wrap gap-4 transition-all">
					{templates.map(({label, image, id}) => (
						<div
							key={id}
							className="group flex flex-col items-center group justify-between w-28 h-32 px-1 py-3 rounded-lg border border-slate-300 bg-slate-100  hover:shadow-md hover:border-slate-400 transition-all duration-200 cursor-pointer"
							onClick={() => handleClickTemplate(id)}
						>
							<div className="flex-1 flex items-center justify-center">
								<img
									src={image}
									alt="Template"
									className="max-w-full max-h-full object-contain scale-100 group-hover:scale-105 transition-all duration-200 ease-in-out"
								/>
							</div>
							<span className="mt-2 text-sm font-medium text-slate-600 cursor-pointer">
								{label}
							</span>
						</div>
					))}
				</div>
			</div>
			<Dialog
				open={dialogNewFormVisible}
				onOpenChange={(open) => setDialogNewFormVisible(open)}
			>
				<DialogContent className="min-w-[20rem]">
					<DialogHeader>
						<DialogTitle>Create a New Form</DialogTitle>
						<DialogDescription>
							Create a new form using a template
						</DialogDescription>
						<div className="mt-2">
							<div className="flex flex-col gap-2 mb-6">
								<label
									className="text-slate-600"
									htmlFor="title"
								>
									Type the title of your new form:
								</label>
								<input
									id="title"
									className="border outline-0 focus:outline-1 transition-all rounded-md px-4 py-1 text-slate-600"
									placeholder="New form..."
									onChange={(e) => setNewFormTitle(e.target.value)}
								/>
							</div>
							<div className="flex justify-end gap-4">
								<button
									className="py-2 px-4 bg-slate-200 rounded-md text-slate-600 cursor-pointer hover:bg-slate-300 transition-colors"
									onClick={() => cancel()}
								>
									Cancel
								</button>
								<button
									className="py-2 px-4 bg-blue-400 rounded-md text-white cursor-pointer hover:bg-blue-600 transition-colors"
									onClick={() => createNewForm()}
								>
									Create
								</button>
							</div>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default TemplatesBar
