import {useCallback, useState} from 'react'
import {DragItem, FormElement} from '../../interfaces'
import {v4 as uuidv4} from 'uuid'

export const calculateDropElements = (
	item: DragItem,
	elements: FormElement[],
	targetRow: number,
	isPreview?: boolean
) => {
	const previewId = item.id ?? 'preview'

	const newElements = elements.filter((el) => el.id !== previewId)

	const rows: Record<number, FormElement[]> = {}
	newElements.forEach((el) => {
		if (!rows[el.row]) rows[el.row] = []
		rows[el.row].push(el)
	})

	const rowElements = rows[targetRow] || []
	const position = rowElements.length
	const width = Math.floor(100 / (rowElements.length + 1))

	const resizeElements: {id: string; width: number}[] = []

	rowElements.forEach((e) => {
		resizeElements.push({id: e.id, width})
	})

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

	resultElements.push({
		id: isPreview ? 'preview' : `${item.type}-${uuidv4()}`,
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

export const calculateResizeElements = (
	prevElements: FormElement[],
	id: string,
	newWidth: number
) => {
	const targetElement = prevElements.find((el) => el.id === id)
	if (!targetElement) return prevElements

	const targetRow = targetElement.row

	const elementsInRow = prevElements.filter((el) => el.row === targetRow)

	const originalWidth = targetElement.width
	const widthDiff = newWidth - originalWidth

	const otherElements = elementsInRow.filter((el) => el.id !== id)
	const numOthers = otherElements.length

	if (numOthers === 0) {
		return prevElements.map((el) =>
			el.id === id ? {...el, width: Math.min(100, Math.max(0, newWidth))} : el
		)
	}

	const redistributedWidth = widthDiff / numOthers

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
