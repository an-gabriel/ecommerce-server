import { Repository, DeepPartial, SaveOptions, DeleteResult } from 'typeorm';
import { Endereco } from '../../../../src/modules/endereco/entity';

export class EnderecoRepositoryMock extends Repository<Endereco> {
	create = jest.fn().mockImplementation((data?: DeepPartial<Endereco> | DeepPartial<Endereco>[]) => {
		if (Array.isArray(data)) {
			return data.map(item => Object.assign(new Endereco(), item));
		} else {
			return Object.assign(new Endereco(), data || {});
		}
	});

	save = jest.fn().mockImplementation((entities: DeepPartial<Endereco> | DeepPartial<Endereco>[], options?: SaveOptions) => {
		const castEntities = Array.isArray(entities) ? entities : [entities];
		return Promise.resolve(castEntities.map(entity => entity as Endereco));
	});

	findOne = jest.fn().mockResolvedValue({} as Endereco);

	delete = jest.fn().mockResolvedValue({ raw: {}, affected: 1 } as DeleteResult);
}
