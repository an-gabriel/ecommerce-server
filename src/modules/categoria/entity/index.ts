import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Categoria {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'ID da categoria' })
	categoria_id: number;

	@Column({ length: 20, nullable: true })
	@ApiProperty({ example: 'Eletrônicos', description: 'Nome da categoria' })
	nome_categoria: string;

	@Column({ length: 200, nullable: true })
	@ApiProperty({ example: 'Dispositivos eletrônicos e gadgets', description: 'Descrição da categoria' })
	descricao_categoria: string;
}
