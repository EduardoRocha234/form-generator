import {createContext, useContext} from 'react'
import {useUndoRedo} from './helpers'
import {FormElement} from '../../interfaces'

type UndoRedoContextType = {
	undo: () => void
	redo: () => void
	canUndo: boolean
	canRedo: boolean
	elements: any[]
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
