// create-produto-pedido.dto.ts
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoPedidoDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ example: 10, description: 'Quantidade do produto no pedido' })
	qtd_produto_pedido: number;

	@IsNotEmpty()
	@ApiProperty({ example: 299.99, description: 'Preço do produto no pedido' })
	preco_produto_pedido: number;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ example: 1, description: 'ID do produto' })
	produto_id: number;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ example: 1, description: 'ID do pedido' })
	pedido_id: number;
}
