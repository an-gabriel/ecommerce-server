import { IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProdutoPedidoDto {
	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiPropertyOptional({ example: 10, description: 'Quantidade do produto no pedido' })
	qtd_produto_pedido: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiPropertyOptional({ example: 100, description: 'Preço do produto no pedido' })
	preco_produto_pedido: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiPropertyOptional({ example: 1, description: 'ID do produto' })
	produto_id?: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiPropertyOptional({ example: 1, description: 'ID do pedido' })
	pedido_id?: number;
}
