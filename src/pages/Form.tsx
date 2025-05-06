import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {DynamicForm} from '@/interfaces'
import {formService} from '@/core'
import {useDebounce} from '@/hooks/useDebounce'
import DropForm from '@/components/DropForm/Index'
import EditorLayout from '@/layouts/EditorLayout'
import {useFormContext} from '@/contexts/FormContext'

function Editor() {
	const {id} = useParams<{id?: string}>()

	const {currentForm, setForm} = useFormContext()

	const setInitialForm = async () => {
		if (!id) return

		const existingForm = await formService.getFormById(id)

		if (existingForm) {
			setForm(existingForm)
		} else {
			const newForm = {
				id,
				title: 'My Form',
				description: '',
				elements: [],
				createdAt: new Date(),
			}

			await formService.saveForm(newForm)
			setForm(newForm as DynamicForm)
		}
	}

	const handleSaveForm = async (form: DynamicForm) => {
		await formService.updateForm(form)
	}

	const debounceSetForm = useDebounce(handleSaveForm, 500)

	const handleSetForm = async (form: DynamicForm) => {
		setForm(form)
		debounceSetForm(form)
	}

	useEffect(() => {
		setInitialForm()
	}, [id])

	return (
		<EditorLayout>
			<DropForm
				form={currentForm}
				setForm={handleSetForm}
			/>
		</EditorLayout>
	)
}

export default Editor
