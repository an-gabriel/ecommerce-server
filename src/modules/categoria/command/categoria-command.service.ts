import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entity';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../dto';
import { QueryFailedError } from 'typeorm';
import { ForeignKeyConstraintViolationException } from '../../../utils/HttpExceptionCustom'; 

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
		const updatedCategoria = await this.categoriaRepository.findOne({ where: { categoria_id } });
		if (!updatedCategoria) {
			throw new NotFoundException(`Categoria com ID ${categoria_id} não encontrada`);
		}
		return updatedCategoria;
	}

	async delete(id: number): Promise<void> {
		const categoria = await this.categoriaRepository.findOne({ where: { categoria_id: id } });
		if (!categoria) {
			throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
		}
		try {
			await this.categoriaRepository.delete(id);
		} catch (error) {
			if (error instanceof QueryFailedError && error.message.includes('violates foreign key constraint')) {
				throw new ForeignKeyConstraintViolationException('Não é possível excluir a categoria porque ela está sendo usada por um ou mais produtos.');
			}
			throw error;
		}
	}
}
