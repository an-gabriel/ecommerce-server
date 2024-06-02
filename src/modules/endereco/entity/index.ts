import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from '../../cliente/entity';

@Entity('endereco')
export class Endereco {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'Identificador único do endereço' })
	endereco_id: number;

	@Column({ length: 9, nullable: true })
	@ApiProperty({ example: '12345-678', description: 'CEP do endereço', maxLength: 9, nullable: true })
	cep: string;

	@Column({ length: 100, nullable: true })
	@ApiProperty({ example: 'Rua Exemplo', description: 'Nome da rua', maxLength: 100, nullable: true })
	rua: string;

	@Column({ length: 30, nullable: true })
	@ApiProperty({ example: 'Bairro Exemplo', description: 'Nome do bairro', maxLength: 30, nullable: true })
	bairro: string;

	@Column({ length: 30, nullable: true })
	@ApiProperty({ example: 'Cidade Exemplo', description: 'Nome da cidade', maxLength: 30, nullable: true })
	cidade: string;

	@Column({ length: 10, nullable: true })
	@ApiProperty({ example: '123', description: 'Número do endereço', maxLength: 10, nullable: true })
	numero: string;

	@Column({ length: 100, nullable: true })
	@ApiProperty({ example: 'Complemento Exemplo', description: 'Complemento do endereço', maxLength: 100, nullable: true })
	complemento: string;

	@Column({ length: 2, nullable: true })
	@ApiProperty({ example: 'SP', description: 'UF do endereço', maxLength: 2, nullable: true })
	uf: string;

	@OneToMany(() => Cliente, cliente => cliente.endereco)
	@ApiProperty({ type: () => Cliente, isArray: true, description: 'Lista de clientes do endereço' })
	clientes: Cliente[];
}

