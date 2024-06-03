import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriaCommandService } from './categoria-command.service';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../dto';
import { Categoria } from '../entity';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriaCommandController {
	constructor(private readonly categoriaCommandService: CategoriaCommandService) { }

	@Post()
	@ApiOperation({ summary: 'Cria uma nova categoria' })
	@ApiCreatedResponse({ description: 'Categoria criada com sucesso', type: Categoria })
	@ApiBearerAuth('JWT-auth')
	create(@Body() createCategoriaDto: CreateCategoriaDto) {
		return this.categoriaCommandService.create(createCategoriaDto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Atualiza uma categoria existente' })
	@ApiOkResponse({ description: 'Categoria atualizada com sucesso', type: Categoria })
	@ApiBearerAuth('JWT-auth')
	update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
		return this.categoriaCommandService.update(id, updateCategoriaDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Exclui uma categoria existente' })
	@ApiOkResponse({ description: 'Categoria excluída com sucesso' })
	@ApiBearerAuth('JWT-auth')
	delete(@Param('id') id: number) {
		return this.categoriaCommandService.delete(id);
	}
}
