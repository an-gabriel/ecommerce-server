import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from '../../cliente/entity';

@Entity()
export class Pedido {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'Identificador único do pedido' })
	pedido_id: number;

	@Column({ nullable: true })
	@ApiProperty({ example: 12345, description: 'Número do pedido', nullable: true })
	numero_pedido: number;

	@Column({ nullable: true, type: 'numeric' })
	@ApiProperty({ example: 199.99, description: 'Valor total do pedido', type: 'number', nullable: true })
	valor_total_pedido: number;

	@Column({ default: () => 'CURRENT_DATE', type: 'date' })
	@ApiProperty({ example: '2024-06-01', description: 'Data do pedido', type: 'string', format: 'date', nullable: true })
	data_pedido: Date;

	@Column({ nullable: true })
	@ApiProperty({ example: true, description: 'Status do pedido', nullable: true })
	status: boolean;

	@ManyToOne(() => Cliente, cliente => cliente.pedidos)
	@JoinColumn({ name: 'cliente_id' })
	@ApiProperty({ type: () => Cliente, description: 'Cliente que fez o pedido' })
	cliente?: Cliente;
}
