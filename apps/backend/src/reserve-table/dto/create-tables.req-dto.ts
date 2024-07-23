import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

export class CreateTablesRequestDto extends createZodDto(
	z.object({
		tables: z.number(),
	}),
) {}
