import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ClienteQueryService } from './cliente-query.service';
import { Cliente } from '../entity'; // Assumindo que você tenha a entidade Cliente

@ApiTags('clientes')
@Controller('clientes')
export class ClienteQueryController {
	constructor(private readonly clienteQueryService: ClienteQueryService) { }

	@Get()
	@ApiOperation({ summary: 'Retorna uma lista de todos os clientes' })
	@ApiOkResponse({ description: 'Lista de clientes retornada com sucesso', type: [Cliente] })
	async findAll() {
		return this.clienteQueryService.findAll();
	}

	@Get(':cliente_id')
	@ApiOperation({ summary: 'Retorna os detalhes de um cliente específico' })
	@ApiOkResponse({ description: 'Detalhes do cliente retornados com sucesso', type: Cliente })
	async findOne(@Param('cliente_id') cliente_id: number) {
		return this.clienteQueryService.findOne(cliente_id);
	}
}
