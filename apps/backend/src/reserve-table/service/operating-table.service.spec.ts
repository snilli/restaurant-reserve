import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { OperatingTableService } from './operating-table.service'

describe('OperatingTableService', () => {
	let service: OperatingTableService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [OperatingTableService],
		}).compile()

		service = module.get<OperatingTableService>(OperatingTableService)
	})

	describe('create table', () => {
		it('should return the table', () => {
			const tables = service.create(4)
			expect(tables).toBeDefined()
		})

		it('throw error when table already exist', () => {
			try {
				service.create(4)
				service.create(4)
			} catch (error) {
				expect(error).toBeDefined()
			}
		})
	})

	describe('reserve table', () => {
		it('reserve table success', () => {
			service.create(4)
			const res = service.reserve(10)
			expect(res.reservedTable).toEqual(3)
			expect(res.remeningTable).toEqual(1)
		})

		it('throw error when not create table before reserve', () => {
			try {
				service.reserve(10)
			} catch (error) {
				expect(error).toBeDefined()
			}
		})
	})

	describe('cancel table', () => {
		it('cancel table success', () => {
			service.create(4)
			const { bookingID } = service.reserve(10)
			const res = service.cancel(bookingID)
			expect(res.reservedTable).toEqual(0)
			expect(res.remeningTable).toEqual(4)
		})

		it('throw error when not create table before cancel', () => {
			try {
				service.cancel('asdsads')
			} catch (error) {
				expect(error).toBeDefined()
			}
		})
	})
})
