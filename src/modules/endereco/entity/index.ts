import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Endereco {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'Identificador único do endereço' })
	endereco_id: number;

	@Column({ length: 9, nullable: true })
	@ApiProperty({ example: '12345678', description: 'CEP do endereço', maxLength: 9, nullable: true })
	cep: string;

	@Column({ length: 100, nullable: true })
	@ApiProperty({ example: 'Rua Exemplo', description: 'Nome da rua do endereço', maxLength: 100, nullable: true })
	rua: string;

	@Column({ length: 30, nullable: true })
	@ApiProperty({ example: 'Bairro Exemplo', description: 'Bairro do endereço', maxLength: 30, nullable: true })
	bairro: string;

	@Column({ length: 30, nullable: true })
	@ApiProperty({ example: 'Cidade Exemplo', description: 'Cidade do endereço', maxLength: 30, nullable: true })
	cidade: string;

	@Column({ length: 10, nullable: true })
	@ApiProperty({ example: '123', description: 'Número do endereço', maxLength: 10, nullable: true })
	numero: string;

	@Column({ length: 100, nullable: true })
	@ApiProperty({ example: 'Apto 202', description: 'Complemento do endereço', maxLength: 100, nullable: true })
	complemento: string;

	@Column({ length: 2, nullable: true })
	@ApiProperty({ example: 'SP', description: 'Unidade Federativa do endereço', maxLength: 2, nullable: true })
	uf: string;
}
