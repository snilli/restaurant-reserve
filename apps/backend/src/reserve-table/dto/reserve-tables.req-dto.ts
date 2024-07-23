import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

export class ReserveTablesRequestDto extends createZodDto(
	z.object({
		customers: z.number(),
	}),
) {}
