import { Module } from '@nestjs/common'
import { ReserveTableController } from './controller/reserve-table.controller'
import { OperatingTableService } from './service/operating-table.service'

@Module({
	providers: [OperatingTableService],
	controllers: [ReserveTableController],
})
export class ReserveTableModule {}
