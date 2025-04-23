import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {UndoRedoProvider} from './components/DropForm/UndoRedoContext'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar/Index'
import DropForm from './components/DropForm/Index'

function App() {
	return (
		<>
			<UndoRedoProvider>
				<NavBar />
				<DndProvider backend={HTML5Backend}>
					<div className="bg-slate-100 w-full grid h-screen md:grid-cols-[375px_1fr] overflow-y-hidden">
						<SideBar />
						<div className="max-w-[calc(100vw-375px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center px-[7rem]  pb-[4rem] pt-[10rem]">
							<DropForm />
						</div>
					</div>
				</DndProvider>
			</UndoRedoProvider>
		</>
	)
}

export default App
