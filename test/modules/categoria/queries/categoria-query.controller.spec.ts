import { Test, TestingModule } from '@nestjs/testing';

import { CategoriaQueryService } from '../../../../src/modules/categoria/queries/categoria-query.service';
import { CategoriaQueryController } from '../../../../src/modules/categoria/queries/categoria-query.controller';
import { Categoria } from '../../../../src/modules/categoria/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoriaQueryController', () => {
	let controller: CategoriaQueryController;
	let service: CategoriaQueryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoriaQueryController],
			providers: [
				CategoriaQueryService,
				{
					provide: getRepositoryToken(Categoria),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<CategoriaQueryController>(CategoriaQueryController);
		service = module.get<CategoriaQueryService>(CategoriaQueryService);
	});
	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return all categorias', async () => {
			const categorias: Categoria[] = [{
				categoria_id: 1, nome_categoria: 'Categoria 1', descricao_categoria: 'Categoria 1 descrição',
				produtos: []
			}];
			jest.spyOn(service, 'findAll').mockResolvedValue(categorias);

			const result = await controller.findAll();
			expect(result).toEqual(categorias);
		});
	});

	describe('findOne', () => {
		it('should return a single categoria by ID', async () => {
			const categoriaId = 1;
			const categoria: Categoria = {
				categoria_id: 1, nome_categoria: 'Categoria 1', descricao_categoria: 'Categoria 1 descrição',
				produtos: []
			}
			jest.spyOn(service, 'findOne').mockResolvedValue(categoria);

			const result = await controller.findOne(categoriaId);
			expect(result).toEqual(categoria);
		});
	});
});
