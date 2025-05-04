import {useParams} from 'react-router-dom'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {UndoRedoProvider} from '@/contexts/UndoRedoContext'
import {useEffect, useState} from 'react'
import {DynamicForm} from '@/interfaces'
import {formService} from '@/core'
import {useDebounce} from '@/hooks/useDebounce'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar/Index'
import DropForm from '@/components/DropForm/Index'

function App() {
	const {id} = useParams<{id: string}>()

	const [form, setForm] = useState<DynamicForm>()

	const setInitialForm = async () => {
		if (!id) return

		const existingForm = await formService.getFormById(id)

		if (existingForm) {
			setForm(existingForm)
		} else {
			const newForm: DynamicForm = {
				id,
				title: 'My Form',
				description: '',
				elements: [],
				createdAt: new Date(),
				scale: {
					height: 600,
					width: 400,
				},
			}

			await formService.saveForm(newForm)
			setForm(newForm as DynamicForm)
		}
	}

	const handleSaveForm = async (form: DynamicForm) => {
		await formService.updateForm(form)
	}

	const debounceSetForm = useDebounce(handleSaveForm, 500)

	const handleSetForm = async (form: DynamicForm) => {
		setForm(form)
		debounceSetForm(form)
	}

	useEffect(() => {
		setInitialForm()
	}, [id])

	return (
		<UndoRedoProvider>
			<NavBar
				form={form}
				setForm={handleSetForm}
			/>
			<DndProvider backend={HTML5Backend}>
				<div className="bg-slate-100 w-full grid h-screen md:grid-cols-[375px_1fr] overflow-y-hidden">
					<SideBar />
					<div className="max-w-[calc(100vw-375px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center px-[7rem] pb-[4rem] pt-[10rem]">
						<DropForm
							form={form}
							setForm={handleSetForm}
						/>
					</div>
				</div>
			</DndProvider>
		</UndoRedoProvider>
	)
}

export default App
