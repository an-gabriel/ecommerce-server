import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClienteCommandService } from '../../../../src/modules/cliente/command/cliente-command.service';
import { Cliente } from '../../../../src/modules/cliente/entity';
import { CreateClienteDto, UpdateClienteDto } from '../../../../src/modules/cliente/dto';

describe('ClienteCommandService', () => {
	let service: ClienteCommandService;
	let clienteRepositoryMock: any;

	beforeEach(async () => {
		clienteRepositoryMock = {
			findOne: jest.fn(),
			create: jest.fn(),
			save: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ClienteCommandService,
				{
					provide: getRepositoryToken(Cliente),
					useValue: clienteRepositoryMock,
				},
			],
		}).compile();

		service = module.get<ClienteCommandService>(ClienteCommandService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a new cliente', async () => {
			const createDto: CreateClienteDto = {
				email: 'cliente@test.com',
				senha: 'password',
				nome: 'Cliente Teste',
				cpf: '12345678901',
				endereco_id: 1,
			};
			const cliente = { ...createDto, cliente_id: 1 };
			clienteRepositoryMock.findOne.mockResolvedValue(null);
			clienteRepositoryMock.create.mockReturnValue(cliente);
			clienteRepositoryMock.save.mockResolvedValue(cliente);

			const result = await service.create(createDto);

			expect(result).toEqual(cliente);
			expect(clienteRepositoryMock.create).toHaveBeenCalledWith(createDto);
			expect(clienteRepositoryMock.save).toHaveBeenCalledWith(cliente);
		});

		it('should throw BadRequestException if email is already registered', async () => {
			const createDto: CreateClienteDto = {
				email: 'cliente@test.com',
				senha: 'password',
				nome: 'Cliente Teste',
				cpf: '12345678901',
				endereco_id: 1,
			};
			clienteRepositoryMock.findOne.mockResolvedValue({ email: 'cliente@test.com' });

			await expect(service.create(createDto)).rejects.toThrowError(BadRequestException);
		});

		it('should throw BadRequestException if CPF is already registered', async () => {
			const createDto: CreateClienteDto = {
				email: 'cliente@test.com',
				senha: 'password',
				nome: 'Cliente Teste',
				cpf: '12345678901',
				endereco_id: 1,
			};
			clienteRepositoryMock.findOne.mockResolvedValue(null);
			clienteRepositoryMock.findOne.mockResolvedValueOnce({ cpf: '12345678901' });

			await expect(service.create(createDto)).rejects.toThrowError(BadRequestException);
		});
	});

	describe('update', () => {
		it('should update an existing cliente', async () => {
			const updateDto: UpdateClienteDto = {
				nome: 'Novo Nome',
			};

			const cliente = {
				cliente_id: 1,
				email: 'cliente@test.com',
				senha: 'password',
				nome: 'Cliente Teste',
				cpf: '12345678901',
				endereco_id: 1
			};

			clienteRepositoryMock.findOne.mockResolvedValue(cliente);
			clienteRepositoryMock.update.mockImplementation(async (cliente_id, data) => {
				// Simula a atualização do cliente no banco de dados
				cliente.nome = data.nome; // Atualiza apenas o nome do cliente
				return { affected: 1 };
			});

			const result = await service.update(1, updateDto);

			expect(result).toEqual({ ...cliente, ...updateDto });
			expect(clienteRepositoryMock.update).toHaveBeenCalledWith(1, updateDto);
		});

		it('should throw NotFoundException if cliente is not found', async () => {
			clienteRepositoryMock.findOne.mockResolvedValue(null);

			await expect(service.update(1, {} as UpdateClienteDto)).rejects.toThrowError(NotFoundException);
		});
	});

	describe('delete', () => {
		it('should delete an existing cliente', async () => {
			const cliente = { cliente_id: 1, email: 'cliente@test.com', senha: 'password', nome: 'Cliente Teste', cpf: '12345678901', endereco_id: 1 };
			clienteRepositoryMock.findOne.mockResolvedValue(cliente);
			clienteRepositoryMock.delete.mockResolvedValue({});

			await service.delete(1);

			expect(clienteRepositoryMock.delete).toHaveBeenCalledWith(1);
		});

		it('should throw NotFoundException if cliente is not found', async () => {
			clienteRepositoryMock.findOne.mockResolvedValue(null);

			await expect(service.delete(1)).rejects.toThrowError(NotFoundException);
		});
	});
});
