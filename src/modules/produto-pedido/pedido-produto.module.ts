import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutoPedido } from './entity';
import { ProdutoPedidoQueryService } from './queries/produto-pedido.query.service';
import { ProdutoPedidoCommandController } from './command/produto-pedido.command.controller';
import { ProdutoPedidoCommandService } from './command/produto-pedido.command.service';
import { ProdutoPedidoQueryController } from './queries/produto-pedido.query.controller';
import { Pedido } from '../pedido/entity';
import { Produto } from '../produto/entity';


@Module({
	imports: [TypeOrmModule.forFeature([ProdutoPedido, Produto, Pedido])],
	controllers: [ProdutoPedidoCommandController, ProdutoPedidoQueryController],
	providers: [ProdutoPedidoCommandService, ProdutoPedidoQueryService],
	exports: [ProdutoPedidoCommandService],
})
export class PedidoProdutoModule { }
