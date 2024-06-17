import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from '../entity';
import { CreateEnderecoDto, UpdateEnderecoDto } from '../dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class EnderecoCommandService {
	constructor(
		@InjectRepository(Endereco)
		private readonly enderecoRepository: Repository<Endereco>,
	) { }

	async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
		if (await this.enderecoJaCadastrado(createEnderecoDto.cep, createEnderecoDto.numero)) {
			throw new BadRequestException('Este CEP já está cadastrado.');
		}

		await this.validarDto(createEnderecoDto);

		const endereco = this.enderecoRepository.create(createEnderecoDto);
		return this.enderecoRepository.save(endereco);
	}

	async update(endereco_id: number, updateEnderecoDto: UpdateEnderecoDto): Promise<Endereco> {
		const enderecoExistente = await this.enderecoRepository.findOne({ where: { endereco_id } });
		if (!enderecoExistente) {
			throw new NotFoundException(`Endereço com ID ${endereco_id} não encontrado`);
		}

		if (updateEnderecoDto.cep) {
			throw new BadRequestException('Não é permitido a atualização de CEP');
		}

		await this.validarDto(updateEnderecoDto);

		await this.enderecoRepository.update(endereco_id, updateEnderecoDto);
		return this.enderecoRepository.findOne({ where: { endereco_id } });
	}

	async delete(endereco_id: number): Promise<void> {
		const enderecoExistente = await this.enderecoRepository.findOne({ where: { endereco_id } });
		if (!enderecoExistente) {
			throw new NotFoundException(`Endereço com ID ${endereco_id} não encontrado`);
		}

		await this.enderecoRepository.delete(endereco_id);
	}

	private async enderecoJaCadastrado(cep: string, numero: string): Promise<boolean> {
		const enderecoComMesmoCep = await this.enderecoRepository.findOne({ where: { cep } });
		if (enderecoComMesmoCep) {
			const enderecoComMesmoNumeroECep = await this.enderecoRepository.findOne({ where: { cep, numero } });
			if (enderecoComMesmoNumeroECep) {
				return true;
			}
		}
		return false;
	}

	private async validarDto(dto: any): Promise<void> {
		await validateOrReject(dto).catch(errors => {
			throw new BadRequestException(errors);
		});
	}
}
