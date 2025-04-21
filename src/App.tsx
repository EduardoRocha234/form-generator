import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {UndoRedoProvider} from './components/DropForm/UndoRedoContext'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import DropForm from './components/DropForm/Index'

function App() {
	return (
		<>
			<UndoRedoProvider>
				<NavBar />
				<DndProvider backend={HTML5Backend}>
					<div className="bg-slate-100 w-full grid min-h-screen md:grid-cols-[280px_1fr] overflow-y-auto">
						<SideBar />
						<div className="h-full max-w-[calc(100vw-280px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-[7rem]">
							<DropForm />
						</div>
					</div>
				</DndProvider>
			</UndoRedoProvider>
		</>
	)
}

export default App
