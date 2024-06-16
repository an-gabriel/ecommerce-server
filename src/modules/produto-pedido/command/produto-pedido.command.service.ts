import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoPedido } from '../entity';
import { CreateProdutoPedidoDto, UpdateProdutoPedidoDto } from '../dto';
import { Produto } from '../../produto/entity';
import { Pedido } from '../../pedido/entity';

@Injectable()
export class ProdutoPedidoCommandService {
	constructor(
		@InjectRepository(ProdutoPedido)
		private readonly produtoPedidoRepository: Repository<ProdutoPedido>,
		@InjectRepository(Produto)
		private readonly produtoRepository: Repository<Produto>,
		@InjectRepository(Pedido)
		private readonly pedidoRepository: Repository<Pedido>,
	) { }
	async create(createProdutoPedidoDto: CreateProdutoPedidoDto): Promise<ProdutoPedido> {
		const { produto_id, pedido_id } = createProdutoPedidoDto;

		const produto = await this.produtoRepository.findOne({ where: { produto_id } });
		if (!produto) {
			throw new NotFoundException(`Produto com ID ${produto_id} não encontrado`);
		}

		const pedido = await this.pedidoRepository.findOne({ where: { pedido_id } });
		if (!pedido) {
			throw new NotFoundException(`Pedido com ID ${pedido_id} não encontrado`);
		}

		const pedidoProdutoRepetido = await this.produtoPedidoRepository.find({ where: { pedido_id, produto_id } })

		if (!!pedidoProdutoRepetido.length) {
			throw new NotFoundException(`Já existem pedidos com esse produto`);
		}

		const produtoPedido = new ProdutoPedido();
		produtoPedido.produto_id = produto_id;
		produtoPedido.pedido_id = pedido_id;
		produtoPedido.qtd_produto_pedido = createProdutoPedidoDto.qtd_produto_pedido;
		produtoPedido.preco_produto_pedido = createProdutoPedidoDto.preco_produto_pedido;

		return this.produtoPedidoRepository.save(produtoPedido);
	}

	async update(produto_pedido_id: number, updateProdutoPedidoDto: UpdateProdutoPedidoDto): Promise<ProdutoPedido> {
		const produtoPedido = await this.produtoPedidoRepository.findOne({ where: { produto_pedido_id } });
		if (!produtoPedido) {
			throw new NotFoundException(`ProdutoPedido com ID ${produto_pedido_id} não encontrado`);
		}

		if (updateProdutoPedidoDto.produto_id) {
			const produto = await this.produtoRepository.findOne({ where: { produto_id: updateProdutoPedidoDto.produto_id } });
			if (!produto) {
				throw new NotFoundException(`Produto com ID ${updateProdutoPedidoDto.produto_id} não encontrado`);
			}
		}

		if (updateProdutoPedidoDto.pedido_id) {
			const pedido = await this.pedidoRepository.findOne({ where: { pedido_id: updateProdutoPedidoDto.pedido_id } });
			if (!pedido) {
				throw new NotFoundException(`Pedido com ID ${updateProdutoPedidoDto.pedido_id} não encontrado`);
			}
		}

		this.produtoPedidoRepository.merge(produtoPedido, updateProdutoPedidoDto);
		return this.produtoPedidoRepository.save(produtoPedido);
	}

	async delete(produto_pedido_id: number): Promise<void> {
		const produtoPedido = await this.produtoPedidoRepository.findOne({ where: { produto_pedido_id } });
		if (!produtoPedido) {
			throw new NotFoundException(`ProdutoPedido com ID ${produto_pedido_id} não encontrado`);
		}
		await this.produtoPedidoRepository.remove(produtoPedido);
	}
}
