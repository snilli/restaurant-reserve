import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

export class ReserveTablesResponseDto extends createZodDto(
	z.object({
		bookingID: z.string(),
		reservedTable: z.number(),
		remeningTable: z.number(),
	}),
) {}
