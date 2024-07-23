import { beforeEach, describe, expect, test } from 'vitest'
import { Bookings } from './bookings'

describe('Bookings', () => {
	let booking: Bookings

	beforeEach(() => {
		booking = new Bookings()
	})

	describe('reserve', () => {
		test('Should be reserve with 1 table and return id', async () => {
			const tableReserve = 2
			const bookingID = booking.reserve(tableReserve)
			expect(bookingID).toBeDefined()
			expect(booking.info(bookingID)).eq(tableReserve)
		})
	})

	describe('cancel reserve', () => {
		test('Should be cancel that booking with existing booking id', async () => {
			const tableReserve = 4
			const bookingID = booking.reserve(tableReserve)

			expect(bookingID).toBeDefined()
			expect(booking.cancel(bookingID)).eq(tableReserve)
		})

		test('Should be cancel that booking with not existing booking id', async () => {
			try {
				const bookingID = 'kokokokokokoaoskdasodksao'
			} catch (e) {
				expect(e.message).eq('Booking not found')
			}
		})
	})

	describe('booking info', () => {
		test('Should be get reserved table when get info with existing booking id', async () => {
			const tableReserve = 4
			const bookingID = booking.reserve(tableReserve)

			expect(booking.info(bookingID)).eq(tableReserve)
		})

		test('Should be undefined when get info with not existing booking id', async () => {
			expect(booking.info('asdasdasd')).toBeUndefined()
		})
	})
})
