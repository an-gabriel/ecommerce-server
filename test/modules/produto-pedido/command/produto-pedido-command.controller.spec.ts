import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoPedidoCommandController } from '../../../../src/modules/produto-pedido/command/produto-pedido.command.controller';
import { ProdutoPedidoCommandService } from '../../../../src/modules/produto-pedido/command/produto-pedido.command.service';
import { CreateProdutoPedidoDto, UpdateProdutoPedidoDto } from '../../../../src/modules/produto-pedido/dto';
import { ProdutoPedido } from '../../../../src/modules/produto-pedido/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produto } from '../../../../src/modules/produto/entity';
import { Pedido } from '../../../../src/modules/pedido/entity';

describe('ProdutoPedidoCommandController', () => {
	let controller: ProdutoPedidoCommandController;
	let service: ProdutoPedidoCommandService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProdutoPedidoCommandController],
			providers: [
				ProdutoPedidoCommandService,
				{
					provide: getRepositoryToken(ProdutoPedido),
					useClass: Repository,
				}, {
					provide: getRepositoryToken(Produto),
					useClass: Repository,
				}, {
					provide: getRepositoryToken(Pedido),
					useClass: Repository,
				},],
		}).compile();

		controller = module.get<ProdutoPedidoCommandController>(ProdutoPedidoCommandController);
		service = module.get<ProdutoPedidoCommandService>(ProdutoPedidoCommandService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create a new product order', async () => {
			const createDto: CreateProdutoPedidoDto = {
				qtd_produto_pedido: 2,
				preco_produto_pedido: 100.00,
				produto_id: 1,
				pedido_id: 1,
			};

			const createdProdutoPedido: ProdutoPedido = {
				produto_pedido_id: 1,
				...createDto,
				produto: new Produto(),
				pedido: new Pedido()
			};

			jest.spyOn(service, 'create').mockResolvedValue(createdProdutoPedido);

			const result = await controller.create(createDto);

			expect(result).toEqual(createdProdutoPedido);
		});
	});

	describe('update', () => {
		it('should update an existing product order', async () => {
			const updateDto: UpdateProdutoPedidoDto = {
				qtd_produto_pedido: 3,
				preco_produto_pedido: 150.00,
			};

			const updatedProdutoPedido: ProdutoPedido = {
				produto_pedido_id: 1,
				...updateDto,
				produto_id: 1,
				produto: new Produto(),
				pedido_id: 1,
				pedido: new Pedido(),
			};

			jest.spyOn(service, 'update').mockResolvedValue(updatedProdutoPedido);

			const result = await controller.update(1, updateDto);

			expect(result).toEqual(updatedProdutoPedido);
		});
	});

	describe('delete', () => {
		it('should delete an existing product order', async () => {
			jest.spyOn(service, 'delete').mockResolvedValue(undefined);

			await expect(controller.delete(1)).resolves.toBeUndefined();
		});
	});
});
