import {Routes, Route} from 'react-router-dom'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {UndoRedoProvider} from './contexts/UndoRedoContext'
import {FormProvider} from './contexts/FormContext'
import {Toaster} from '@/components/ui/sonner'
import Form from '@/pages/Form'
import NoForm from './pages/NoForm'
import EditorLayout from './layouts/EditorLayout'
import Home from './pages/Home'

function App() {
	return (
		<>
			<Toaster />
			<FormProvider>
				<UndoRedoProvider>
					<DndProvider backend={HTML5Backend}>
						<Routes>
							<Route element={<EditorLayout />}>
								<Route
									path="/form/:id"
									element={<Form />}
								/>
								<Route
									path="/form"
									element={<NoForm />}
								/>
							</Route>
							<Route
								path="/"
								element={<Home />}
							/>
						</Routes>
					</DndProvider>
				</UndoRedoProvider>
			</FormProvider>
		</>
	)
}

export default App
