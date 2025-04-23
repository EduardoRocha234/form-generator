import {useState} from 'react'
import InputSearch from '../InputSearch'

function FormsBar() {
	const [search, setSearch] = useState('')

	return (
		<div className="h-full w-full flex flex-col px-4">
			<div className="mb-7">
				<InputSearch
					placeholder={'Search forms'}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-2">Where's the code? 🥲</div>
		</div>
	)
}

export default FormsBar
