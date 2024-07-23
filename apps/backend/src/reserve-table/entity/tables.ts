import { Bookings } from './bookings'
import { TableReserve as TableDetail } from './interfaces'

export class Tables {
	private seats: number
	private allTable: number
	private bookings: Bookings

	constructor(table: number, seats?: number) {
		this.allTable = table
		this.seats = seats ?? 4
		this.bookings = new Bookings()
	}

	reserve(customers: number): TableDetail {
		const tableReserve = this.prepareTable(customers)
		if (tableReserve + this.bookings.reserved > this.allTable) {
			throw new Error('No table available')
		}

		return {
			bookingID: this.bookings.reserve(tableReserve),
			reservedTable: this.bookings.reserved,
			remeningTable: this.remeningTable(),
		}
	}

	cancel(bookingID: string): TableDetail {
		this.bookings.cancel(bookingID)!

		return {
			bookingID: bookingID,
			reservedTable: this.bookings.reserved,
			remeningTable: this.remeningTable(),
		}
	}

	private remeningTable() {
		return this.allTable - this.bookings.reserved
	}

	private prepareTable(customers: number): number {
		return Math.ceil(customers / this.seats)
	}
}
