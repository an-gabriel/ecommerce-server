import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { PedidoProdutoModule } from './modules/produto-pedido/pedido-produto.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'server-postgres-1',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'dev-database',
			autoLoadEntities: true,
			synchronize: true,
		}),
		CategoriaModule,
		ClienteModule,
		EnderecoModule,
		PedidoModule,
		ProdutoModule,
		PedidoProdutoModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {

}
