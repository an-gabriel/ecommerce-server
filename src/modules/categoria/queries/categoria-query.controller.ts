import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { CategoriaQueryService } from './categoria-query.service';
import { Categoria } from '../entity';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriaQueryController {
	constructor(private readonly categoriaQueryService: CategoriaQueryService) { }

	@Get()
	@ApiOperation({ summary: 'Lista todas as categorias' })
	@ApiOkResponse({ description: 'Retorna todas as categorias', type: [Categoria] })
	findAll() {
		return this.categoriaQueryService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Busca uma categoria pelo ID' })
	@ApiOkResponse({ description: 'Retorna a categoria correspondente ao ID', type: Categoria })
	findOne(@Param('id') id: number) {
		return this.categoriaQueryService.findOne(id);
	}
}
