import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProdutoPedidoCommandService } from './produto-pedido.command.service';
import { CreateProdutoPedidoDto, UpdateProdutoPedidoDto } from '../dto';
import { ProdutoPedido } from '../entity';

@ApiTags('produto-pedido')
@Controller('produto-pedido')
export class ProdutoPedidoCommandController {
	constructor(private readonly produtoPedidoCommandService: ProdutoPedidoCommandService) { }

	@Post()
	@ApiOperation({ summary: 'Cria um novo produto-pedido' })
	@ApiCreatedResponse({ description: 'Produto-pedido criado com sucesso', type: ProdutoPedido })
	@ApiBearerAuth('JWT-auth')
	async create(@Body() createProdutoPedidoDto: CreateProdutoPedidoDto): Promise<ProdutoPedido> {
		return this.produtoPedidoCommandService.create(createProdutoPedidoDto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Atualiza um produto-pedido existente' })
	@ApiOkResponse({ description: 'Produto-pedido atualizado com sucesso', type: ProdutoPedido })
	@ApiBearerAuth('JWT-auth')
	async update(
		@Param('id') id: number,
		@Body() updateProdutoPedidoDto: UpdateProdutoPedidoDto,
	): Promise<ProdutoPedido> {
		return this.produtoPedidoCommandService.update(id, updateProdutoPedidoDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Exclui um produto-pedido existente' })
	@ApiOkResponse({ description: 'Produto-pedido excluído com sucesso' })
	@ApiBearerAuth('JWT-auth')
	async delete(@Param('id') id: number): Promise<void> {
		return this.produtoPedidoCommandService.delete(id);
	}
}
