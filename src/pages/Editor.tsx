import {useParams} from 'react-router-dom'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {UndoRedoProvider} from '@/contexts/UndoRedoContext'
import {useEffect, useRef, useState} from 'react'
import {DynamicForm} from '@/interfaces'
import {formService} from '@/core'
import {useDebounce} from '@/hooks/useDebounce'
import {Slider} from '@/components/ui/slider'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar/Index'
import DropForm from '@/components/DropForm/Index'

function App() {
	const {id} = useParams<{id: string}>()

	const dropFormContainerRef = useRef<HTMLDivElement>(null)
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

	const [zoom, setZoom] = useState(1) // 1 = 100%

	const onValueChange = (value: number[]) => {
		const percent = value[0]
		const scale = percent / 100
		setZoom(scale)
	}

	return (
		<UndoRedoProvider>
			<NavBar
				form={form}
				setForm={handleSetForm}
			/>
			<DndProvider backend={HTML5Backend}>
				<div className="bg-slate-100 relative grid md:grid-cols-[375px_1fr] h-screen overflow-y-auto mt-[4rem] ">
					<SideBar />
					{/* <div className="flex gap-2 mb-4">
						<button
							className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
							onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))} // mínimo 50%
						>
							Zoom Out
						</button>
						<button
							className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"
							onClick={() => setZoom((prev) => Math.min(2, prev + 0.1))} // máximo 200%
						>
							Zoom In
						</button>
						<span className="text-sm text-slate-500">
							Zoom: {(zoom * 100).toFixed(0)}%
						</span>
					</div> */}
					{/* <div className="fixed bottom-5 left-[50%] shadow-lg rounded-full bg-white z-[150] w-[20rem] px-2 py-4">
						<Slider
							className="bg-white"
							defaultValue={[zoom * 100]} // converte 1.25 para 125
							value={[zoom * 100]}
							min={50}
							max={200}
							step={1}
							onValueChange={onValueChange}
						/>
					</div> */}

					<div
						ref={dropFormContainerRef}
						className="max-w-[calc(100vw-375px)]  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]  [background-size:16px_16px] flex items-center justify-center px-[7rem] pb-[4rem] "
					>
						<DropForm
							containerRef={dropFormContainerRef}
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
