import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entity';

@Injectable()
export class CategoriaQueryService {
	constructor(
		@InjectRepository(Categoria)
		private readonly categoriaRepository: Repository<Categoria>,
	) { }

	async findAll(): Promise<Categoria[]> {
		return this.categoriaRepository.find();
	}

	async findOne(categoria_id: number): Promise<Categoria> {
		return this.categoriaRepository.findOne({ where: { categoria_id } });
	}
}