import { Injectable } from '@nestjs/common'
import { Tables } from '../entity/tables'

@Injectable()
export class OperatingTableService {
	private tables?: Tables

	create(tables: number) {
		if (this.tables) {
			throw new Error('Table already exsist')
		}

		return (this.tables = new Tables(tables))
	}

	private getTable() {
		if (!this.tables) {
			throw new Error('Table not created')
		}

		return this.tables
	}

	reserve(customers: number) {
		const tables = this.getTable()
		return tables.reserve(customers)
	}

	cancel(bookingID: string) {
		const tables = this.getTable()
		return tables.cancel(bookingID)
	}
}
