import {Icon} from '@iconify/react'
import {useUndoRedoContext} from '../contexts/UndoRedoContext'
import {DynamicForm} from '@/interfaces'

interface NavBarProps {
	form?: DynamicForm
	setForm: (form: DynamicForm) => void
}

function NavBar({form, setForm}: NavBarProps) {
	const {undo, redo, canUndo, canRedo} = useUndoRedoContext()

	const onSetFormTitle = (value: string) => {
		if (!form) return

		setForm({...form, title: value})
	}

	return (
		<div className="bg-white fixed top-0 flex items-center justify-between py-4 px-6 shadow-sm w-full z-50">
			<div className="flex gap-6">
				<div>
					<h1 className="text-lg font-bold">FormDrop | Form Builder</h1>
					<span className="text-slate-600">
						Easy and fast form constructor for your project
					</span>
				</div>
				<div className="flex items-center gap-3">
					<div className="text-slate-600 text-sm flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300  hover:bg-slate-50 transition-colors">
						<input
							className="focus:outline-0"
							value={form?.title || ''}
							onChange={(e) => onSetFormTitle(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div className="text-slate-600 text-sm flex items-center gap-3 border rounded-xl py-2 px-2 border-slate-300">
					<button
						className={`size-5 text-slate-400 rotate-180 -scale-x-100   ${
							canUndo && 'hover:text-slate-600 cursor-pointer'
						} ${!canUndo && 'opacity-50'}`}
						disabled={!canUndo}
						onClick={undo}
						title="Undo (Ctrl + Z)"
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
						title="Redo (Ctrl + Y)"
					>
						<Icon
							icon="tabler:arrow-back"
							className="h-full w-full"
							onClick={redo}
						/>
					</button>
				</div>
				<button className="text-slate-600 text-sm flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
					<Icon
						icon="mdi:eye"
						className="size-5 text-slate-400"
					/>
					Preview
				</button>
				<button className="text-slate-600 text-sm flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
					<Icon
						icon="mdi:share"
						className="size-5 text-slate-400"
					/>
					Share
				</button>
				<button className="text-slate-600 text-sm flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
					<Icon
						icon="mdi:code"
						className="size-5 text-slate-400"
					/>
					Generate code
				</button>
			</div>
		</div>
	)
}

export default NavBar
