import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EnderecoCommandService } from '../../../../src/modules/endereco/command/endereco-command.service';
import { Endereco } from '../../../../src/modules/endereco/entity';
import { CreateEnderecoDto, UpdateEnderecoDto } from '../../../../src/modules/endereco/dto';

describe('EnderecoCommandService', () => {
	let service: EnderecoCommandService;
	let enderecoRepositoryMock: any;

	beforeEach(async () => {
		enderecoRepositoryMock = {
			findOne: jest.fn(),
			create: jest.fn(),
			save: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EnderecoCommandService,
				{
					provide: getRepositoryToken(Endereco),
					useValue: enderecoRepositoryMock,
				},
			],
		}).compile();

		service = module.get<EnderecoCommandService>(EnderecoCommandService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a new endereco', async () => {
			const createDto: CreateEnderecoDto = {
				cep: '12345678',
				rua: 'Rua Teste',
				bairro: 'Bairro Teste',
				cidade: 'Cidade Teste',
				numero: '123',
				complemento: 'Complemento Teste',
				uf: 'UF',
			};
			const endereco = { ...createDto, endereco_id: 1 };
			enderecoRepositoryMock.findOne.mockResolvedValue(null);
			enderecoRepositoryMock.create.mockReturnValue(endereco);
			enderecoRepositoryMock.save.mockResolvedValue(endereco);

			const result = await service.create(createDto);

			expect(result).toEqual(endereco);
			expect(enderecoRepositoryMock.create).toHaveBeenCalledWith(createDto);
			expect(enderecoRepositoryMock.save).toHaveBeenCalledWith(endereco);
		});

		it('should throw BadRequestException if CEP and number are already registered together', async () => {
			const createDto: CreateEnderecoDto = {
				cep: '12345678',
				rua: 'Rua Teste',
				bairro: 'Bairro Teste',
				cidade: 'Cidade Teste',
				numero: '123',
				complemento: 'Complemento Teste',
				uf: 'UF',
			};
			enderecoRepositoryMock.findOne.mockResolvedValue({ cep: createDto.cep, numero: createDto.numero });

			await expect(service.create(createDto)).rejects.toThrowError(BadRequestException);
		});
	});

	describe('update', () => {
		it('should update an existing endereco', async () => {
			const updateDto: UpdateEnderecoDto = {
				rua: 'Nova Rua',
			};
	
			const endereco = {
				endereco_id: 1,
				cep: '12345678',
				rua: 'Rua Teste',
				bairro: 'Bairro Teste',
				cidade: 'Cidade Teste',
				numero: '123',
				complemento: 'Complemento Teste',
				uf: 'UF',
			};
	
			enderecoRepositoryMock.findOne.mockResolvedValue(endereco);
			enderecoRepositoryMock.update.mockImplementation(async (endereco_id, data) => {
				endereco.rua = data.rua;
				return { affected: 1 };
			});
	
			jest.spyOn(service as any, 'enderecoJaCadastrado').mockResolvedValue(false);
	
			const result = await service.update(1, updateDto);
	
			expect(result).toEqual({ ...endereco, ...updateDto });
			expect(enderecoRepositoryMock.update).toHaveBeenCalledWith(1, updateDto);
		});
	
		it('should throw NotFoundException if endereco is not found', async () => {
			enderecoRepositoryMock.findOne.mockResolvedValue(null);
	
			await expect(service.update(1, {} as UpdateEnderecoDto)).rejects.toThrowError(NotFoundException);
		});
	});
	


	describe('delete', () => {
		it('should delete an existing endereco', async () => {
			const endereco = { endereco_id: 1, cep: '12345678', rua: 'Rua Teste', bairro: 'Bairro Teste', cidade: 'Cidade Teste', numero: '123', complemento: 'Complemento Teste', uf: 'UF' };
			enderecoRepositoryMock.findOne.mockResolvedValue(endereco);
			enderecoRepositoryMock.delete.mockResolvedValue({});

			await service.delete(1);

			expect(enderecoRepositoryMock.delete).toHaveBeenCalledWith(1);
		});

		it('should throw NotFoundException if endereco is not found', async () => {
			enderecoRepositoryMock.findOne.mockResolvedValue(null);

			await expect(service.delete(1)).rejects.toThrowError(NotFoundException);
		});
	});
});
