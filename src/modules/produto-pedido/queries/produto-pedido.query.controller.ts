import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProdutoPedidoQueryService } from './produto-pedido.query.service';
import { ProdutoPedido } from '../entity';

@ApiTags('produto-pedido')
@Controller('produto-pedido')
export class ProdutoPedidoQueryController {
	constructor(private readonly produtoPedidoQueryService: ProdutoPedidoQueryService) { }

	@Get()
	@ApiOperation({ summary: 'Retorna uma lista de todos os produtos-pedidos' })
	@ApiOkResponse({ description: 'Lista de produtos-pedidos retornada com sucesso', type: [ProdutoPedido] })
	@ApiBearerAuth('JWT-auth')
	async findAll() {
		return this.produtoPedidoQueryService.findAll();
	}

	@Get(':produto_pedido_id')
	@ApiOperation({ summary: 'Retorna os detalhes de um produto-pedido específico' })
	@ApiOkResponse({ description: 'Detalhes do produto-pedido retornados com sucesso', type: ProdutoPedido })
	@ApiBearerAuth('JWT-auth')
	async findOne(@Param('produto_pedido_id') produto_pedido_id: number) {
		return this.produtoPedidoQueryService.findOne(produto_pedido_id);
	}
}
