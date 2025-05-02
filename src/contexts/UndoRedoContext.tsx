import { createContext, useCallback, useContext, useState } from 'react'
import { FormElement } from '@/interfaces'

export function useUndoRedo<T>(initialState: T) {
	const [state, setState] = useState<T>(initialState)
	const [history, setHistory] = useState<T[]>([])
	const [future, setFuture] = useState<T[]>([])

	const update = useCallback(
		(newState: T) => {
			setHistory((prev) => [...prev, state])
			setState(newState)
			setFuture([])
		},
		[state]
	)

	const undo = useCallback(() => {
		if (history.length === 0) return
		const previous = history[history.length - 1]
		setFuture((prev) => [state, ...prev])
		setHistory((prev) => prev.slice(0, -1))
		setState(previous)
	}, [history, state])

	const redo = useCallback(() => {
		if (future.length === 0) return
		const next = future[0]
		setHistory((prev) => [...prev, state])
		setFuture((prev) => prev.slice(1))
		setState(next)
	}, [future, state])

	return {
		state,
		update,
		undo,
		redo,
		canUndo: history.length > 0,
		canRedo: future.length > 0,
	}
}

type UndoRedoContextType = {
	undo: () => void
	redo: () => void
	canUndo: boolean
	canRedo: boolean
	elements: FormElement[]
	setElements: (elements: any[]) => void
}

const UndoRedoContext = createContext<UndoRedoContextType | null>(null)

export const useUndoRedoContext = () => {
	const context = useContext(UndoRedoContext)
	if (!context)
		throw new Error('useUndoRedoContext must be used within provider')
	return context
}

export const UndoRedoProvider = ({children}: {children: React.ReactNode}) => {
	const {
		state: elements,
		update: setElements,
		undo,
		redo,
		canUndo,
		canRedo,
	} = useUndoRedo<FormElement[]>([])

	return (
		<UndoRedoContext.Provider
			value={{elements, setElements, undo, redo, canUndo, canRedo}}
		>
			{children}
		</UndoRedoContext.Provider>
	)
}
