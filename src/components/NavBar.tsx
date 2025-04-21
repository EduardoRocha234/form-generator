import {Icon} from '@iconify/react'
import {useUndoRedoContext} from './DropForm/UndoRedoContext'

function NavBar() {
	const {undo, redo, canUndo, canRedo} = useUndoRedoContext()

	return (
		<div className="bg-white fixed top-0 flex items-center justify-between py-4 px-6 shadow-sm w-full z-50">
			<div>
				<h1 className="text-lg font-bold">Form constructor</h1>
				<span className="text-slate-600">
					Easy and fast form constructor for your project
				</span>
			</div>
			<div className="flex items-center gap-3">
				<div className="text-slate-600 text-sm flex items-center gap-3 border rounded-xl py-2 px-2 border-slate-300">
					<button
						className={`size-5 text-slate-400 rotate-180 -scale-x-100   ${
							canUndo && 'hover:text-slate-600 cursor-pointer'
						} ${!canUndo && 'opacity-50'}`}
						disabled={!canUndo}
						onClick={undo}
						title='Undo (Ctrl + Z)'
					>
						<Icon
							icon="tabler:arrow-back"
							className="h-full w-full"
						/>
					</button>
					<button
						className={`size-5 text-slate-400 rotate-180   ${
							canRedo && 'hover:text-slate-600 cursor-pointer'
						} ${!canRedo && 'opacity-50'}`}
						disabled={!canRedo}
						onClick={redo}
						title='Redo (Ctrl + Y)'
					>
						<Icon
							icon="tabler:arrow-back"
							className="h-full w-full"
							onClick={redo}
						/>
					</button>
				</div>
				<div className="text-slate-600 text-sm flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300">
					<Icon
						icon="mdi:eye"
						className="size-5 text-blue-400"
					/>
					Preview
				</div>
				<div className="text-slate-600 text-sm flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300">
					<Icon
						icon="mdi:share"
						className="size-5 text-blue-400"
					/>
					Share
				</div>
				<div className="text-slate-600 text-sm flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300">
					<Icon
						icon="mdi:code"
						className="size-5 text-blue-400"
					/>
					Generate code
				</div>
			</div>
		</div>
	)
}

export default NavBar
