import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entity';
import { CreatePedidoDto, UpdatePedidoDto } from '../dto';
import { Cliente } from '../../cliente/entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class PedidoCommandService {
	constructor(
		@InjectRepository(Pedido)
		private readonly pedidoRepository: Repository<Pedido>,
		@InjectRepository(Cliente)
		private readonly clienteRepository: Repository<Cliente>,
	) { }

	async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
		await validateOrReject(createPedidoDto).catch(errors => {
			throw new BadRequestException(errors);
		});

		const cliente = await this.clienteRepository.findOne({ where: { cliente_id: createPedidoDto.cliente_id } });

		if (!cliente) {
			throw new NotFoundException(`Cliente com ID ${createPedidoDto.cliente_id} não encontrado`);
		}

		const pedido = this.pedidoRepository.create(createPedidoDto);
		return this.pedidoRepository.save(pedido);
	}

	async update(pedido_id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
		await validateOrReject(updatePedidoDto).catch(errors => {
			throw new BadRequestException(errors);
		});

		const pedido = await this.pedidoRepository.findOne({ where: { pedido_id } });
		if (!pedido) {
			throw new NotFoundException(`Pedido com ID ${pedido_id} não encontrado`);
		}

		if (updatePedidoDto.numero_pedido) {
			const pedidoExistente = await this.pedidoRepository.findOne({ where: { numero_pedido: updatePedidoDto.numero_pedido } });
			if (pedidoExistente && pedidoExistente.pedido_id !== pedido_id) {
				throw new BadRequestException(`Pedido com número ${updatePedidoDto.numero_pedido} já existe`);
			}
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
