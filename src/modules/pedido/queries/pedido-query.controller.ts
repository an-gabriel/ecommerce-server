import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { PedidoQueryService } from './pedido-query.service';
import { Pedido } from '../entity'; 

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoQueryController {
	constructor(private readonly pedidoQueryService: PedidoQueryService) { }

	@Get()
	@ApiOperation({ summary: 'Retorna uma lista de todos os pedidos' })
	@ApiOkResponse({ description: 'Lista de pedidos retornada com sucesso', type: [Pedido] })
	async findAll() {
		return this.pedidoQueryService.findAll();
	}

	@Get(':pedido_id')
	@ApiOperation({ summary: 'Retorna os detalhes de um pedido específico' })
	@ApiOkResponse({ description: 'Detalhes do pedido retornados com sucesso', type: Pedido })
	async findOne(@Param('pedido_id') pedido_id: number) {
		return this.pedidoQueryService.findOne(pedido_id);
	}
}
