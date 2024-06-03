import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProdutoCommandService } from './produto-command.service';
import { CreateProdutoDto, UpdateProdutoDto } from '../dto';
import { Produto } from '../entity';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutoCommandController {
	constructor(private readonly produtoCommandService: ProdutoCommandService) { }

	@Post()
	@ApiOperation({ summary: 'Cria um novo produto' })
	@ApiCreatedResponse({ description: 'Produto criado com sucesso', type: Produto })
	@ApiBearerAuth('JWT-auth')
	async create(@Body() createProdutoDto: CreateProdutoDto) {
		return this.produtoCommandService.create(createProdutoDto);
	}

	@Put(':produto_id')
	@ApiOperation({ summary: 'Atualiza um produto existente' })
	@ApiOkResponse({ description: 'Produto atualizado com sucesso', type: Produto })
	@ApiBearerAuth('JWT-auth')
	async update(@Param('produto_id') produto_id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
		return this.produtoCommandService.update(produto_id, updateProdutoDto);
	}

	@Delete(':produto_id')
	@ApiOperation({ summary: 'Exclui um produto existente' })
	@ApiOkResponse({ description: 'Produto excluído com sucesso' })
	@ApiBearerAuth('JWT-auth')
	async delete(@Param('produto_id') produto_id: number) {
		return this.produtoCommandService.delete(produto_id);
	}
}
