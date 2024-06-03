import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoCommandService } from '../../../../src/modules/produto/command/produto-command.service';
import { Produto } from '../../../../src/modules/produto/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProdutoDto, UpdateProdutoDto } from '../../../../src/modules/produto/dto';

describe('ProdutoCommandService', () => {
	let service: ProdutoCommandService;
	let produtoRepository: Repository<Produto>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProdutoCommandService,
				{
					provide: getRepositoryToken(Produto),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<ProdutoCommandService>(ProdutoCommandService);
		produtoRepository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {

		const createDto: CreateProdutoDto = {
			nome_produto: 'Notebook',
			descricao_produto: 'Notebook com 16GB de RAM e 512GB SSD',
			preco_produto: 2999.99,
			qtd_estoque: 10,
			categoria_id: 1,
			imagem: 'https://example.com/imagem.jpg'
		};

		it('should create a new product', async () => {

			const createdProduct: Produto = {
				produto_id: 1,
				nome_produto: createDto.nome_produto,
				descricao_produto: createDto.descricao_produto || '',
				preco_produto: createDto.preco_produto || 0,
				qtd_estoque: createDto.qtd_estoque || 0,
				data_cadastro_produto: new Date(),
				categoria: {
					categoria_id: 0,
					nome_categoria: '',
					descricao_categoria: '',
					produtos: []
				},
				imagem: createDto.imagem || '',
				produtosPedidos: []
			};

			jest.spyOn(produtoRepository, 'create').mockReturnValue(createdProduct);
			jest.spyOn(produtoRepository, 'save').mockResolvedValue(createdProduct);

			const result = await service.create(createDto);

			expect(produtoRepository.create).toHaveBeenCalledWith(createDto);
			expect(produtoRepository.save).toHaveBeenCalledWith(createdProduct);
		});
	});


	describe('update', () => {
		it('should update an existing product', async () => {
			const updateDto: UpdateProdutoDto = {
				nome_produto: 'Novo Nome do Produto',
				descricao_produto: 'Nova descrição do produto',
				preco_produto: 1999.99,
				qtd_estoque: 5,
				categoria_id: 2,
				imagem: 'https://example.com/nova-imagem.jpg'
			};

			const productId = 1;

			const existingProduct: Produto = {
				produto_id: productId,
				nome_produto: 'Produto Existente',
				descricao_produto: 'Descrição do produto existente',
				preco_produto: 2999.99,
				qtd_estoque: 10,
				data_cadastro_produto: new Date(),
				categoria: {
					categoria_id: 1,
					nome_categoria: 'Categoria Existente',
					descricao_categoria: 'Descrição da categoria existente',
					produtos: []
				},
				imagem: 'https://example.com/imagem-existente.jpg',
				produtosPedidos: []
			};

			// Corrigindo atribuições dos valores do DTO ao objeto existingProduct
			existingProduct.nome_produto = updateDto.nome_produto || existingProduct.nome_produto;
			existingProduct.descricao_produto = updateDto.descricao_produto || existingProduct.descricao_produto;
			existingProduct.preco_produto = updateDto.preco_produto || existingProduct.preco_produto;
			existingProduct.qtd_estoque = updateDto.qtd_estoque || existingProduct.qtd_estoque;
			existingProduct.categoria.categoria_id = updateDto.categoria_id || existingProduct.categoria.categoria_id;
			existingProduct.imagem = updateDto.imagem || existingProduct.imagem;

			jest.spyOn(produtoRepository, 'update').mockResolvedValue(undefined);
			jest.spyOn(produtoRepository, 'findOne').mockResolvedValue(existingProduct);

			const result = await service.update(productId, updateDto);

			expect(produtoRepository.update).toHaveBeenCalledWith(productId, updateDto);
			expect(produtoRepository.findOne).toHaveBeenCalledWith({ where: { produto_id: productId } });
			expect(result).toEqual(existingProduct); // Corrigido para comparar com o produto atualizado
		});
	});




	describe('delete', () => {
		it('should delete an existing product', async () => {
			const productId = 1;

			jest.spyOn(produtoRepository, 'delete').mockResolvedValue(undefined);

			expect(await service.delete(productId)).toBeUndefined();
			expect(produtoRepository.delete).toHaveBeenCalledWith(productId);
		});
	});
});
