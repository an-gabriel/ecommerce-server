import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PedidoCommandService } from './pedido-command.service';
import { CreatePedidoDto, UpdatePedidoDto } from '../dto';
import { Pedido } from '../entity';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoCommandController {
	constructor(private readonly pedidoCommandService: PedidoCommandService) { }

	@Post()
	@ApiOperation({ summary: 'Cria um novo pedido' })
	@ApiCreatedResponse({ description: 'Pedido criado com sucesso', type: Pedido })
	@ApiBearerAuth('JWT-auth')
	async create(@Body() createPedidoDto: CreatePedidoDto) {
		return this.pedidoCommandService.create(createPedidoDto);
	}

	@Put(':pedido_id')
	@ApiOperation({ summary: 'Atualiza um pedido existente' })
	@ApiOkResponse({ description: 'Pedido atualizado com sucesso', type: Pedido })
	@ApiBearerAuth('JWT-auth')
	async update(@Param('pedido_id') pedido_id: number, @Body() updatePedidoDto: UpdatePedidoDto) {
		return this.pedidoCommandService.update(pedido_id, updatePedidoDto);
	}

	@Delete(':pedido_id')
	@ApiOperation({ summary: 'Exclui um pedido existente' })
	@ApiOkResponse({ description: 'Pedido excluído com sucesso' })
	@ApiBearerAuth('JWT-auth')
	async delete(@Param('pedido_id') pedido_id: number) {
		return this.pedidoCommandService.delete(pedido_id);
	}
}
