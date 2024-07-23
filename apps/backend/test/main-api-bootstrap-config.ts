import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { TransformInterceptor } from '@app/transform.interceptor'
import { INestApplication, VersioningType } from '@nestjs/common'
import compression from 'compression'

/* app specific files */

export function configureMainApiNestApp(app: INestApplication) {
	app.enableCors()
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	})
	app.useGlobalPipes(new ZodValidationPipe())
	app.useGlobalInterceptors(new TransformInterceptor())
	app.use(compression())

	return app
}
