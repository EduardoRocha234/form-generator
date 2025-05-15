import React, {useEffect, useState} from 'react'
import {Icon} from '@iconify/react/dist/iconify.js'
import ElementsBar from './ElementsBar.tsx'
import FormsBar from './FormsBar.tsx'
import TemplatesBar from './TemplatesBar.tsx'
import classNames from 'classnames'
import {useLocation} from 'react-router-dom'

export type Toolbar = 'elements' | 'forms' | 'templates'

const componentMap: Record<Toolbar, React.ElementType> = {
	elements: ElementsBar,
	forms: FormsBar,
	templates: TemplatesBar,
}

function SideBar() {
	const location = useLocation()
	const [toolbarSelected, setToolbarSelected] = useState<Toolbar>('elements')

	const options: Array<{label: string; icon: string; value: Toolbar}> = [
		{label: 'Elements', icon: 'heroicons-outline:view-grid', value: 'elements'},
		{label: 'My Forms', icon: 'heroicons:folder', value: 'forms'},
		{
			label: 'Templates',
			icon: 'heroicons-outline:template',
			value: 'templates',
		},
	]

	const Component = componentMap[toolbarSelected]

	useEffect(() => {
		if (location.pathname === '/form' && toolbarSelected === 'elements') {
			setToolbarSelected('forms')
		}
	}, [location])

	return (
		<div className="flex gap-2 pt-[6rem] h-full w-full bg-white px-2">
			<div className="flex flex-col h-full border-r pr-2 gap-4 border-dashed border-slate-300">
				{options.map((option) => (
					<button
						key={option.value}
						className={classNames(
							'text-slate-600 text-xs flex flex-col items-center gap-2   p-2 rounded-xl border-slate-300 cursor-pointer hover:bg-slate-100 hover:shadow-sm transition-colors',
							{
								'!text-blue-600': option.value === toolbarSelected,
								hidden:
									location.pathname === '/form' && option.value === 'elements',
							}
						)}
						onClick={() => setToolbarSelected(option.value)}
					>
						<Icon
							icon={option.icon}
							className={classNames('size-6 text-slate-400', {
								'!text-blue-600': option.value === toolbarSelected,
							})}
						/>
						{option.label}
					</button>
				))}
			</div>
			<div className="h-full w-full">
				<Component setToolbarSelected={setToolbarSelected} />
			</div>
		</div>
	)
}

export default SideBar
