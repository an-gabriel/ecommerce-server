import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoQueryController } from '../../../../src/modules/endereco/queries/endereco-query.controller';
import { EnderecoQueryService } from '../../../../src/modules/endereco/queries/endereco-query.service';
import { Endereco } from '../../../../src/modules/endereco/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EnderecoQueryController', () => {
	let controller: EnderecoQueryController;
	let service: EnderecoQueryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EnderecoQueryController],
			providers: [
				EnderecoQueryService,
				{
					provide: getRepositoryToken(Endereco),
					useClass: Repository,
				},
			],
		}).compile();

		controller = module.get<EnderecoQueryController>(EnderecoQueryController);
		service = module.get<EnderecoQueryService>(EnderecoQueryService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return all enderecos', async () => {
			const enderecos: Endereco[] = [{
				endereco_id: 1,
				rua: 'Rua Exemplo',
				numero: '123',
				complemento: 'Apt 456',
				bairro: 'Bairro Exemplo',
				cidade: 'Cidade Exemplo',
				uf: 'UE',
				cep: '12345678',
				clientes: []
			}];
			jest.spyOn(service, 'findAll').mockResolvedValue(enderecos);

			const result = await controller.findAll();
			expect(result).toEqual(enderecos);
		});
	});

	describe('findOne', () => {
		it('should return a single endereco by ID', async () => {
			const enderecoId = 1;
			const endereco: Endereco = {
				endereco_id: 1,
				rua: 'Rua Exemplo',
				numero: '123',
				complemento: 'Apt 456',
				bairro: 'Bairro Exemplo',
				cidade: 'Cidade Exemplo',
				uf: 'UE',
				cep: '12345678',
				clientes: []
			};
			jest.spyOn(service, 'findOne').mockResolvedValue(endereco);

			const result = await controller.findOne(enderecoId);
			expect(result).toEqual(endereco);
		});
	});
});
