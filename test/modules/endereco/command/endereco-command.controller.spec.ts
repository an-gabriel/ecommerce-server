import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoCommandController } from '../../../../src/modules/endereco/command/endereco-command.controller';
import { EnderecoCommandService } from '../../../../src/modules/endereco/command/endereco-command.service';
import { CreateEnderecoDto, UpdateEnderecoDto } from '../../../../src/modules/endereco/dto';
import { Endereco } from '../../../../src/modules/endereco/entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('EnderecoCommandController', () => {
	let controller: EnderecoCommandController;
	let service: EnderecoCommandService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EnderecoCommandController],
			providers: [
				EnderecoCommandService,
				{
					provide: getRepositoryToken(Endereco),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<EnderecoCommandController>(EnderecoCommandController);
		service = module.get<EnderecoCommandService>(EnderecoCommandService);
	});

	describe('create', () => {
		it('should create a new endereco', async () => {
			const createdEndereco: Endereco = {
				endereco_id: 1,
				cep: '12345678',
				rua: 'Rua Exemplo',
				bairro: 'Bairro Exemplo',
				cidade: 'Cidade Exemplo',
				numero: '123',
				complemento: 'Complemento Exemplo',
				uf: 'UF',
			};

			const enderecoDto: CreateEnderecoDto = {
				cep: createdEndereco.cep,
				rua: createdEndereco.rua,
				bairro: createdEndereco.bairro,
				cidade: createdEndereco.cidade,
				numero: createdEndereco.numero,
				complemento: createdEndereco.complemento,
				uf: createdEndereco.uf,
			};

			jest.spyOn(service, 'create').mockResolvedValue(createdEndereco);

			const result = await controller.create(enderecoDto);
			expect(result).toEqual(createdEndereco);
		});
	});

	describe('update', () => {
		it('should update an existing endereco', async () => {
			const id = 1;

			const updatedEndereco: Endereco = {
				endereco_id: 1,
				cep: '87654321',
				rua: 'Rua Atualizada',
				bairro: 'Bairro Atualizado',
				cidade: 'Cidade Atualizada',
				numero: '456',
				complemento: 'Complemento Atualizado',
				uf: 'UF Atualizado',
			};

			const enderecoDto: UpdateEnderecoDto = { rua: updatedEndereco.rua };

			jest.spyOn(service, 'update').mockResolvedValue(updatedEndereco);

			const result = await controller.update(id, enderecoDto);
			expect(result).toEqual(updatedEndereco);
		});
	});

	describe('delete', () => {
		it('should delete an existing endereco', async () => {
			const id = 1;

			jest.spyOn(service, 'delete').mockResolvedValue(undefined);

			const result = await controller.delete(id);
			expect(result).toBeUndefined();
		});
	});
});
