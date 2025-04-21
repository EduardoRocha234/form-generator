import {
	DragItem,
	FormElement
} from '../../interfaces/drop-form.interface'

// export const determineDropPosition = (
// 	x: number,
// 	y: number,
// 	elements: FormElement[],
// 	formRows: NodeListOf<Element>
// ): {
// 	row: number
// 	position: number
// 	resizeElements: {id: string; width: number}[]
// 	width: number
// } => {
// 	const resizeElements: {id: string; width: number}[] = []

// 	// Remove o elemento de preview (com id 'preview') do cálculo
// 	const realElements = elements.filter((el) => el.id !== 'preview')

// 	// Se não há elementos reais, adiciona na primeira linha
// 	if (realElements.length === 0) {
// 		return {row: 0, position: 0, resizeElements, width: 100}
// 	}

// 	// Agrupa por linha
// 	const rows: Record<number, FormElement[]> = {}
// 	realElements.forEach((el) => {
// 		if (!rows[el.row]) rows[el.row] = []
// 		rows[el.row].push(el)
// 	})

// 	// Determina a linha mais próxima do Y
// 	let targetRow = 0
// 	let minDistance = Infinity

// 	formRows.forEach((rowElem, idx) => {
// 		const rect = rowElem.getBoundingClientRect()
// 		const rowMiddle = rect.top + rect.height / 2
// 		const distance = Math.abs(y - rowMiddle)

// 		if (distance < minDistance) {
// 			minDistance = distance
// 			targetRow = idx
// 		}
// 	})

// 	// Se o drop estiver abaixo da última linha, cria nova linha
// 	if (formRows.length > 0) {
// 		const lastRowRect = formRows[formRows.length - 1].getBoundingClientRect()
// 		if (y + 100 > lastRowRect.bottom) {
// 			targetRow = formRows.length
// 		}
// 	}

// 	const rowElements = rows[targetRow] || []
// 	const position = rowElements.length
// 	const width = Math.floor(100 / (rowElements.length + 1))

// 	// Redimensiona todos os elementos da linha para acomodar o novo
// 	rowElements.forEach((e) => {
// 		resizeElements.push({id: e.id, width})
// 	})

// 	console.log(resizeElements)

// 	return {
// 		row: targetRow,
// 		position,
// 		resizeElements,
// 		width,
// 	}
// }

export const calculateDropElements = (
	item: DragItem,
	elements: FormElement[],
	targetRow: number,
	isPreview?: boolean
) => {
	const previewId = item.id ?? 'preview'

	const newElements = elements.filter((el) => el.id !== previewId)

	// Agrupa por linha
	const rows: Record<number, FormElement[]> = {}
	newElements.forEach((el) => {
		if (!rows[el.row]) rows[el.row] = []
		rows[el.row].push(el)
	})

	const rowElements = rows[targetRow] || []
	const position = rowElements.length
	const width = Math.floor(100 / (rowElements.length + 1))

	const resizeElements: {id: string; width: number}[] = []

	// Redimensiona todos os elementos da linha para acomodar o novo
	rowElements.forEach((e) => {
		resizeElements.push({id: e.id, width})
	})

	// Create a copy of the elements with resized widths
	const resultElements = [...newElements]

	resizeElements.forEach((resize) => {
		const idx = resultElements.findIndex((el) => el.id === resize.id)
		if (idx !== -1) {
			resultElements[idx] = {
				...resultElements[idx],
				width: resize.width,
			}
		}
	})

	// Add the new element
	resultElements.push({
		id: isPreview ? 'preview' : `${item.type}-${Date.now()}`,
		type: item.type,
		width,
		row: targetRow,
		position,
	})

	return resultElements.sort((a, b) => {
		if (a.row !== b.row) return a.row - b.row
		return a.position - b.position
	})
}

export const calculateResizeElements = (prevElements: FormElement[], id: string, newWidth: number) => {
	// Encontra o elemento que foi alterado
	const targetElement = prevElements.find((el) => el.id === id)
	if (!targetElement) return prevElements

	const targetRow = targetElement.row

	// Pega todos os elementos da mesma linha
	const elementsInRow = prevElements.filter((el) => el.row === targetRow)

	const originalWidth = targetElement.width
	const widthDiff = newWidth - originalWidth

	// Calcula quanto precisa ser redistribuído entre os outros
	const otherElements = elementsInRow.filter((el) => el.id !== id)
	const numOthers = otherElements.length

	// Evita divisão por zero
	if (numOthers === 0) {
		// Só tem 1 elemento na linha, atualiza ele direto
		return prevElements.map((el) =>
			el.id === id ? {...el, width: Math.min(100, Math.max(0, newWidth))} : el
		)
	}

	const redistributedWidth = widthDiff / numOthers

	// Atualiza os elementos
	return prevElements.map((el) => {
		if (el.row !== targetRow) return el

		if (el.id === id) {
			return {...el, width: Math.min(100, Math.max(0, newWidth))}
		} else {
			const newElWidth = el.width - redistributedWidth
			return {
				...el,
				width: Math.max(0, newElWidth),
			}
		}
	})
}
