import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cliente')
export class Cliente {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'Identificador único do cliente' })
	cliente_id: number;

	@Column({ length: 50, nullable: true })
	@ApiProperty({ example: 'cliente@exemplo.com', description: 'Email do cliente', maxLength: 50, nullable: true })
	email: string;

	@Column({ length: 15, nullable: true })
	@ApiProperty({ example: 'cliente123', description: 'Nome de usuário do cliente', maxLength: 15, nullable: true })
	username: string;

	@Column({ length: 20, nullable: true })
	@ApiProperty({ example: 'senha123', description: 'Senha do cliente', maxLength: 20, nullable: true })
	senha: string;

	@Column({ length: 200, nullable: true })
	@ApiProperty({ example: 'Cliente Atualizado', description: 'Nome do cliente', maxLength: 200, nullable: true })
	nome: string;

	@Column({ length: 11, unique: true })
	@ApiProperty({ example: '12345678901', description: 'CPF do cliente', maxLength: 11 })
	cpf: string;

	@Column({ length: 11, nullable: true })
	@ApiProperty({ example: '11999999999', description: 'Telefone do cliente', maxLength: 11, nullable: true })
	telefone: string;

	@Column({ type: 'date', nullable: true })
	@ApiProperty({ example: '1990-01-01', description: 'Data de nascimento do cliente', nullable: true })
	data_nascimento: string;

	@Column()
	@ApiProperty({ example: 1, description: 'Identificador do endereço do cliente' })
	endereco_id: number;
}
