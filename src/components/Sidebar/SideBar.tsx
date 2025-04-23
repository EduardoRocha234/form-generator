import React, {useState} from 'react'
import {Icon} from '@iconify/react/dist/iconify.js'
import ElementsBar from './ElementsBar'
import FormsBar from './FormsBar'
import TemplatesBar from './TemplatesBar.tsx'
import classNames from 'classnames'

type Toolbar = 'elements' | 'forms' | 'templates'

function SideBar() {
	const [toolbar, setToolbar] = useState<Toolbar>('elements')

	const componentMap: Record<Toolbar, React.ElementType> = {
		elements: ElementsBar,
		forms: FormsBar,
		templates: TemplatesBar,
	}

	const options: Array<{label: string; icon: string; value: Toolbar}> = [
		{label: 'Elements', icon: 'heroicons-outline:view-grid', value: 'elements'},
		{label: 'My Forms', icon: 'heroicons:folder', value: 'forms'},
		{
			label: 'Templates',
			icon: 'heroicons-outline:template',
			value: 'templates',
		},
	]

	const Component = componentMap[toolbar]

	return (
		<div className="flex gap-2 pt-[6rem] h-full w-full bg-white px-2">
			<div className="flex flex-col h-full border-r pr-2 gap-4 border-dashed border-slate-300">
				{options.map((option) => (
					<button
						className={classNames(
							'text-slate-600 text-xs flex flex-col items-center gap-2   p-2 rounded-xl border-slate-300 cursor-pointer hover:bg-slate-100 hover:shadow-sm transition-colors',
							{
								'!text-blue-600': option.value === toolbar
							}
						)}
						onClick={() => setToolbar(option.value)}
					>
						<Icon
							icon={option.icon}
							className={classNames('size-6 text-slate-400', {
									'!text-blue-600': option.value === toolbar
							})}
						/>
						{option.label}
					</button>
				))}
			</div>
			<div className="h-full w-full">
				<Component />
			</div>
		</div>
	)
}

export default SideBar
