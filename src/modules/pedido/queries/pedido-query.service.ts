import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entity';

@Injectable()
export class PedidoQueryService {
	constructor(
		@InjectRepository(Pedido)
		private readonly pedidoRepository: Repository<Pedido>,
	) { }

	async findAll(): Promise<Pedido[]> {
		return this.pedidoRepository.find({ relations: { cliente: { endereco: true } } });
	}

	async findOne(pedido_id: number): Promise<Pedido> {
		const pedido = await this.pedidoRepository.findOne({ where: { pedido_id }, relations: { cliente: true } });
		if (!pedido) {
			throw new NotFoundException(`Pedido com ID ${pedido_id} não encontrado`);
		}
		return pedido;
	}
}
