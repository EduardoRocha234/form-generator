import NavBar from './components/NavBar'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SideBar from './components/SideBar'
import DropForm from './components/DropForm/Index'
import {DndProvider} from 'react-dnd'
import './App.css'

function App() {
	return (
		<>
			<NavBar />
			<DndProvider backend={HTML5Backend}>
				<div className="bg-slate-100 w-full grid min-h-screen md:grid-cols-[280px_1fr] overflow-y-auto">
					<SideBar />
					<div className="h-full max-w-[calc(100vw-280px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-[7rem]">
						{/* <div className="h-full rounded-lg shadow-sm w-full bg-white"></div> */}
						<DropForm />
					</div>
				</div>
			</DndProvider>
		</>
	)
}

export default App
