import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoPedido } from '../entity';

@Injectable()
export class ProdutoPedidoQueryService {
	constructor(
		@InjectRepository(ProdutoPedido)
		private readonly produtoPedidoRepository: Repository<ProdutoPedido>,
	) { }

	async findOne(produto_pedido_id: number): Promise<ProdutoPedido> {
		return this.produtoPedidoRepository.findOne({ where: { produto_pedido_id } });
	}

	async findAll(): Promise<ProdutoPedido[]> {
		return this.produtoPedidoRepository.find();
	}
}
