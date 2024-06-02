import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entity';
import { CreatePedidoDto, UpdatePedidoDto } from '../dto';

@Injectable()
export class PedidoCommandService {
	constructor(
		@InjectRepository(Pedido)
		private readonly pedidoRepository: Repository<Pedido>,
	) { }

	async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
		const pedido = this.pedidoRepository.create(createPedidoDto);
		return this.pedidoRepository.save(pedido);
	}

	async update(pedido_id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
		const pedido = await this.pedidoRepository.findOne({ where: { pedido_id } });
		if (!pedido) {
			throw new NotFoundException(`Pedido com ID ${pedido_id} não encontrado`);
		}
		Object.assign(pedido, updatePedidoDto);
		return this.pedidoRepository.save(pedido);
	}

	async delete(pedido_id: number): Promise<void> {
		const pedido = await this.pedidoRepository.findOne({ where: { pedido_id } });
		if (!pedido) {
			throw new NotFoundException(`Pedido com ID ${pedido_id} não encontrado`);
		}
		await this.pedidoRepository.remove(pedido);
	}
}
