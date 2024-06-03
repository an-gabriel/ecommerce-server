import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoQueryService } from '../../../../src/modules/produto/queries/produto-query.service';
import { Produto } from '../../../../src/modules/produto/entity';
import { Categoria } from '../../../../src/modules/categoria/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProdutoQueryService', () => {
	let service: ProdutoQueryService;
	let produtoRepository: Repository<Produto>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProdutoQueryService,
				{
					provide: getRepositoryToken(Produto),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<ProdutoQueryService>(ProdutoQueryService);
		produtoRepository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of products', async () => {
			const categoria: Categoria = { categoria_id: 1, nome_categoria: 'Eletrônicos', descricao_categoria: 'Categoria de Eletrônicos', produtos: [] };
			const products: Produto[] = [
				{
					produto_id: 1,
					nome_produto: 'Produto 1',
					descricao_produto: 'Descrição do Produto 1',
					preco_produto: 100,
					qtd_estoque: 10,
					data_cadastro_produto: new Date(),
					imagem: 'imagem1.jpg',
					categoria: categoria,
					produtosPedidos: []
				},
				{
					produto_id: 2,
					nome_produto: 'Produto 2',
					descricao_produto: 'Descrição do Produto 2',
					preco_produto: 200,
					qtd_estoque: 20,
					data_cadastro_produto: new Date(),
					imagem: 'imagem2.jpg',
					categoria: categoria,
					produtosPedidos: []
				},

			];
			jest.spyOn(produtoRepository, 'find').mockResolvedValue(products);

			const result = await service.findAll();

			expect(result).toEqual(products);
		});
	});

	describe('findOne', () => {
		it('should return a single product by its ID', async () => {
			const productId = 1;
			const categoria: Categoria = { categoria_id: 1, nome_categoria: 'Eletrônicos', descricao_categoria: 'Categoria de Eletrônicos', produtos: [] };
			const product: Produto = {
				produto_id: productId,
				nome_produto: 'Produto 1',
				descricao_produto: 'Descrição do Produto 1',
				preco_produto: 100,
				qtd_estoque: 10,
				data_cadastro_produto: new Date(),
				imagem: 'imagem1.jpg',
				categoria: categoria,
				produtosPedidos: []
			};
			jest.spyOn(produtoRepository, 'findOne').mockResolvedValue(product);

			const result = await service.findOne(productId);

			expect(result).toEqual(product);
		});
	});
});
