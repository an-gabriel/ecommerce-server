import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoPedidoQueryService } from '../../../../src/modules/produto-pedido/queries/produto-pedido.query.service';
import { ProdutoPedido } from '../../../../src/modules/produto-pedido/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produto } from '../../../../src/modules/produto/entity';
import { Pedido } from '../../../../src/modules/pedido/entity';

describe('ProdutoPedidoQueryService', () => {
	let service: ProdutoPedidoQueryService;
	let repository: Repository<ProdutoPedido>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProdutoPedidoQueryService,
				{
					provide: getRepositoryToken(ProdutoPedido),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<ProdutoPedidoQueryService>(ProdutoPedidoQueryService);
		repository = module.get<Repository<ProdutoPedido>>(getRepositoryToken(ProdutoPedido));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findOne', () => {
		it('should find a specific ProdutoPedido by its ID', async () => {
			const produtoPedidoId = 1;
			const mockProdutoPedido: ProdutoPedido = {
				produto_pedido_id: produtoPedidoId,
				qtd_produto_pedido: 2,
				preco_produto_pedido: 100.00,
				produto: new Produto(),
				pedido: new Pedido(),
			};

			jest.spyOn(repository, 'findOne').mockResolvedValue(mockProdutoPedido);

			const result = await service.findOne(produtoPedidoId);

			expect(result).toEqual(mockProdutoPedido);
			expect(repository.findOne).toHaveBeenCalledWith({ where: { produto_pedido_id: produtoPedidoId } });
		});
	});

	describe('findAll', () => {
		it('should find all ProdutoPedidos', async () => {
			const mockProdutoPedidos: ProdutoPedido[] = [
				{
					produto_pedido_id: 1,
					qtd_produto_pedido: 2,
					preco_produto_pedido: 100.00,
					produto: new Produto(),
					pedido: new Pedido(),
				},
				{
					produto_pedido_id: 2,
					qtd_produto_pedido: 3,
					preco_produto_pedido: 150.00,
					produto: new Produto(),
					pedido: new Pedido(),
				},
			];

			jest.spyOn(repository, 'find').mockResolvedValue(mockProdutoPedidos);

			const result = await service.findAll();

			expect(result).toEqual(mockProdutoPedidos);
			expect(repository.find).toHaveBeenCalled();
		});
	});
});
