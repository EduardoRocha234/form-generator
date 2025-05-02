import {DynamicForm} from '@/interfaces'

export interface FormRepository {
	getAllForms(): Promise<DynamicForm[]>
	getFormById(id: string): Promise<DynamicForm | null>
	saveForm(form: DynamicForm): Promise<void>
	updateForm(form: DynamicForm): Promise<void>
	deleteForm(id: string): Promise<void>
}
