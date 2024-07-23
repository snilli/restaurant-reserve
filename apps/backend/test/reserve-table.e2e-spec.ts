import { setupApp } from '@app/main'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeEach, describe, it, vi } from 'vitest'
import { AppModule } from '../src/app.module'

describe('ReserveTableController (e2e)', () => {
	let app: INestApplication
	vi.useFakeTimers()
	const date = new Date(2000, 1, 1, 13)
	vi.setSystemTime(date)

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		setupApp(app)
		await app.init()
	})

	describe('/v1/reserve-tables/create (POST)', () => {
		it('Create success', () => {
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/create')
				.send({ tables: 20 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
				})
		})

		it('Throw error when already create', async () => {
			await request(app.getHttpServer())
				.post('/v1/reserve-tables/create')
				.send({ tables: 20 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
				})
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/create')
				.send({ tables: 20 })
				.expect(400)
				.expect({
					message: 'Table already exsist',
					statusCode: 400,
				})
		})
	})

	describe('/v1/reserve-tables/reserve (POST)', () => {
		it('Reserve tables success', async () => {
			await request(app.getHttpServer())
				.post('/v1/reserve-tables/create')
				.send({ tables: 20 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
				})
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/reserve')
				.send({ customers: 10 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
					data: {
						bookingID: '949384800000',
						remeningTable: 17,
						reservedTable: 3,
					},
				})
		})

		it('Throw error when over reserve table', async () => {
			await request(app.getHttpServer())
				.post('/v1/reserve-tables/create')
				.send({ tables: 5 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
				})
			await request(app.getHttpServer())
				.post('/v1/reserve-tables/reserve')
				.send({ customers: 10 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
					data: {
						bookingID: '949384800000',
						remeningTable: 2,
						reservedTable: 3,
					},
				})
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/reserve')
				.send({ customers: 10 })
				.expect(400)
				.expect({
					message: 'No table available',
					statusCode: 400,
				})
		})

		it('Throw error when not create before', async () => {
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/reserve')
				.send({ customers: 10 })
				.expect(400)
				.expect({
					message: 'Table not created',
					statusCode: 400,
				})
		})
	})

	describe('/v1/reserve-tables/cancel (POST)', () => {
		it('Cancel success', async () => {
			await request(app.getHttpServer())
				.post('/v1/reserve-tables/create')
				.send({ tables: 20 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
				})
			await request(app.getHttpServer())
				.post('/v1/reserve-tables/reserve')
				.send({ customers: 10 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
					data: {
						bookingID: '949384800000',
						remeningTable: 17,
						reservedTable: 3,
					},
				})
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/cancel')
				.send({ bookingID: '949384800000' })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
					data: {
						bookingID: '949384800000',
						remeningTable: 20,
						reservedTable: 0,
					},
				})
		})

		it('Throw error when try to cancel without booking before', async () => {
			await request(app.getHttpServer())
				.post('/v1/reserve-tables/create')
				.send({ tables: 20 })
				.expect(201)
				.expect({
					message: 'Success',
					statusCode: 200,
				})
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/cancel')
				.send({ bookingID: '949384800000' })
				.expect(400)
				.expect({
					message: 'Booking not found',
					statusCode: 400,
				})
		})

		it('Throw error when not create before', async () => {
			return request(app.getHttpServer())
				.post('/v1/reserve-tables/cancel')
				.send({ bookingID: '949384800000' })
				.expect(400)
				.expect({
					message: 'Table not created',
					statusCode: 400,
				})
		})
	})

	afterAll(async () => {
		await app.close()
	})
})
