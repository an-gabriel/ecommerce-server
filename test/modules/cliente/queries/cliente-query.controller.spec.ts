import { Test, TestingModule } from '@nestjs/testing';
import { ClienteQueryController } from '../../../../src/modules/cliente/queries/cliente-query.controller';
import { ClienteQueryService } from '../../../../src/modules/cliente/queries/cliente-query.service';
import { Cliente } from '../../../../src/modules/cliente/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClienteQueryController', () => {
	let controller: ClienteQueryController;
	let service: ClienteQueryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClienteQueryController],
			providers: [
				ClienteQueryService,
				{
					provide: getRepositoryToken(Cliente),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<ClienteQueryController>(ClienteQueryController);
		service = module.get<ClienteQueryService>(ClienteQueryService);
	});
	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return all clientes', async () => {
			const clientes: Cliente[] = [{
				cliente_id: 1,
				email: 'cliente@exemplo.com',
				senha: 'senha123',
				nome: 'Cliente Atualizado',
				cpf: '12345678901',
				endereco: {
					endereco_id: 1,
					cep: '12345-678',
					rua: 'Rua Exemplo',
					bairro: 'Bairro Exemplo',
					cidade: 'Cidade Exemplo',
					numero: '123',
					complemento: 'Complemento Exemplo',
					uf: 'SP',
				},
				pedidos: [],
				username: 'cliente123',
				telefone: '11999999999',
				data_nascimento: new Date('1990-01-01'),
				endereco_id: 0
			}];
			jest.spyOn(service, 'findAll').mockResolvedValue(clientes);

			const result = await controller.findAll();
			expect(result).toEqual(clientes);
		});
	});


	describe('findOne', () => {
		it('should return a single cliente by ID', async () => {
			const clienteId = 1;
			const cliente: Cliente = {
				cliente_id: 1,
				email: 'cliente@exemplo.com',
				senha: 'senha123',
				nome: 'Cliente Atualizado',
				cpf: '12345678901',
				endereco: {
					endereco_id: 1,
					cep: '12345-678',
					rua: 'Rua Exemplo',
					bairro: 'Bairro Exemplo',
					cidade: 'Cidade Exemplo',
					numero: '123',
					complemento: 'Complemento Exemplo',
					uf: 'SP',
				},
				pedidos: [],
				username: 'cliente123',
				telefone: '11999999999',
				data_nascimento: new Date('1990-01-01'),
				endereco_id: 0
			};
			jest.spyOn(service, 'findOne').mockResolvedValue(cliente);

			const result = await controller.findOne(clienteId);
			expect(result).toEqual(cliente);
		});
	});
});
