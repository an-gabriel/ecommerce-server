import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProdutoQueryService } from './produto-query.service';
import { Produto } from '../entity';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutoQueryController {
	constructor(private readonly produtoQueryService: ProdutoQueryService) { }

	@Get()
	@ApiOperation({ summary: 'Lista todos os produtos' })
	@ApiOkResponse({ description: 'Produtos recuperados com sucesso', type: [Produto] })
	@ApiBearerAuth('JWT-auth')
	async findAll() {
		return this.produtoQueryService.findAll();
	}

	@Get(':produto_id')
	@ApiOperation({ summary: 'Recupera um produto pelo ID' })
	@ApiOkResponse({ description: 'Produto recuperado com sucesso', type: Produto })
	@ApiBearerAuth('JWT-auth')
	async findOne(@Param('produto_id') produto_id: number) {	
		return this.produtoQueryService.findOne(produto_id);
	}
}
