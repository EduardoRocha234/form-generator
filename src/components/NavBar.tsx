import {Icon} from '@iconify/react'

function NavBar() {
	return (
		<div className="bg-white fixed top-0 flex items-center justify-between py-4 px-6 shadow-sm w-full">
			<div>
				<h1 className="text-lg font-bold">Form constructor</h1>
				<span className="text-slate-600">
					Easy and fast form constructor for your project
				</span>
			</div>
			<div className="text-slate-600 text-sm flex items-center gap-2">
				Changes saved 2 min ago
				<Icon
					icon="mdi:eye"
					className="size-5 text-blue-400"
				/>
			</div>
		</div>
	)
}

export default NavBar
