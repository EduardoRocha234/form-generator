import {useEffect, useState} from 'react'
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import {DynamicForm} from '@/interfaces'
import {formService} from '@/core'
import {v4 as uuidV4} from 'uuid'
import classNames from 'classnames'
import {Icon} from '@iconify/react/dist/iconify.js'
import {toast} from 'sonner'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import InputSearch from '../InputSearch'
import EmptyFormPrint from '@/assets/img/empty-form-template.png'

function FormsBar() {
	const {id: currentFormId} = useParams<{id: string}>()
	const navigate = useNavigate()

	const [search, setSearch] = useState<string>('')
	const [dialogNewFormVisible, setDialogNewFormVisible] =
		useState<boolean>(false)
	const [deteteDialogVisible, setDeteteDialogVisible] = useState<boolean>(false)
	const [idFormToDelete, setIdFormToDelete] = useState<string | null>(null)
	const [forms, setForms] = useState<DynamicForm[]>([])
	const [filteredForms, setFilteredForms] = useState<DynamicForm[]>([])

	const getForms = async () => {
		const userForms = await formService.getAllForms()

		setForms(userForms)
		setFilteredForms(userForms)
		return userForms
	}

	const createNewFom = async () => {
		const newForm = {
			id: uuidV4(),
			title: 'My Form',
			description: '',
			elements: [],
			createdAt: new Date(),
		}

		await formService.saveForm(newForm)

		await navigate(`/form/${newForm.id}`)
		await getForms()

		toast.success('New Form created with success')
		setDialogNewFormVisible(false)
	}

	const openDeleteDialog = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: string
	) => {
		setDeteteDialogVisible(true)
		setIdFormToDelete(id)
		event.stopPropagation()
	}

	const closeDeleteDialog = () => {
		setDeteteDialogVisible(false)
		setIdFormToDelete(null)
	}

	const deleteForm = async () => {
		if (!idFormToDelete) return

		await formService.deleteForm(idFormToDelete)
		const forms = await getForms()

		if (forms.length === 0) {
			await navigate(`/form`)
		} else if (currentFormId === idFormToDelete) {
			await navigate(`/form/${forms[0].id}`)
		}

		toast.success('Form deleted with success')
		closeDeleteDialog()
	}

	useEffect(() => {
		const serializedSearch = search.toLowerCase().trim()
		const filteredElements = forms.filter((el) => {
			if (serializedSearch.length === 0) return true

			return el.title.toLowerCase().includes(serializedSearch)
		})

		setFilteredForms(filteredElements)
	}, [search])

	useEffect(() => {
		getForms()
	}, [])

	return (
		<>
			<div className="h-full w-full flex flex-col px-4">
				<div className="mb-7">
					<InputSearch
						placeholder={'Search in my forms'}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex flex-wrap gap-4">
					<div
						className="text-sm flex hover:shadow-md flex-col justify-center hover:bg-slate-100 transition-all items-center gap-2 w-[6rem] border rounded-md px-2 py-4 border-slate-300 text-slate-600 bg-slate-50 cursor-pointer"
						onClick={() => setDialogNewFormVisible(true)}
					>
						<Icon
							icon={'mdi:plus'}
							className="size-10 text-blue-600"
						/>
						<span className="truncate w-full text-center text-blue-600">
							New Form
						</span>
					</div>

					{filteredForms.map(({id, title}) => (
						<NavLink
							to={`/form/${id}`}
							key={id}
							className={classNames(
								'text-sm relative flex group flex-col justify-center hover:shadow-md hover:bg-slate-100 transition-all items-center gap-2 w-[6rem] border rounded-md px-2 py-4 border-slate-300 text-slate-600 bg-slate-50 cursor-pointer',
								{
									'bg-slate-200 border-2': id === currentFormId,
								}
							)}
							title={title}
						>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-white rounded-md z-10">
										<Icon
											icon={'mdi:dots-horizontal'}
											className="size-6"
										/>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>{title}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="text-slate-700 font-semibold hover:!bg-red-50 cursor-pointer transition-colors"
										onClick={(e) => openDeleteDialog(e, id)}
									>
										<Icon
											icon={'mdi:trash'}
											className="text-red-600 size-5"
										/>
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Icon
								icon={'mdi:form-outline'}
								className="size-8 text-slate-500"
							/>
							<span className="truncate w-full text-center">{title}</span>
						</NavLink>
					))}
				</div>
			</div>
			<Dialog
				open={dialogNewFormVisible}
				onOpenChange={(open) => setDialogNewFormVisible(open)}
			>
				<DialogContent className="min-w-[70rem]">
					<DialogHeader>
						<DialogTitle>Create a New Form</DialogTitle>
						<DialogDescription>
							Create a new form using a template
						</DialogDescription>
					</DialogHeader>
					<div className="px-4 py-4 flex w-full flex-col">
						<span className="mb-4 text-slate-700 text-lg font-semibold border-b pb-2 flex items-center gap-2">
							<Icon icon={'heroicons-outline:template'} />
							Templates
						</span>
						<div
							className="group flex flex-col items-center justify-between w-36 h-44 p-3 rounded-lg border border-slate-300 bg-white shadow-sm hover:shadow-md hover:border-slate-600 transition-all duration-200 cursor-pointer"
							onClick={() => createNewFom()}
						>
							<div className="flex-1 flex items-center justify-center">
								<img
									src={EmptyFormPrint}
									alt="Template"
									className="max-w-full max-h-full object-contain"
								/>
							</div>
							<span className="mt-3 text-sm font-medium text-slate-500 cursor-pointer">
								Empty form
							</span>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<Dialog
				open={deteteDialogVisible}
				onOpenChange={(open) => setDeteteDialogVisible(open)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Form</DialogTitle>
						<DialogDescription>
							Do you want to delete this form?
						</DialogDescription>
						<div className="flex gap-2 w-full justify-end">
							<button
								className="py-2 px-4 bg-slate-200 rounded-md text-slate-600 cursor-pointer hover:bg-slate-300 transition-colors"
								onClick={() => closeDeleteDialog()}
							>
								Cancel
							</button>
							<button
								className="py-2 px-4 bg-red-400 rounded-md text-white cursor-pointer hover:bg-red-500 transition-colors"
								onClick={() => deleteForm()}
							>
								Delete
							</button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default FormsBar
