import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Middleware de autenticação global
	app.use(new AuthMiddleware().use);

	app.use(cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		preflightContinue: false,
	}));

	// Configuração do Swagger
	const config = new DocumentBuilder()
		.setTitle('Ecommerce')
		.setDescription('Desenvolvido para o teste de fullstack do GB')
		.setVersion('1.0')
		.addTag('categorias', 'Operações relacionadas a categorias')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'JWT-auth',
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	// Configuração do Swagger
	SwaggerModule.setup('api', app, document);

	app.use('/api-json', express.static(path.join(__dirname, 'swagger.json')));

	await app.listen(3000);
}

bootstrap();
