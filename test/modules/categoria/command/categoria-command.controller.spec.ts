import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaCommandController } from '../../../../src/modules/categoria/command/categoria-command.controller';
import { CategoriaCommandService } from '../../../../src/modules/categoria/command/categoria-command.service';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../../../../src/modules/categoria/dto';
import { Categoria } from '../../../../src/modules/categoria/entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CategoriaCommandController', () => {
	let controller: CategoriaCommandController;
	let service: CategoriaCommandService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoriaCommandController],
			providers: [CategoriaCommandService, {
				provide: getRepositoryToken(Categoria),
				useClass: Repository,
			},],
		}).compile();

		controller = module.get<CategoriaCommandController>(CategoriaCommandController);
		service = module.get<CategoriaCommandService>(CategoriaCommandService);
	});

	describe('create', () => {
		it('should create a new categoria', async () => {
			const createdCategoria: Categoria = {
				categoria_id: 1, nome_categoria: 'Categoria 1', descricao_categoria: 'Categoria descrição 1',
				produtos: []
			};
			const categoriaDto: CreateCategoriaDto = { nome_categoria: createdCategoria.nome_categoria };

			jest.spyOn(service, 'create').mockResolvedValue(createdCategoria);

			const result = await controller.create(categoriaDto);
			expect(result).toEqual(createdCategoria);
		});
	});

	describe('update', () => {
		it('should update an existing categoria', async () => {
			const id = 1;

			const updatedCategoria: Categoria = {
				categoria_id: 1, nome_categoria: 'Categoria Atualizada', descricao_categoria: 'Categoria Atualizada',
				produtos: []
			};
			const categoriaDto: UpdateCategoriaDto = { nome_categoria: updatedCategoria.nome_categoria };

			jest.spyOn(service, 'update').mockResolvedValue(updatedCategoria);

			const result = await controller.update(id, categoriaDto);
			expect(result).toEqual(updatedCategoria);
		});
	});

	describe('delete', () => {
		it('should delete an existing categoria', async () => {
			const id = 1;

			jest.spyOn(service, 'delete').mockResolvedValue(undefined);

			const result = await controller.delete(id);
			expect(result).toBeUndefined();
		});
	});
});
