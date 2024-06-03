import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePedidoDto {
	@IsInt()
	@IsOptional()
	@ApiProperty({ example: 12345, description: 'Número do pedido', required: false })
	numero_pedido?: number;

	@IsNumber()
	@IsOptional()
	@Min(0, { message: 'O valor total do pedido não pode ser negativo' })
	@ApiProperty({ example: 100.50, description: 'Valor total do pedido', required: false })
	valor_total_pedido?: number;

	@IsOptional()
	@ApiProperty({ example: new Date(), description: 'Data do pedido', required: false })
	data_pedido?: Date;

	@IsOptional()
	@ApiProperty({ example: true, description: 'Status do pedido', required: false })
	status?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, description: 'ID do cliente associado ao pedido', required: false })
	cliente_id?: number;
}
