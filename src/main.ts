import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Configuração do Swagger
	const config = new DocumentBuilder()
		.setTitle('Ecommerce')
		.setDescription('desenvolvido para o teste de fullstack do GB')
		.setVersion('1.0')
		.addTag('categorias', 'Operações relacionadas a categorias')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	// Configuração manual dos controladores
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}

bootstrap();
