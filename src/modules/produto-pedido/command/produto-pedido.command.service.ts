import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoPedido } from '../entity';
import { CreateProdutoPedidoDto, UpdateProdutoPedidoDto } from '../dto';

@Injectable()
export class ProdutoPedidoCommandService {
	constructor(
		@InjectRepository(ProdutoPedido)
		private readonly produtoPedidoRepository: Repository<ProdutoPedido>,
	) { }

	async create(createProdutoPedidoDto: CreateProdutoPedidoDto): Promise<ProdutoPedido> {
		const produtoPedido = this.produtoPedidoRepository.create(createProdutoPedidoDto);
		return this.produtoPedidoRepository.save(produtoPedido);
	}

	async update(produto_pedido_id: number, updateProdutoPedidoDto: UpdateProdutoPedidoDto): Promise<ProdutoPedido> {
		const produtoPedido = await this.produtoPedidoRepository.findOne({ where: { produto_pedido_id } });
		if (!produtoPedido) {
			throw new NotFoundException(`ProdutoPedido with ID ${produto_pedido_id} not found`);
		}
		this.produtoPedidoRepository.merge(produtoPedido, updateProdutoPedidoDto);
		return this.produtoPedidoRepository.save(produtoPedido);
	}

	async delete(produto_pedido_id: number): Promise<void> {
		const produtoPedido = await this.produtoPedidoRepository.findOne({ where: { produto_pedido_id } });
		if (!produtoPedido) {
			throw new NotFoundException(`ProdutoPedido with ID ${produto_pedido_id} not found`);
		}
		await this.produtoPedidoRepository.remove(produtoPedido);
	}
}
