import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from '../../produto/entity';
import { Pedido } from '../../pedido/entity';

@Entity()
export class ProdutoPedido {
	@PrimaryGeneratedColumn()
	produto_pedido_id: number;

	@Column()
	qtd_produto_pedido: number;

	@Column({ type: 'numeric', nullable: true })
	preco_produto_pedido: number;

	@ManyToOne(() => Produto, produto => produto.produtosPedidos)
	@JoinColumn({ name: 'produto_id' })
	produto: Produto;

	@ManyToOne(() => Pedido, pedido => pedido.produtosPedidos)
	@JoinColumn({ name: 'pedido_id' })
	pedido: Pedido;
}
