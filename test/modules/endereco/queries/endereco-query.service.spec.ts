import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoQueryService } from '../../../../src/modules/endereco/queries/endereco-query.service';
import { Endereco } from '../../../../src/modules/endereco/entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EnderecoQueryService', () => {
	let service: EnderecoQueryService;
	let repository: Repository<Endereco>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EnderecoQueryService,
				{
					provide: getRepositoryToken(Endereco),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<EnderecoQueryService>(EnderecoQueryService);
		repository = module.get<Repository<Endereco>>(getRepositoryToken(Endereco));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of enderecos', async () => {
			const enderecos: Endereco[] = [{
				endereco_id: 1,
				rua: 'Rua Exemplo',
				numero: '123',
				complemento: 'Apt 456',
				bairro: 'Bairro Exemplo',
				cidade: 'Cidade Exemplo',
				uf: 'UE',
				cep: '12345678',
			}];
			jest.spyOn(repository, 'find').mockResolvedValue(enderecos);

			const result = await service.findAll();
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
			};
			jest.spyOn(repository, 'findOne').mockResolvedValue(endereco);

			const result = await service.findOne(enderecoId);
			expect(result).toEqual(endereco);
		});
	});
});
