import NavBar from './components/NavBar'
import './App.css'
import SideBar from './components/SideBar'

function App() {
	return (
		<>
			<NavBar />
			<div className="bg-slate-100 w-full grid min-h-screen md:grid-cols-[280px_1fr]">
				<SideBar />
				<div className="h-full max-w-[calc(100vw-280px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-[7rem]">
					<div className="h-full rounded-lg shadow-sm w-full bg-white"></div>
				</div>
			</div>
		</>
	)
}

export default App
