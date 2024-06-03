import { IsInt, IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProdutoDto {
	@IsString()
	@IsOptional()
	@MaxLength(50)
	@ApiProperty({ example: 'Notebook', description: 'Nome do produto', maxLength: 50, required: false })
	nome_produto?: string;

	@IsString()
	@IsOptional()
	@MaxLength(200)
	@ApiProperty({ example: 'Notebook com 16GB de RAM e 512GB SSD', description: 'Descrição do produto', maxLength: 200, required: false })
	descricao_produto?: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty({ example: 2999.99, description: 'Preço do produto', required: false })
	preco_produto?: number;

	@IsInt()
	@IsOptional()
	@ApiProperty({ example: 10, description: 'Quantidade em estoque', required: false })
	qtd_estoque?: number;

	@IsInt()
	@IsOptional()
	@ApiProperty({ example: 1, description: 'ID da categoria associada ao produto', required: false })
	categoria_id?: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'https://example.com/imagem.jpg', description: 'URL da imagem do produto', required: false })
	imagem?: string;
}
