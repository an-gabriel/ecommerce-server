import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriaCommandService } from '../../../../src/modules/categoria/command/categoria-command.service';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../../../../src/modules/categoria/dto';
import { Repository } from 'typeorm';
import { DatabaseService } from '../../../database/database.service';
import { Categoria } from '../../../../src/modules/categoria/entity';

describe('CategoriaCommandService', () => {
	let service: CategoriaCommandService;
	let dbService: DatabaseService;
	let categoriaRepositoryMock: Partial<Record<keyof Repository<Categoria>, jest.Mock>>;

	beforeEach(async () => {
		categoriaRepositoryMock = {
			create: jest.fn(),
			save: jest.fn(),
			findOne: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriaCommandService,
				DatabaseService,
				{
					provide: getRepositoryToken(Categoria),
					useValue: categoriaRepositoryMock,
				},
			],
		}).compile();

		service = module.get<CategoriaCommandService>(CategoriaCommandService);
		dbService = module.get<DatabaseService>(DatabaseService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a categoria', async () => {
		const createCategoriaDto: CreateCategoriaDto = {
			nome_categoria: 'Eletrônicos',
			descricao_categoria: 'Dispositivos eletrônicos',
		};

		const categoria: Categoria = {
			categoria_id: 1,
			nome_categoria: createCategoriaDto.nome_categoria,
			descricao_categoria: createCategoriaDto.descricao_categoria || '',
			produtos: []
		};

		categoriaRepositoryMock.create.mockReturnValue(categoria);
		categoriaRepositoryMock.save.mockResolvedValue(categoria);

		const result = await service.create(createCategoriaDto);
		expect(result).toEqual(categoria);

		expect(categoriaRepositoryMock.create).toHaveBeenCalledWith(createCategoriaDto);
		expect(categoriaRepositoryMock.save).toHaveBeenCalledWith(categoria);
	});

	it('should update a categoria', async () => {
		const categoria: Categoria = {
			categoria_id: 1,
			nome_categoria: 'Eletrônicos',
			descricao_categoria: 'Dispositivos eletrônicos',
			produtos: []
		};

		const updatedCategoriaDto: UpdateCategoriaDto = {
			nome_categoria: 'Eletrônicos Atualizado',
			descricao_categoria: 'Descrição atualizada',
		};

		const updatedCategoria: Categoria = {
			categoria_id: categoria.categoria_id,
			nome_categoria: categoria.nome_categoria,
			descricao_categoria: categoria.descricao_categoria,
			produtos: []
		};

		categoriaRepositoryMock.findOne.mockResolvedValueOnce(categoria);
		categoriaRepositoryMock.update.mockResolvedValueOnce({ affected: 1 });

		categoriaRepositoryMock.findOne.mockResolvedValueOnce(updatedCategoria);

		const result = await service.update(categoria.categoria_id, updatedCategoriaDto);
		expect(result).toEqual(updatedCategoria);

		expect(categoriaRepositoryMock.findOne).toHaveBeenCalledWith({ where: { categoria_id: categoria.categoria_id } });
		expect(categoriaRepositoryMock.update).toHaveBeenCalledWith(categoria.categoria_id, updatedCategoriaDto);
	});


	it('should delete a categoria', async () => {
		const categoria: Categoria = {
			categoria_id: 1,
			nome_categoria: 'Eletrônicos',
			descricao_categoria: 'Dispositivos eletrônicos',
			produtos: []
		};

		categoriaRepositoryMock.delete.mockResolvedValue({ affected: 1 });

		await service.delete(categoria.categoria_id);

		expect(categoriaRepositoryMock.delete).toHaveBeenCalledWith(categoria.categoria_id);
	});

});
