import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

export class CancelTablesRequestDto extends createZodDto(
	z.object({
		bookingID: z.string(),
	}),
) {}
