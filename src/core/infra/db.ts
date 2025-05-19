import {DynamicForm} from '@/core/interfaces'
import Dexie, {type EntityTable} from 'dexie'

const db = new Dexie('formDropDB') as Dexie & {
	forms: EntityTable<DynamicForm, 'id'>
}

db.version(1).stores({
	forms: 'id, title, description, createdAt, elements',
})

export {db}
