import { Test, TestingModule } from '@nestjs/testing';
import { PedidoQueryService } from '../../../../src/modules/pedido/queries/pedido-query.service';
import { Pedido } from '../../../../src/modules/pedido/entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PedidoQueryService', () => {
	let service: PedidoQueryService;
	let repository: Repository<Pedido>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PedidoQueryService,
				{
					provide: getRepositoryToken(Pedido),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<PedidoQueryService>(PedidoQueryService);
		repository = module.get<Repository<Pedido>>(getRepositoryToken(Pedido));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of pedidos', async () => {
			const mockPedidos: Pedido[] = [
				{ pedido_id: 1, numero_pedido: 12345, valor_total_pedido: 199.99, data_pedido: new Date(), status: true, cliente: null },
				{ pedido_id: 2, numero_pedido: 54321, valor_total_pedido: 299.99, data_pedido: new Date(), status: false, cliente: null },
			];

			jest.spyOn(repository, 'find').mockResolvedValue(mockPedidos);

			const result = await service.findAll();
			expect(result).toEqual(mockPedidos);
		});
	});

	describe('findOne', () => {
		it('should return a single pedido', async () => {
			const pedidoId = 1;
			const mockPedido: Pedido = { pedido_id: 1, numero_pedido: 12345, valor_total_pedido: 199.99, data_pedido: new Date(), status: true, cliente: null };

			jest.spyOn(repository, 'findOne').mockResolvedValue(mockPedido);

			const result = await service.findOne(pedidoId);
			expect(result).toEqual(mockPedido);
		});
	});
});
