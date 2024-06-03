import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoCommandService } from '../../../../src/modules/produto/command/produto-command.service';
import { Produto } from '../../../../src/modules/produto/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto, UpdateProdutoDto } from '../../../../src/modules/produto/dto';
import { Categoria } from '../../../../src/modules/categoria/entity';

describe('ProdutoCommandService', () => {
	let service: ProdutoCommandService;
	let produtoRepository: Repository<Produto>;
	let categoriaRepository: Repository<Categoria>;

	const mockProdutoRepository = {
		findOne: jest.fn(),
		create: jest.fn(),
		save: jest.fn(),
		remove: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	};

	const mockCategoriaRepository = {
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProdutoCommandService,
				{ provide: getRepositoryToken(Produto), useValue: mockProdutoRepository },
				{ provide: getRepositoryToken(Categoria), useValue: mockCategoriaRepository },
			],
		}).compile();

		service = module.get<ProdutoCommandService>(ProdutoCommandService);
		produtoRepository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
		categoriaRepository = module.get<Repository<Categoria>>(getRepositoryToken(Categoria));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a new product', async () => {
			const createDto: CreateProdutoDto = {
				nome_produto: 'Notebook',
				descricao_produto: 'Notebook com 16GB de RAM e 512GB SSD',
				preco_produto: 2999.99,
				qtd_estoque: 10,
				categoria_id: 1,
				imagem: 'https://example.com/imagem.jpg'
			};

			const categoriaMock: Categoria = {
				categoria_id: 1,
				nome_categoria: 'Eletrônicos',
				descricao_categoria: 'Categoria de produtos eletrônicos',
				produtos: []
			};

			const produtoMock: Produto = {
				...createDto,
				produto_id: 1,
				categoria: categoriaMock,
				data_cadastro_produto: new Date(),
				produtosPedidos: [],
				descricao_produto: createDto.descricao_produto || '',
				imagem: createDto.imagem || '',
			};

			mockCategoriaRepository.findOne.mockResolvedValue(categoriaMock);
			mockProdutoRepository.create.mockReturnValue(produtoMock);
			mockProdutoRepository.save.mockResolvedValue(produtoMock);

			const result = await service.create(createDto);

			expect(mockProdutoRepository.create).toHaveBeenCalledWith(createDto);
			expect(mockProdutoRepository.save).toHaveBeenCalledWith(produtoMock);
			expect(result).toEqual(produtoMock);
		});


		it('should throw BadRequestException if category does not exist', async () => {
			const createDto: CreateProdutoDto = {
				nome_produto: 'Notebook',
				descricao_produto: 'Notebook com 16GB de RAM e 512GB SSD',
				preco_produto: 2999.99,
				qtd_estoque: 10,
				categoria_id: 1,
				imagem: 'https://example.com/imagem.jpg'
			};

			mockCategoriaRepository.findOne.mockResolvedValue(null);

			await expect(service.create(createDto)).rejects.toThrowError(NotFoundException);
		});
	});

	describe('update', () => {
		it('should update an existing product', async () => {
			const updateDto: UpdateProdutoDto = {
				nome_produto: 'Notebook Novo Modelo',
				descricao_produto: 'Notebook com 32GB de RAM e 1TB SSD',
				preco_produto: 3499.99,
				qtd_estoque: 15,
				categoria_id: 2,
				imagem: 'https://example.com/nova-imagem.jpg'
			};

			const productId = 1;

			const existingProduct: Produto = {
				produto_id: productId,
				nome_produto: 'Notebook',
				descricao_produto: 'Notebook com 16GB de RAM e 512GB SSD',
				preco_produto: 2999.99,
				qtd_estoque: 10,
				categoria: {
					categoria_id: 1,
					nome_categoria: 'Eletrônicos',
					descricao_categoria: 'Categoria de produtos eletrônicos',
					produtos: []
				},
				imagem: 'https://example.com/imagem.jpg',
				data_cadastro_produto: undefined,
				produtosPedidos: []
			};

			const updatedProduct: Produto = {
				...existingProduct,
				...updateDto,
				categoria: {
					categoria_id: 2,
					nome_categoria: 'Computadores',
					descricao_categoria: 'Categoria de computadores',
					produtos: []
				}
			};

			mockProdutoRepository.findOne.mockResolvedValue(existingProduct);
			mockCategoriaRepository.findOne.mockResolvedValue({
				categoria_id: 2,
				nome_categoria: 'Computadores',
				descricao_categoria: 'Categoria de computadores',
			});
			mockProdutoRepository.save.mockResolvedValue(updatedProduct);

			const result = await service.update(productId, updateDto);

			expect(mockProdutoRepository.findOne).toHaveBeenCalledWith({ where: { produto_id: productId } });
			expect(mockCategoriaRepository.findOne).
				toHaveBeenCalledWith({ where: { categoria_id: updateDto.categoria_id } });
			expect(result).toEqual(updatedProduct);
		});

		it('should throw NotFoundException if product does not exist', async () => {
			const updateDto: UpdateProdutoDto = {
				nome_produto: 'Notebook Novo Modelo',
				descricao_produto: 'Notebook com 32GB de RAM e 1TB SSD',
				preco_produto: 3499.99,
				qtd_estoque: 15,
				categoria_id: 2,
				imagem: 'https://example.com/nova-imagem.jpg'
			};

			const productId = 1;

			mockProdutoRepository.findOne.mockResolvedValue(null);

			await expect(service.update(productId, updateDto)).rejects.toThrowError(NotFoundException);
		});

		it('should throw NotFoundException if category does not exist', async () => {
			const updateDto: UpdateProdutoDto = {
				nome_produto: 'Notebook Novo Modelo',
				descricao_produto: 'Notebook com 32GB de RAM e 1TB SSD',
				preco_produto: 3499.99,
				qtd_estoque: 15,
				categoria_id: 2,
				imagem: 'https://example.com/nova-imagem.jpg'
			};

			const productId = 1;

			const existingProduct: Produto = {
				produto_id: productId,
				nome_produto: 'Notebook',
				descricao_produto: 'Notebook com 16GB de RAM e 512GB SSD',
				preco_produto: 2999.99,
				qtd_estoque: 10,
				categoria: {
					categoria_id: 1,
					nome_categoria: 'Eletrônicos',
					descricao_categoria: 'Categoria de produtos eletrônicos',
					produtos: []
				},
				imagem: 'https://example.com/imagem.jpg',
				data_cadastro_produto: undefined,
				produtosPedidos: []
			};

			mockProdutoRepository.findOne.mockResolvedValue(existingProduct);
			mockCategoriaRepository.findOne.mockResolvedValue(null);

			await expect(service.update(productId, updateDto)).rejects.toThrowError(NotFoundException);
		});
	});

	describe('delete', () => {
		it('should delete an existing product', async () => {
			const productId = 1;

			const existingProduct: Produto = {
				produto_id: productId,
				nome_produto: 'Notebook',
				descricao_produto: 'Notebook com 16GB de RAM e 512GB SSD',
				preco_produto: 2999.99,
				qtd_estoque: 10,
				categoria: {
					categoria_id: 1,
					nome_categoria: 'Eletrônicos',
					descricao_categoria: 'Categoria de produtos eletrônicos',
					produtos: []
				},
				imagem: 'https://example.com/imagem.jpg',
				data_cadastro_produto: undefined,
				produtosPedidos: []
			};

			mockProdutoRepository.findOne.mockResolvedValue(existingProduct);
			mockProdutoRepository.remove.mockResolvedValue(undefined);


			await expect(service.delete(productId)).resolves.toBeUndefined();


			expect(mockProdutoRepository.remove).toHaveBeenCalledTimes(1);
		});

		it('should throw NotFoundException if product does not exist', async () => {
			const productId = 1;

			mockProdutoRepository.findOne.mockResolvedValue(null);

			await expect(service.delete(productId)).rejects.toThrowError(NotFoundException);
		});
	});
});
