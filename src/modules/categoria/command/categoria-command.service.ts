import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entity';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../dto';

@Injectable()
export class CategoriaCommandService {
	constructor(
		@InjectRepository(Categoria)
		private readonly categoriaRepository: Repository<Categoria>,
	) { }

	async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
		const categoria = this.categoriaRepository.create(createCategoriaDto);
		return this.categoriaRepository.save(categoria);
	}

	async update(categoria_id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
		await this.categoriaRepository.update(categoria_id, updateCategoriaDto);
		return this.categoriaRepository.findOne({ where: { categoria_id } });
	}


	async delete(id: number): Promise<void> {
		await this.categoriaRepository.delete(id);
	}
}
