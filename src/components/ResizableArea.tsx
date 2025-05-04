import classNames from 'classnames'
import React, {useEffect, useRef, useState} from 'react'

interface Scale {
	width: number
	height: number
}

interface Props {
	width: number
	height: number
	onResize?: (size: {width: number; height: number}) => void
	children: React.ReactNode
}

function ResizableComponent({height, width, onResize, children}: Props) {
	const [isResizing, setIsResing] = useState(false)
	const dropAreaRef = useRef<HTMLDivElement>(null)
	const refLeft = useRef<HTMLDivElement>(null)
	const refTop = useRef<HTMLDivElement>(null)
	const refRight = useRef<HTMLDivElement>(null)
	const refBottom = useRef<HTMLDivElement>(null)

	const [scale, setScale] = useState<Scale>({
		width,
		height,
	})

	useEffect(() => {
		const resizeableEle = dropAreaRef.current
		if (!resizeableEle) return

		let x = 0
		let y = 0

		const onMouseMoveRightResize = (event: MouseEvent) => {
			setIsResing(true)
			const dx = event.clientX - x
			x = event.clientX
			setScale((prev) => ({...prev, width: prev.width + dx}))
		}

		const onMouseUpRightResize = () => {
			setIsResing(false)
			document.removeEventListener('mousemove', onMouseMoveRightResize)
		}

		const onMouseDownRightResize = (event: MouseEvent) => {
			setIsResing(true)
			x = event.clientX
			document.addEventListener('mousemove', onMouseMoveRightResize)
			document.addEventListener('mouseup', onMouseUpRightResize)
		}

		const onMouseMoveTopResize = (event: MouseEvent) => {
			setIsResing(true)
			const dy = event.clientY - y
			y = event.clientY
			setScale((prev) => ({...prev, height: prev.height + dy}))
		}

		const onMouseUpTopResize = () => {
			setIsResing(false)
			document.removeEventListener('mousemove', onMouseMoveTopResize)
		}

		const onMouseDownTopResize = (event: MouseEvent) => {
			setIsResing(true)
			y = event.clientY
			document.addEventListener('mousemove', onMouseMoveTopResize)
			document.addEventListener('mouseup', onMouseUpTopResize)
		}

		const onMouseMoveBottomResize = (event: MouseEvent) => {
			const dy = event.clientY - y
			y = event.clientY
			setScale((prev) => ({...prev, height: prev.height + dy}))
		}

		const onMouseUpBottomResize = () => {
			setIsResing(false)
			document.removeEventListener('mousemove', onMouseMoveBottomResize)
		}

		const onMouseDownBottomResize = (event: MouseEvent) => {
			setIsResing(true)
			y = event.clientY
			document.addEventListener('mousemove', onMouseMoveBottomResize)
			document.addEventListener('mouseup', onMouseUpBottomResize)
		}

		const onMouseMoveLeftResize = (event: MouseEvent) => {
			setIsResing(true)
			const dx = event.clientX - x
			x = event.clientX
			setScale((prev) => ({...prev, width: prev.width + dx}))
		}

		const onMouseUpLeftResize = () => {
			setIsResing(false)
			document.removeEventListener('mousemove', onMouseMoveLeftResize)
		}

		const onMouseDownLeftResize = (event: MouseEvent) => {
			x = event.clientX
			document.addEventListener('mousemove', onMouseMoveLeftResize)
			document.addEventListener('mouseup', onMouseUpLeftResize)
		}

		refRight.current?.addEventListener('mousedown', onMouseDownRightResize)
		refTop.current?.addEventListener('mousedown', onMouseDownTopResize)
		refBottom.current?.addEventListener('mousedown', onMouseDownBottomResize)
		refLeft.current?.addEventListener('mousedown', onMouseDownLeftResize)

		return () => {
			refRight.current?.removeEventListener('mousedown', onMouseDownRightResize)
			refTop.current?.removeEventListener('mousedown', onMouseDownTopResize)
			refBottom.current?.removeEventListener(
				'mousedown',
				onMouseDownBottomResize
			)
			refLeft.current?.removeEventListener('mousedown', onMouseDownLeftResize)
		}
	}, [dropAreaRef])

	useEffect(() => {
		if (onResize) {
			onResize(scale)
		}
	}, [scale])

	return (
		<div
			ref={dropAreaRef}
			className="relative group/resize select-none rounded-md"
			style={{
				width: `${scale.width}px`,
				height: `${scale.height}px`,
			}}
		>
			<div
				ref={refLeft}
				className={classNames(
					'absolute hidden transition-all rounded-t-md group-hover/resize:flex items-center justify-center z-[100] cursor-col-resize h-full left-0 top-0 w-[5px] bg-blue-300',
					{
						'!flex': isResizing,
					}
				)}
			>
				<div className="size-10 rounded-md bg-white" />
			</div>
			<div
				ref={refTop}
				className={classNames(
					'absolute hidden transition-all group-hover/resize:flex items-center justify-center z-[100] cursor-row-resize h-[5px] left-0 top-0 w-full bg-blue-300',
					{
						'!flex': isResizing,
					}
				)}
			>
				<div className="w-10 h-2 rounded-md bg-white" />
			</div>
			<div
				ref={refRight}
				className={classNames(
					'absolute hidden transition-all group-hover/resize:flex items-center justify-center z-[100] cursor-col-resize h-full right-0 top-0 w-[5px] bg-blue-300',
					{
						'!flex': isResizing,
					}
				)}
			>
				<div className="size-10 rounded-md bg-white" />
			</div>
			<div
				ref={refBottom}
				className={classNames(
					'absolute hidden transition-all group-hover/resize:flex items-center justify-center z-[100] cursor-row-resize h-[5px] left-0 bottom-0 w-full bg-blue-300',
					{
						'!flex': isResizing,
					}
				)}
			>
				<div className="w-10 h-2 rounded-md bg-white" />
			</div>
			<div>{children}</div>
		</div>
	)
}

export default ResizableComponent
