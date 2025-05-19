import {DynamicForm} from '@/core/interfaces'
import {createContext, useContext, useState} from 'react'

type FormContextType = {
	currentForm?: DynamicForm
	setForm: (form: DynamicForm) => void
}

const FormContext = createContext<FormContextType | null>(null)

export const useFormContext = () => {
	const context = useContext(FormContext)
	if (!context) throw new Error('useFormContext must be used within provider')
	return context
}

export const FormProvider = ({children}: {children: React.ReactNode}) => {
	const [form, setForm] = useState<DynamicForm>()

	return (
		<FormContext.Provider value={{currentForm: form, setForm}}>
			{children}
		</FormContext.Provider>
	)
}
