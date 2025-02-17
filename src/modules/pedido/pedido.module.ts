import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pedido } from './entity';
import { PedidoQueryService } from './queries/pedido-query.service';
import { PedidoCommandService } from './command/pedido-command.service';
import { PedidoQueryController } from './queries/pedido-query.controller';
import { PedidoCommandController } from './command/pedido-command.controller';
import { Cliente } from '../cliente/entity';


@Module({
	imports: [TypeOrmModule.forFeature([Pedido, Cliente])],
	controllers: [PedidoCommandController, PedidoQueryController],
	providers: [PedidoCommandService, PedidoQueryService],
	exports: [PedidoCommandService],
})
export class PedidoModule { }
