import { Test, TestingModule } from '@nestjs/testing';
import { PedidoQueryController } from '../../../../src/modules/pedido/queries/pedido-query.controller';
import { PedidoQueryService } from '../../../../src/modules/pedido/queries/pedido-query.service';
import { Pedido } from '../../../../src/modules/pedido/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PedidoQueryController', () => {
	let controller: PedidoQueryController;
	let service: PedidoQueryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PedidoQueryController],
			providers: [
				PedidoQueryService,
				{
					provide: getRepositoryToken(Pedido),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<PedidoQueryController>(PedidoQueryController);
		service = module.get<PedidoQueryService>(PedidoQueryService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return a list of all pedidos', async () => {
			const mockPedidos: Pedido[] = [
				{ pedido_id: 1, numero_pedido: 12345, valor_total_pedido: 199.99, data_pedido: new Date(), status: true, cliente: null },
				{ pedido_id: 2, numero_pedido: 54321, valor_total_pedido: 299.99, data_pedido: new Date(), status: false, cliente: null },
			];

			jest.spyOn(service, 'findAll').mockResolvedValue(mockPedidos);

			const result = await controller.findAll();
			expect(result).toEqual(mockPedidos);
		});
	});

	describe('findOne', () => {
		it('should return the details of a specific pedido', async () => {
			const pedidoId = 1;
			const mockPedido: Pedido = { pedido_id: 1, numero_pedido: 12345, valor_total_pedido: 199.99, data_pedido: new Date(), status: true, cliente: null };

			jest.spyOn(service, 'findOne').mockResolvedValue(mockPedido);

			const result = await controller.findOne(pedidoId);
			expect(result).toEqual(mockPedido);
		});

	});
});
