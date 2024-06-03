import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EnderecoCommandService } from './endereco-command.service';
import { CreateEnderecoDto, UpdateEnderecoDto } from '../dto';
import { Endereco } from '../entity';

@ApiTags('enderecos')
@Controller('enderecos')
export class EnderecoCommandController {
	constructor(private readonly enderecoCommandService: EnderecoCommandService) { }

	@Post()
	@ApiOperation({ summary: 'Cria um novo endereço' })
	@ApiCreatedResponse({ description: 'Endereço criado com sucesso', type: Endereco })
	@ApiBearerAuth('JWT-auth')
	async create(@Body() createEnderecoDto: CreateEnderecoDto) {
		return this.enderecoCommandService.create(createEnderecoDto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Atualiza um endereço existente' })
	@ApiOkResponse({ description: 'Endereço atualizado com sucesso', type: Endereco })
	@ApiBearerAuth('JWT-auth')
	async update(@Param('id') id: number, @Body() updateEnderecoDto: UpdateEnderecoDto) {
		return this.enderecoCommandService.update(id, updateEnderecoDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Exclui um endereço existente' })
	@ApiOkResponse({ description: 'Endereço excluído com sucesso' })
	@ApiBearerAuth('JWT-auth')
	async delete(@Param('id') id: number) {
		return this.enderecoCommandService.delete(id);
	}
}
