import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoCommandController } from '../../../../src/modules/produto/command/produto-command.controller';
import { ProdutoCommandService } from '../../../../src/modules/produto/command/produto-command.service';
import { CreateProdutoDto, UpdateProdutoDto } from '../../../../src/modules/produto/dto';
import { Produto } from '../../../../src/modules/produto/entity';
import { Categoria } from '../../../../src/modules/categoria/entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProdutoCommandController', () => {
	let controller: ProdutoCommandController;
	let service: ProdutoCommandService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProdutoCommandController],
			providers: [ProdutoCommandService,
				{
					provide: getRepositoryToken(Produto),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(Categoria),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<ProdutoCommandController>(ProdutoCommandController);
		service = module.get<ProdutoCommandService>(ProdutoCommandService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create a new product', async () => {
			const createDto: CreateProdutoDto = {
				nome_produto: 'Novo Produto',
				descricao_produto: 'Descrição do Novo Produto',
				preco_produto: 1999.99,
				qtd_estoque: 10,
				categoria_id: 1,
				imagem: 'https://example.com/nova-imagem.jpg'
			};
			const createdProduct: Produto = {
				produto_id: 1,
				nome_produto: createDto.nome_produto,
				descricao_produto: createDto.descricao_produto || '',
				preco_produto: createDto.preco_produto || 0,
				qtd_estoque: createDto.qtd_estoque || 0,
				data_cadastro_produto: new Date(),
				categoria: {
					categoria_id: 1,
					nome_categoria: 'Categoria Existente',
					descricao_categoria: 'Descrição da Categoria Existente',
					produtos: []
				},
				imagem: createDto.imagem || '',
				produtosPedidos: []
			};

			jest.spyOn(service, 'create').mockResolvedValue(createdProduct);

			expect(await controller.create(createDto)).toBe(createdProduct);
			expect(service.create).toHaveBeenCalledWith(createDto);
		});
	});
	describe('update', () => {
		it('should update an existing product', async () => {
			const updateDto: UpdateProdutoDto = {
				nome_produto: 'Produto Atualizado',
				descricao_produto: 'Descrição do Produto Atualizado',
				preco_produto: 2999.99,
				qtd_estoque: 5,
				categoria_id: 2,
				imagem: 'https://example.com/imagem-atualizada.jpg'
			};
			const productId = 1;

			jest.spyOn(service, 'update').mockResolvedValue(undefined);

			expect(await controller.update(productId, updateDto)).toBe(undefined);
			expect(service.update).toHaveBeenCalledWith(productId, updateDto);
		});
	});

	describe('delete', () => {
		it('should delete an existing product', async () => {
			const productId = 1;

			jest.spyOn(service, 'delete').mockResolvedValue(undefined);

			expect(await controller.delete(productId)).toBe(undefined);
			expect(service.delete).toHaveBeenCalledWith(productId);
		});
	});
});
