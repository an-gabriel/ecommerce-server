import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriaQueryService } from '../../../../src/modules/categoria/queries/categoria-query.service';
import { Categoria } from '../../../../src/modules/categoria/entity';
import { Repository } from 'typeorm';

describe('CategoriaQueryService', () => {
	let service: CategoriaQueryService;
	let repositoryMock: Repository<Categoria>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriaQueryService,
				{
					provide: getRepositoryToken(Categoria),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<CategoriaQueryService>(CategoriaQueryService);
		repositoryMock = module.get<Repository<Categoria>>(getRepositoryToken(Categoria));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		it('should return all categorias', async () => {
			const categorias: Categoria[] = [{ categoria_id: 1, nome_categoria: 'Categoria 1', descricao_categoria: 'Categoria 1 descrição' }];
			jest.spyOn(repositoryMock, 'find').mockResolvedValue(categorias); // Usar jest.spyOn para mockar o método find

			const result = await service.findAll();
			expect(result).toEqual(categorias);
		});
	});

	describe('findOne', () => {
		it('should return a single categoria by ID', async () => {
			const categoriaId = 1;
			const categoria: Categoria = { categoria_id: 1, nome_categoria: 'Categoria 1', descricao_categoria: 'Categoria 1 descrição' };
			jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(categoria); // Usar jest.spyOn para mockar o método findOne

			const result = await service.findOne(categoriaId);
			expect(result).toEqual(categoria);
		});
	});
});
