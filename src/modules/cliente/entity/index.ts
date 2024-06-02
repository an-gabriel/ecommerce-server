import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cliente')
export class Cliente {
	@PrimaryGeneratedColumn()
	cliente_id: number;

	@Column({ length: 50, nullable: true })
	email: string;

	@Column({ length: 15, nullable: true })
	username: string;

	@Column({ length: 20, nullable: true })
	senha: string;

	@Column({ length: 200, nullable: true })
	nome: string;

	@Column({ length: 11, unique: true })
	cpf: string;

	@Column({ length: 11, nullable: true })
	telefone: string;

	@Column({ type: 'date', nullable: true })
	data_nascimento: string;

	@Column()
	endereco_id: number;
}
