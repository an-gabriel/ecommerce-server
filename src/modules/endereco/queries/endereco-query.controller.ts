import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { EnderecoQueryService } from './endereco-query.service';
import { Endereco } from '../entity';

@ApiTags('enderecos')
@Controller('enderecos')
export class EnderecoQueryController {
	constructor(private readonly enderecoQueryService: EnderecoQueryService) { }

	@Get()
	@ApiOperation({ summary: 'Retorna uma lista de todos os endereços' })
	@ApiOkResponse({ description: 'Lista de endereços retornada com sucesso', type: [Endereco] })
	async findAll() {
		return this.enderecoQueryService.findAll();
	}

	@Get(':endereco_id')
	@ApiOperation({ summary: 'Retorna os detalhes de um endereço específico' })
	@ApiOkResponse({ description: 'Detalhes do endereço retornados com sucesso', type: Endereco })
	async findOne(@Param('endereco_id') endereco_id: number) {
		return this.enderecoQueryService.findOne(endereco_id);
	}
}
