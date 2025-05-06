import {JSX} from 'react'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar/SideBar'

interface EditorLayoutProps {
	children: JSX.Element
}

function EditorLayout({children}: EditorLayoutProps) {
	return (
		<>
			<NavBar />
			<div className="bg-slate-100 w-full grid h-screen md:grid-cols-[375px_1fr] overflow-y-hidden">
				<SideBar />
				<div className="max-w-[calc(100vw-375px)] overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center px-[7rem] pb-[4rem] pt-[10rem]">
					{children}
				</div>
			</div>
		</>
	)
}

export default EditorLayout
