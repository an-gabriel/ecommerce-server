import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entity';
import { CreateProdutoDto, UpdateProdutoDto } from '../dto';
import { Categoria } from '../../categoria/entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class ProdutoCommandService {
	constructor(
		@InjectRepository(Produto)
		private readonly produtoRepository: Repository<Produto>,
		@InjectRepository(Categoria)
		private readonly categoriaRepository: Repository<Categoria>,
	) { }

	async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
		await validateOrReject(createProdutoDto).catch(errors => {
			throw new BadRequestException(errors);
		});

		const categoria = await this.categoriaRepository.findOne({ where: { categoria_id: createProdutoDto.categoria_id } });
		if (!categoria) {
			throw new NotFoundException(`Categoria com ID ${createProdutoDto.categoria_id} não encontrada`);
		}

		const produto = this.produtoRepository.create(createProdutoDto);
		produto.categoria = categoria;
		return this.produtoRepository.save(produto);
	}

	async update(produto_id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
		await validateOrReject(updateProdutoDto).catch(errors => {
			throw new BadRequestException(errors);
		});

		const produto = await this.produtoRepository.findOne({ where: { produto_id } });
		if (!produto) {
			throw new NotFoundException(`Produto com ID ${produto_id} não encontrado`);
		}

		if (updateProdutoDto.categoria_id) {
			const categoria = await this.categoriaRepository.findOne({ where: { categoria_id: updateProdutoDto.categoria_id } });
			if (!categoria) {
				throw new NotFoundException(`Categoria com ID ${updateProdutoDto.categoria_id} não encontrada`);
			}
			produto.categoria = categoria;

			Object.assign(produto, updateProdutoDto);
			return this.produtoRepository.save(produto);
		}
	}

	async delete(produto_id: number): Promise<void> {
		const produto = await this.produtoRepository.findOne({ where: { produto_id } });
		if (!produto) {
			throw new NotFoundException(`Produto com ID ${produto_id} não encontrado`);
		}
		await this.produtoRepository.remove(produto);
	}
}
