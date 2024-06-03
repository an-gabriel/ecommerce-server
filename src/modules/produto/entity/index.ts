import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../../categoria/entity';
import { ProdutoPedido } from '../../produto-pedido/entity';

@Entity()
export class Produto {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'Identificador único do produto' })
	produto_id: number;

	@Column({ length: 50, nullable: true })
	@ApiProperty({ example: 'Notebook', description: 'Nome do produto', maxLength: 50, nullable: true })
	nome_produto: string;

	@Column({ length: 200, nullable: true })
	@ApiProperty({ example: 'Notebook com 16GB de RAM e 512GB SSD', description: 'Descrição do produto', maxLength: 200, nullable: true })
	descricao_produto: string;

	@Column({ type: 'numeric', nullable: true })
	@ApiProperty({ example: 2999.99, description: 'Preço do produto', type: 'number', nullable: true })
	preco_produto: number;

	@Column({ type: 'int', nullable: true })
	@ApiProperty({ example: 10, description: 'Quantidade em estoque', nullable: true })
	qtd_estoque: number;

	@Column({ type: 'date', default: () => 'CURRENT_DATE' })
	@ApiProperty({ example: '2024-06-01', description: 'Data de cadastro do produto', type: 'string', format: 'date', nullable: true })
	data_cadastro_produto: Date;


	@Column({ type: 'varchar', nullable: true })
	@ApiProperty({ example: 'https://example.com/imagem.jpg', description: 'URL da imagem do produto', nullable: true })
	imagem: string;

	@ManyToOne(() => Categoria, categoria => categoria.produtos)
	@JoinColumn({ name: 'categoria_id' })
	@ApiProperty({ type: () => Categoria, description: 'Categoria do produto' })
	categoria: Categoria;

	@OneToMany(() => ProdutoPedido, produtoPedido => produtoPedido.produto)
	@ApiProperty({ type: () => Categoria, description: 'Pedidos do produto' })
	produtosPedidos: ProdutoPedido[];
}
