import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Endereco {
	@PrimaryGeneratedColumn()
	endereco_id: number;

	@Column({ length: 9, nullable: true })
	cep: string;

	@Column({ length: 100, nullable: true })
	rua: string;

	@Column({ length: 30, nullable: true })
	bairro: string;

	@Column({ length: 30, nullable: true })
	cidade: string;

	@Column({ length: 10, nullable: true })
	numero: string;

	@Column({ length: 100, nullable: true })
	complemento: string;

	@Column({ length: 2, nullable: true })
	uf: string;
}
