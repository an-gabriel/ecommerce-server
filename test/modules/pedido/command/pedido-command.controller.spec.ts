import { Test, TestingModule } from '@nestjs/testing';
import { PedidoCommandController } from '../../../../src/modules/pedido/command/pedido-command.controller';
import { PedidoCommandService } from '../../../../src/modules/pedido/command/pedido-command.service';
import { CreatePedidoDto, UpdatePedidoDto } from '../../../../src/modules/pedido/dto';
import { Pedido } from '../../../../src/modules/pedido/entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../../../src/modules/cliente/entity';

describe('PedidoCommandController', () => {
	let controller: PedidoCommandController;
	let service: PedidoCommandService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PedidoCommandController],
			providers: [
				PedidoCommandService,
				{
					provide: getRepositoryToken(Pedido),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(Cliente),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<PedidoCommandController>(PedidoCommandController);
		service = module.get<PedidoCommandService>(PedidoCommandService);
	});

	describe('create', () => {
		it('should create a new pedido', async () => {
			const createdPedido: Pedido = {
				pedido_id: 1,
				numero_pedido: 12345,
				valor_total_pedido: 199.99,
				data_pedido: new Date(),
				status: true,
				cliente: {
					cliente_id: 1,
					email: 'cliente@exemplo.com',
					username: 'cliente123',
					senha: 'senha123',
					nome: 'Cliente Atualizado',
					cpf: '12345678901',
					telefone: '11999999999',
					data_nascimento: '1990-01-01',
					pedidos: [],
					endereco_id: 0
				},
				produtosPedidos: []
			};
			const pedidoDto: CreatePedidoDto = {
				numero_pedido: createdPedido.numero_pedido,
				valor_total_pedido: createdPedido.valor_total_pedido,
				cliente_id: createdPedido.cliente.cliente_id
			};

			jest.spyOn(service, 'create').mockResolvedValue(createdPedido);

			const result = await controller.create(pedidoDto);
			expect(result).toEqual(createdPedido);
		});
	});


	describe('update', () => {
		it('should update an existing pedido', async () => {
			const id = 1;
			const updatedPedido: Pedido = {
				pedido_id: 1,
				numero_pedido: 54321,
				valor_total_pedido: 299.99,
				data_pedido: new Date(),
				status: true,
				produtosPedidos: []
			};

			const pedidoDto: UpdatePedidoDto = { numero_pedido: updatedPedido.numero_pedido, valor_total_pedido: updatedPedido.valor_total_pedido };

			jest.spyOn(service, 'update').mockResolvedValue(updatedPedido);

			const result = await controller.update(id, pedidoDto);
			expect(result).toEqual(updatedPedido);
		});
	});

	describe('delete', () => {
		it('should delete an existing pedido', async () => {
			const id = 1;

			jest.spyOn(service, 'delete').mockResolvedValue(undefined);

			const result = await controller.delete(id);
			expect(result).toBeUndefined();
		});
	});
});
