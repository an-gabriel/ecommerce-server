import { Test, TestingModule } from '@nestjs/testing';
import { ClienteCommandController } from '../../../../src/modules/cliente/command/cliente-command.controller';
import { ClienteCommandService } from '../../../../src/modules/cliente/command/cliente-command.service';
import { CreateClienteDto, UpdateClienteDto } from '../../../../src/modules/cliente/dto';
import { Cliente } from '../../../../src/modules/cliente/entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ClienteCommandController', () => {
	let controller: ClienteCommandController;
	let service: ClienteCommandService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClienteCommandController],
			providers: [
				ClienteCommandService,
				{
					provide: getRepositoryToken(Cliente),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<ClienteCommandController>(ClienteCommandController);
		service = module.get<ClienteCommandService>(ClienteCommandService);
	});

	describe('create', () => {
		it('should create a new cliente', async () => {
			const createdCliente: Cliente = {
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
				data_nascimento: '1990-01-01'
			};

			const clienteDto: CreateClienteDto = {
				email: createdCliente.email,
				senha: createdCliente.senha,
				nome: createdCliente.nome,
				cpf: createdCliente.cpf,
				endereco_id: createdCliente.endereco.endereco_id
			};

			jest.spyOn(service, 'create').mockResolvedValue(createdCliente);

			const result = await controller.create(clienteDto);
			expect(result).toEqual(createdCliente);
		});
	});

	describe('update', () => {
		it('should update an existing cliente', async () => {
			const id = 1;

			const updatedCliente: Cliente = {
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
				data_nascimento: '1990-01-01'
			};

			const clienteDto: UpdateClienteDto = { nome: updatedCliente.nome };

			jest.spyOn(service, 'update').mockResolvedValue(updatedCliente);

			const result = await controller.update(id, clienteDto);
			expect(result).toEqual(updatedCliente);
		});
	});

	describe('delete', () => {
		it('should delete an existing cliente', async () => {
			const id = 1;

			jest.spyOn(service, 'delete').mockResolvedValue(undefined);

			const result = await controller.delete(id);
			expect(result).toBeUndefined();
		});
	});
});
