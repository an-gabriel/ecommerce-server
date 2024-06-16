import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as express from 'express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: true,
	});

	app.enableCors({ origin: true })

	// Middleware de autenticação global
	app.use(new AuthMiddleware().use);

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

	// Aplicação do ValidationPipe globalmente
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
}

bootstrap();
