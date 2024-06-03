import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente } from '../entity';

@Injectable()
export class ClienteQueryService {
	constructor(
		@InjectRepository(Cliente)
		private readonly clienteRepository: Repository<Cliente>,
	) { }

	async findAll(): Promise<Cliente[]> {
		return await this.clienteRepository.find({ relations: { endereco: true } });
	}

	async findOne(cliente_id: number): Promise<Cliente> {
		return this.clienteRepository.findOne({ where: { cliente_id }, relations: { endereco: true } });
	}
}
