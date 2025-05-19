import {DynamicForm} from '@/core/interfaces'
import {FormRepository} from './FormRepository.interface'
import {db} from '@/core/infra/db'
import {v4 as uuidv4} from 'uuid'

export class LocalFormRepository implements FormRepository {
	async getAllForms(): Promise<DynamicForm[]> {
		try {
			const forms = await db.forms.toArray()
			return forms
		} catch (error) {
			throw new Error((error as Error).message)
		}
	}

	async getFormById(id: string) {
		try {
			const form = await db.forms.get(id)
			return form
		} catch (error) {
			throw new Error((error as Error).message)
		}
	}

	async saveForm({
		title,
		description,
		elements,
	}: Omit<DynamicForm, 'id' | 'createdAt'>) {
		try {
			const id = await db.forms.add({
				id: uuidv4(),
				title,
				elements,
				description,
				createdAt: new Date(),
			})

			return id
		} catch (error) {
			throw new Error((error as Error).message)
		}
	}

	async updateForm({id, ...form}: DynamicForm): Promise<void> {
		try {
			const findForm = await this.getFormById(id)

			if (!findForm) {
				throw new Error(`Form with id ${id} not found`)
			}

			await db.forms.update(id, {...form})
		} catch (error) {
			throw new Error((error as Error).message)
		}
	}

	async deleteForm(id: string) {
		try {
			const findForm = await this.getFormById(id)

			if (!findForm) {
				throw new Error(`Form with id ${id} not found`)
			}

			await db.forms.where('id').equals(id).delete()
		} catch (error) {
			throw new Error((error as Error).message)
		}
	}
}
