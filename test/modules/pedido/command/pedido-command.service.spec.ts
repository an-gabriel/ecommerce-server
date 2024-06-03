import { Test, TestingModule } from '@nestjs/testing';
import { PedidoCommandService } from '../../../../src/modules/pedido/command/pedido-command.service';
import { CreatePedidoDto, UpdatePedidoDto } from '../../../../src/modules/pedido/dto';
import { Pedido } from '../../../../src/modules/pedido/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PedidoCommandService', () => {
	let service: PedidoCommandService;
	let repository: Repository<Pedido>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PedidoCommandService,
				{
					provide: getRepositoryToken(Pedido),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<PedidoCommandService>(PedidoCommandService);
		repository = module.get<Repository<Pedido>>(getRepositoryToken(Pedido));
	});

	describe('create', () => {
		it('should create a new pedido', async () => {
			const createdPedido: Pedido = {
				pedido_id: 1,
				numero_pedido: 12345,
				valor_total_pedido: 199.99,
				data_pedido: new Date(),
				status: true,
				produtosPedidos: []
			};
			const pedidoDto: CreatePedidoDto = {
				numero_pedido: createdPedido.numero_pedido, valor_total_pedido: createdPedido.valor_total_pedido,
				cliente_id: 0
			};

			jest.spyOn(repository, 'create').mockReturnValue(createdPedido);
			jest.spyOn(repository, 'save').mockResolvedValue(createdPedido);

			const result = await service.create(pedidoDto);
			expect(result).toEqual(createdPedido);
		});
	});

	describe('update', () => {
		it('should update an existing pedido', async () => {
			const id = 1;
			const updatedPedido: Pedido = {
				pedido_id: 1, numero_pedido: 54321, valor_total_pedido: 299.99, data_pedido: new Date(), status: true,
				produtosPedidos: []
			};
			const pedidoDto: UpdatePedidoDto = { numero_pedido: updatedPedido.numero_pedido, valor_total_pedido: updatedPedido.valor_total_pedido };

			jest.spyOn(repository, 'findOne').mockResolvedValue(updatedPedido);
			jest.spyOn(repository, 'save').mockResolvedValue(updatedPedido);

			const result = await service.update(id, pedidoDto);
			expect(result).toEqual(updatedPedido);
		});

		it('should throw NotFoundException when pedido is not found', async () => {
			const id = 1;
			const pedidoDto: UpdatePedidoDto = { numero_pedido: 54321, valor_total_pedido: 299.99 };

			jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

			await expect(service.update(id, pedidoDto)).rejects.toThrow(NotFoundException);
		});
	});

	describe('delete', () => {
		it('should delete an existing pedido', async () => {
			const id = 1;
			const deletedPedido: Pedido = {
				pedido_id: 1, numero_pedido: 12345, valor_total_pedido: 199.99, data_pedido: new Date(), status: true,
				produtosPedidos: []
			};

			jest.spyOn(repository, 'findOne').mockResolvedValue(deletedPedido);
			jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

			await service.delete(id);
			expect(repository.remove).toHaveBeenCalledWith(deletedPedido);
		});

		it('should throw NotFoundException when pedido is not found', async () => {
			const id = 1;

			jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

			await expect(service.delete(id)).rejects.toThrow(NotFoundException);
		});
	});
});
