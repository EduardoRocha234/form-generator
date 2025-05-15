import {Icon} from '@iconify/react/dist/iconify.js'

function NoForm() {
	return (
		<div className="flex flex-col items-center justify-center ">
			<Icon
				icon={'ic:outline-no-sim'}
				className="size-20 text-slate-400"
			/>
			<span className="text-slate-400 font-semibold text-lg">No form selected</span>
		</div>
	)
}

export default NoForm
