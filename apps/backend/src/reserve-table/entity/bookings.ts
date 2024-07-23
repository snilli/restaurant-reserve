export class Bookings {
	private bookingMap: Map<string, number>
	protected _reserved: number

	constructor() {
		this.bookingMap = new Map<string, number>()
		this._reserved = 0
	}

	reserve(table: number): string {
		const id = this.genId()
		this.bookingMap.set(id, table)
		this._reserved += table
		return id
	}

	info(bookingID: string) {
		return this.bookingMap.get(bookingID)
	}

	cancel(bookingID: string) {
		const reservedTable = this.bookingMap.get(bookingID)
		if (reservedTable) {
			this.bookingMap.delete(bookingID)
			this._reserved -= reservedTable

			return reservedTable
		}

		throw new Error('Booking not found')
	}

	get reserved() {
		return this._reserved
	}

	private genId() {
		return new Date().getTime().toString()
	}
}
