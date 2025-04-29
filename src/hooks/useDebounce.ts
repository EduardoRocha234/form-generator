import {useRef} from 'react'

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	function debouncedFunction(...args: any[]) {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			callback(...args)
		}, delay)
	}

	return debouncedFunction
}
