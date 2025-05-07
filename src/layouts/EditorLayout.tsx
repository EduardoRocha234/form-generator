import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar/SideBar'
import {Outlet} from 'react-router-dom'

function EditorLayout() {
	return (
		<>
			<NavBar />
			<div className="bg-slate-100 w-full grid h-screen md:grid-cols-[375px_1fr] overflow-y-hidden">
				<SideBar />
				<div className="max-w-[calc(100vw-375px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center px-[7rem] pb-[4rem] pt-[10rem]">
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default EditorLayout
