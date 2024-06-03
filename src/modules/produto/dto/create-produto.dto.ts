import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	@ApiProperty({ example: 'Notebook', description: 'Nome do produto', maxLength: 50 })
	nome_produto: string;

	@IsString()
	@IsOptional()
	@MaxLength(200)
	@ApiProperty({ example: 'Notebook com 16GB de RAM e 512GB SSD', description: 'Descrição do produto', maxLength: 200, required: false })
	descricao_produto?: string;

	@IsNumber()
	@IsNotEmpty()
	@Min(0, { message: 'O preço do produto não pode ser negativo' })
	@ApiProperty({ example: 2999.99, description: 'Preço do produto' })
	preco_produto: number;

	@IsInt()
	@IsNotEmpty()
	@Min(0, { message: 'A quantidade não pode ser negativo' })
	@ApiProperty({ example: 10, description: 'Quantidade em estoque' })
	qtd_estoque: number;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty({ example: 1, description: 'ID da categoria associada ao produto' })
	categoria_id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'https://example.com/imagem.jpg', description: 'URL da imagem do produto', required: false })
	imagem?: string;
}
