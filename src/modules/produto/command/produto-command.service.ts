import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entity';
import { CreateProdutoDto, UpdateProdutoDto } from '../dto';

@Injectable()
export class ProdutoCommandService {
	constructor(
		@InjectRepository(Produto)
		private readonly produtoRepository: Repository<Produto>,
	) { }

	async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
		const produto = this.produtoRepository.create(createProdutoDto);
		return this.produtoRepository.save(produto);
	}

	async update(produto_id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
		await this.produtoRepository.update(produto_id, updateProdutoDto);
		return this.produtoRepository.findOne({ where: { produto_id } });
	}

	async delete(produto_id: number): Promise<void> {
		await this.produtoRepository.delete(produto_id);
	}
}
