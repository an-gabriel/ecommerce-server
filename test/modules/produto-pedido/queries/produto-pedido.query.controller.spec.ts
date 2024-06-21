import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoPedidoQueryController } from '../../../../src/modules/produto-pedido/queries/produto-pedido.query.controller';
import { ProdutoPedidoQueryService } from '../../../../src/modules/produto-pedido/queries/produto-pedido.query.service';
import { ProdutoPedido } from '../../../../src/modules/produto-pedido/entity';
import { Produto } from '../../../../src/modules/produto/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pedido } from '../../../../src/modules/pedido/entity';

describe('ProdutoPedidoQueryController', () => {
	let controller: ProdutoPedidoQueryController;
	let service: ProdutoPedidoQueryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProdutoPedidoQueryController],
			providers: [ProdutoPedidoQueryService, {
				provide: getRepositoryToken(ProdutoPedido),
				useClass: Repository,
			}],
		}).compile();

		controller = module.get<ProdutoPedidoQueryController>(ProdutoPedidoQueryController);
		service = module.get<ProdutoPedidoQueryService>(ProdutoPedidoQueryService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of ProdutoPedido', async () => {
			const produtoPedido: ProdutoPedido[] = [
				{
					produto_pedido_id: 1,
					qtd_produto_pedido: 2,
					preco_produto_pedido: 100.00,
					produto_id: 1,
					produto: new Produto(),
					pedido_id: 1,
					pedido: new Pedido(),
				},
				{
					produto_pedido_id: 2,
					qtd_produto_pedido: 3,
					preco_produto_pedido: 150.00,
					produto_id: 2,
					produto: new Produto(),
					pedido_id: 2,
					pedido: new Pedido(),
				},
			];

			jest.spyOn(service, 'findAll').mockResolvedValue(produtoPedido);

			expect(await controller.findAll()).toEqual(produtoPedido);
		});
	});

	describe('findOne', () => {
		it('should return the specified ProdutoPedido', async () => {
			const produtoPedidoId = 1;
			const produtoPedido: ProdutoPedido = {
				produto_pedido_id: produtoPedidoId,
				qtd_produto_pedido: 2,
				preco_produto_pedido: 100.00,
				pedido_id: 1,
				produto: new Produto(),
				produto_id: 2,
				pedido: new Pedido(),
			};

			jest.spyOn(service, 'findOne').mockResolvedValue(produtoPedido);

			expect(await controller.findOne(produtoPedidoId)).toEqual(produtoPedido);
		});
	});
});
