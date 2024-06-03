import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Produto } from '../../produto/entity';

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

	@OneToMany(() => Produto, produto => produto.categoria)
	@ApiProperty({ type: () => [Produto], description: 'Produtos pertencentes a esta categoria' })
	produtos: Produto[];
}
