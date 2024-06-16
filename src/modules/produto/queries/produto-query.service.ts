import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entity';

@Injectable()
export class ProdutoQueryService {
	constructor(
		@InjectRepository(Produto)
		private readonly produtoRepository: Repository<Produto>,
	) { }

	async findAll(): Promise<Produto[]> {
		return this.produtoRepository.find({ relations: { categoria: true } });
	}

	async findOne(produto_id: number): Promise<Produto> {
		return this.produtoRepository.findOne({ where: { produto_id }, relations: { categoria: true } });
	}
}
