import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoQueryController } from '../../../../src/modules/produto/queries/produto-query.controller';
import { ProdutoQueryService } from '../../../../src/modules/produto/queries/produto-query.service';
import { Produto } from '../../../../src/modules/produto/entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


describe('ProdutoQueryController', () => {
	let controller: ProdutoQueryController;
	let service: ProdutoQueryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProdutoQueryController],
			providers: [ProdutoQueryService, {
				provide: getRepositoryToken(Produto),
				useClass: Repository,
			}],
		}).compile();

		controller = module.get<ProdutoQueryController>(ProdutoQueryController);
		service = module.get<ProdutoQueryService>(ProdutoQueryService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of products', async () => {
			const mockProducts: Produto[] = [
				{
					produto_id: 1,
					nome_produto: 'Produto 1',
					descricao_produto: 'Descrição do produto 1',
					preco_produto: 10.99,
					qtd_estoque: 5,
					data_cadastro_produto: new Date(),
					categoria: {
						categoria_id: 1,
						nome_categoria: 'Categoria 1',
						descricao_categoria: 'Descrição da categoria 1',
						produtos: []
					},
					imagem: 'https://example.com/produto1.jpg',
					produtosPedidos: []
				},
				{
					produto_id: 2,
					nome_produto: 'Produto 2',
					descricao_produto: 'Descrição do produto 2',
					preco_produto: 20.99,
					qtd_estoque: 10,
					data_cadastro_produto: new Date(),
					categoria: {
						categoria_id: 2,
						nome_categoria: 'Categoria 2',
						descricao_categoria: 'Descrição da categoria 2',
						produtos: []
					},
					imagem: 'https://example.com/produto2.jpg',
					produtosPedidos: []
				}
			];

			jest.spyOn(service, 'findAll').mockResolvedValue(mockProducts);

			expect(await controller.findAll()).toBe(mockProducts);
			expect(service.findAll).toHaveBeenCalled();
		});
	});

	describe('findOne', () => {
		it('should return a product by its ID', async () => {
			const productId = 1;
			const mockProduct: Produto = {
				produto_id: 1,
				nome_produto: 'Produto 1',
				descricao_produto: 'Descrição do produto 1',
				preco_produto: 10.99,
				qtd_estoque: 5,
				data_cadastro_produto: new Date(),
				categoria: {
					categoria_id: 1,
					nome_categoria: 'Categoria 1',
					descricao_categoria: 'Descrição da categoria 1',
					produtos: []
				},
				imagem: 'https://example.com/produto1.jpg',
				produtosPedidos: []
			};

			jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);

			expect(await controller.findOne(productId)).toBe(mockProduct);
			expect(service.findOne).toHaveBeenCalledWith(productId);
		});
	});
});
