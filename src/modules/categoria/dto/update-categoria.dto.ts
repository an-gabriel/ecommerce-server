import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'Eletrônicos atualizados', description: 'Nome da categoria', required: false })
	nome_categoria?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'Descrição atualizada da categoria', description: 'Descrição da categoria', required: false })
	descricao_categoria?: string;
}
