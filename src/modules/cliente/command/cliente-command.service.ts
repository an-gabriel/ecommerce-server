import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entity';
import { CreateClienteDto, UpdateClienteDto } from '../dto';
import { validateOrReject } from 'class-validator';
import { Endereco } from '../../endereco/entity';

@Injectable()
export class ClienteCommandService {
	constructor(
		@InjectRepository(Cliente)
		private readonly clienteRepository: Repository<Cliente>,
		@InjectRepository(Endereco) private readonly enderecoRepository: Repository<Endereco>,
	) { }

	async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
		await validateOrReject(createClienteDto).catch(errors => {
			throw new BadRequestException(errors);
		});

		const clienteComMesmoEmail = await this.clienteRepository.findOne({ where: { email: createClienteDto.email } });
		if (clienteComMesmoEmail) {
			throw new BadRequestException('Este email já está cadastrado.');
		}

		const clienteComMesmoCpf = await this.clienteRepository.findOne({ where: { cpf: createClienteDto.cpf } });
		if (clienteComMesmoCpf) {
			throw new BadRequestException('Este CPF já está cadastrado.');
		}

		const verificaEndereco = await this.enderecoRepository.findOne({ where: { endereco_id: createClienteDto.endereco_id } });

		if (!verificaEndereco) {
			throw new BadRequestException('Este endereço não existe');
		}

		const cliente = this.clienteRepository.create({
			...createClienteDto,
			data_nascimento: createClienteDto.data_nascimento ? new Date(createClienteDto.data_nascimento) : undefined,
		});
		return this.clienteRepository.save(cliente);
	}

	async update(cliente_id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
		const clienteExistente = await this.clienteRepository.findOne({ where: { cliente_id } });
		if (!clienteExistente) {
			throw new NotFoundException(`Cliente com ID ${cliente_id} não encontrado`);
		}


		await validateOrReject(updateClienteDto).catch(errors => {
			throw new BadRequestException(errors);
		});

		if (updateClienteDto.email && updateClienteDto.email !== clienteExistente.email) {
			const clienteComMesmoEmail = await this.clienteRepository.findOne({ where: { email: updateClienteDto.email } });
			if (clienteComMesmoEmail) {
				throw new BadRequestException('Este email já está cadastrado para outro cliente.');
			}
		}


		if (updateClienteDto.cpf && updateClienteDto.cpf !== clienteExistente.cpf) {
			const clienteComMesmoCpf = await this.clienteRepository.findOne({ where: { cpf: updateClienteDto.cpf } });
			if (clienteComMesmoCpf) {
				throw new BadRequestException('Este CPF já está cadastrado para outro cliente.');
			}
		}

		await this.clienteRepository.update(cliente_id, updateClienteDto);
		return this.clienteRepository.findOne({ where: { cliente_id } });
	}

	async delete(cliente_id: number): Promise<void> {
		const clienteExistente = await this.clienteRepository.findOne({ where: { cliente_id } });
		if (!clienteExistente) {
			throw new NotFoundException(`Cliente com ID ${cliente_id} não encontrado`);
		}

		await this.clienteRepository.delete(cliente_id);
	}
}

