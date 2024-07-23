import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { INestApplication, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import { AppModule } from './app.module'
import { TransformInterceptor } from './transform.interceptor'

export function setupApp(app: INestApplication) {
	app.enableCors()
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	})
	app.useGlobalPipes(new ZodValidationPipe())
	app.useGlobalInterceptors(new TransformInterceptor())
	app.use(compression())
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	setupApp(app)
	await app.listen(8080)
}

bootstrap()
