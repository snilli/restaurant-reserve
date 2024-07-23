import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common'
import { CancelTablesRequestDto } from '../dto/cancel-tables.req-dto'
import { CreateTablesRequestDto } from '../dto/create-tables.req-dto'
import { ReserveTablesRequestDto } from '../dto/reserve-tables.req-dto'
import { ReserveTablesResponseDto } from '../dto/reserve-tables.res-dto'
import { OperatingTableService } from '../service/operating-table.service'

@Controller('reserve-tables')
export class ReserveTableController {
	constructor(private readonly operatingTableService: OperatingTableService) {}

	@Get('a')
	a() {
		return { a: 'a' }
	}
	@Post('/create')
	async create(@Body() dto: CreateTablesRequestDto) {
		try {
			this.operatingTableService.create(dto.tables)
		} catch (e) {
			throw new HttpException(e['message'], HttpStatus.BAD_REQUEST, { cause: e })
		}
	}

	@Post('/reserve')
	async reserve(@Body() dto: ReserveTablesRequestDto): Promise<ReserveTablesResponseDto> {
		try {
			return this.operatingTableService.reserve(dto.customers)
		} catch (e) {
			throw new HttpException(e['message'], HttpStatus.BAD_REQUEST, { cause: e })
		}
	}

	@Post('/cancel')
	async cancel(@Body() dto: CancelTablesRequestDto): Promise<ReserveTablesResponseDto> {
		try {
			return this.operatingTableService.cancel(dto.bookingID)
		} catch (e) {
			throw new HttpException(e['message'], HttpStatus.BAD_REQUEST, { cause: e })
		}
	}
}
