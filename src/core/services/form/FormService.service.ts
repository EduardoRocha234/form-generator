import {DynamicForm} from '@/core/interfaces'
import {LocalFormRepository} from '../../repositories/form/FormRepository.repository'

const repo = new LocalFormRepository()

export const formService = {
	getAllForms: () => repo.getAllForms(),
	getFormById: (id: string) => repo.getFormById(id),
	saveForm: (form: Omit<DynamicForm, 'id' | 'createdAt'>) => repo.saveForm(form),
	updateForm: (form: DynamicForm) => repo.updateForm(form),
	deleteForm: (id: string) => repo.deleteForm(id),
} as const
