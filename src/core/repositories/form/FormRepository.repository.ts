import {DynamicForm} from '../../../interfaces'
import {FormRepository} from './FormRepository.interface'

const STORAGE_KEY = 'user-forms'

export class LocalFormRepository implements FormRepository {
	async getAllForms(): Promise<DynamicForm[]> {
		const raw = localStorage.getItem(STORAGE_KEY)
		return raw ? JSON.parse(raw) : []
	}

	async getFormById(id: string) {
		const forms = await this.getAllForms()

		const form = forms.find((form: DynamicForm) => form.id === id)
		return form || null
	}

	async saveForm(form: DynamicForm) {
		const forms = await this.getAllForms()
		forms.push(form)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(forms))
	}

	async updateForm(form: DynamicForm): Promise<void> {
		try {
			const forms = await this.getAllForms()
			const index = forms.findIndex((f) => f.id === form.id)

			console.log(index)

			if (index !== -1) {
				const getForm = forms[index]
				forms[index] = {...getForm, ...form}
				localStorage.setItem(STORAGE_KEY, JSON.stringify(forms))
				return
			}

			throw new Error('Erro ao atualizar formulário')
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}

	async deleteForm(id: string) {
		const forms = await this.getAllForms()
		const updated = forms.filter((f) => f.id !== id)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
	}
}
