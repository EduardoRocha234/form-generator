import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {UndoRedoProvider} from './contexts/UndoRedoContext'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar/Index'
import DropForm from './components/DropForm/Index'
import {useEffect, useState} from 'react'
import {DynamicForm} from './interfaces'
import {v4 as uuidv4} from 'uuid'
import {formService} from './core'
import { useDebounce } from './hooks/useDebounce'

function App() {
	const [form, setForm] = useState<DynamicForm>()

	const setInitialForm = async () => {
		const forms = await formService.getAllForms()

		if (forms.length > 0) {
			setForm(forms[0])
			return
		}

		const newForm = {
			id: uuidv4(),
			title: 'My Form',
			description: '',
			elements: [],
		}

		await formService.saveForm(newForm)

		setForm(newForm as DynamicForm)
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
	}, [])

	return (
		<>
			<UndoRedoProvider>
				<NavBar
					form={form}
					setForm={handleSetForm}
				/>
				<DndProvider backend={HTML5Backend}>
					<div className="bg-slate-100 w-full grid h-screen md:grid-cols-[375px_1fr] overflow-y-hidden">
						<SideBar />
						<div className="max-w-[calc(100vw-375px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center px-[7rem]  pb-[4rem] pt-[10rem]">
							<DropForm
								form={form}
								setForm={handleSetForm}
							/>
						</div>
					</div>
				</DndProvider>
			</UndoRedoProvider>
		</>
	)
}

export default App
