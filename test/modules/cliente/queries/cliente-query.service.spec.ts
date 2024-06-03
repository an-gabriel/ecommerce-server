import { Test, TestingModule } from '@nestjs/testing';
import { ClienteQueryService } from '../../../../src/modules/cliente/queries/cliente-query.service';
import { Cliente } from '../../../../src/modules/cliente/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClienteQueryService', () => {
	let service: ClienteQueryService;
	let clienteRepository: Repository<Cliente>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ClienteQueryService,
				{
					provide: getRepositoryToken(Cliente),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<ClienteQueryService>(ClienteQueryService);
		clienteRepository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
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
				data_nascimento: '1990-01-01',
				endereco_id: 0
			}];

			jest.spyOn(clienteRepository, 'find').mockResolvedValue(clientes);

			const result = await service.findAll();
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
				data_nascimento: '1990-01-01',
				endereco_id: 0
			};
			jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(cliente);

			const result = await service.findOne(clienteId);
			expect(result).toEqual(cliente);
		});
	});
});
