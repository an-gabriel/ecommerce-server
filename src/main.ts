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

	// Middleware de CORS customizado
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001/');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept',
		);
		next();
	});

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

	app.use('/api-json', express.static(path.join(__dirname, 'swagger.json')));

	// Aplicação do ValidationPipe globalmente
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
}

bootstrap();
