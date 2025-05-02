import {useEffect, useState} from 'react'
import {elementsList} from './helpers'
import InputSearch from '../InputSearch'
import DraggableItem from '../DraggableItem'

function ElementsBar() {
	const [search, setSearch] = useState('')
	const [menuElements, setMenuElements] = useState(elementsList)

	useEffect(() => {
		const serializedSearch = search.toLowerCase().trim()
		const filteredElements = elementsList
			.map((item) => {
				const filterEl = item.elements.filter((el) => {
					const serializeLabel = el.label.toLowerCase().trim()
					const serializeSectionLabel = item.sectionName.toLowerCase().trim()

					const matchLabel = serializeLabel.includes(serializedSearch)
					const matchSection = serializeSectionLabel.includes(serializedSearch)

					return matchLabel || matchSection
				})

				return {
					...item,
					elements: filterEl,
				}
			})
			.filter((el) => el.elements.length > 0)

		setMenuElements(filteredElements)
	}, [search])

	return (
		<div className="h-full w-full flex flex-col px-4">
			<div className="mb-7">
				<InputSearch
					placeholder={'Search Components'}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				{menuElements.map(({elements, sectionName}) => (
					<div key={sectionName}>
						<div className="text-slate-500 font-semibold mb-2">{sectionName}</div>
						<div className="flex flex-wrap gap-4">
							{elements.map(({icon, label, type}) => (
								<DraggableItem
									key={type}
									icon={icon}
									label={label}
									type={type}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ElementsBar
