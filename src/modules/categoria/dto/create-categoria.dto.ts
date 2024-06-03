import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
	@IsString()
	@ApiProperty({ example: 'Eletrônicos', description: 'Nome da categoria' })
	nome_categoria: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'Dispositivos eletrônicos e gadgets', description: 'Descrição da categoria', required: false })
	descricao_categoria?: string;
}
