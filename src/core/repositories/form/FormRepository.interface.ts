import {DynamicForm} from '@/core/interfaces'

export interface FormRepository {
	getAllForms(): Promise<DynamicForm[]>
	getFormById(id: string): Promise<DynamicForm | undefined>
	saveForm(form: Omit<DynamicForm, 'id' | 'createdAt'>): Promise<string>
	updateForm(form: DynamicForm): Promise<void>
	deleteForm(id: string): Promise<void>
}
