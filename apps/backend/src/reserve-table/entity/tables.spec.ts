import { beforeEach, describe, expect, test } from 'vitest'
import { Tables } from './tables'

describe('Tables', () => {
	let table: Tables
	beforeEach(() => {
		table = new Tables(5, 4)
	})

	describe('Table Reserve', () => {
		test('Throw error when reserve over table available', async () => {
			const customers = 1
			const result = table.reserve(customers)
			expect(result.bookingID).toBeDefined()
			expect(result.reservedTable).toEqual(1)
			expect(result.remeningTable).toEqual(4)
		})

		test('Should be reserve with 5 table', async () => {
			const customers = 20
			const result = table.reserve(customers)
			expect(result.bookingID).toBeDefined()
			expect(result.reservedTable).toEqual(5)
			expect(result.remeningTable).toEqual(0)
		})
	})
})
