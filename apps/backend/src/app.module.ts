import { Module } from '@nestjs/common'
import { ReserveTableModule } from './reserve-table/reserve-table.module'

@Module({
	imports: [ReserveTableModule],
})
export class AppModule {}
