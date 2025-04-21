import {useState} from 'react'
import InputSearch from './InputSearch'
import DraggableItem from './DraggableItem'

function SideBar() {
	const [search, setSearch] = useState('')

	return (
		<div className="h-full w-full bg-white flex flex-col pt-[7rem] px-4">
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
