import {useState} from 'react'
import InputSearch from './InputSearch'
import DraggableItem from './DraggableItem'
import { Icon } from '@iconify/react/dist/iconify.js'

function SideBar() {
	const [search, setSearch] = useState('')

	return (
		<div className="h-full w-full bg-white flex flex-col pt-[6rem] px-4">
			<div className="flex items-center gap-3 mb-4 border-b border-dashed border-slate-300 pb-3">
				<button className="text-slate-600 text-xs flex items-center gap-2 border px-4 py-2 rounded-xl border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
					<Icon
						icon="mdi:folder"
						className="size-4 text-slate-400"
					/>
					My forms
				</button>
			</div>
			<div className="mb-7">
				<InputSearch
					placeholder={'Search Components'}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-slate-500 font-semibold">Text elements</span>
				<div className="flex flex-wrap gap-4">
					<DraggableItem
						type="singleLine"
						label="Single line"
						icon="ci:text"
					/>
					<DraggableItem
						type="multiline"
						label="Multiline"
						icon="majesticons:text-line"
					/>
					<DraggableItem
						type="number"
						label="Number"
						icon="tabler:number-123"
					/>
				</div>
			</div>
		</div>
	)
}

export default SideBar
