import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ClienteCommandService } from './cliente-command.service';
import { CreateClienteDto, UpdateClienteDto } from '../dto';
import { Cliente } from '../entity'; // Assumindo que você tenha a entidade Cliente

@ApiTags('clientes')
@Controller('clientes')
export class ClienteCommandController {
	constructor(private readonly clienteCommandService: ClienteCommandService) { }

	@Post()
	@ApiOperation({ summary: 'Cria um novo cliente' })
	@ApiCreatedResponse({ description: 'Cliente criado com sucesso', type: Cliente })
	async create(@Body() createClienteDto: CreateClienteDto) {
		return this.clienteCommandService.create(createClienteDto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Atualiza um cliente existente' })
	@ApiOkResponse({ description: 'Cliente atualizado com sucesso', type: Cliente })
	async update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
		return this.clienteCommandService.update(id, updateClienteDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Exclui um cliente existente' })
	@ApiOkResponse({ description: 'Cliente excluído com sucesso' })
	async delete(@Param('id') id: number) {
		return this.clienteCommandService.delete(id);
	}
}
