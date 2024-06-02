import { Repository, DeepPartial, SaveOptions, DeleteResult} from 'typeorm';
import { Cliente } from '../../../../src/modules/cliente/entity';

export class ClienteRepositoryMock extends Repository<Cliente> {
	create = jest.fn().mockImplementation((data?: DeepPartial<Cliente> | DeepPartial<Cliente>[]) => {
		if (Array.isArray(data)) {
			return data.map(item => Object.assign(new Cliente(), item));
		} else {
			return Object.assign(new Cliente(), data || {});
		}
	});

	save = jest.fn().mockImplementation((entities: DeepPartial<Cliente> | DeepPartial<Cliente>[], options?: SaveOptions) => {
		const castEntities = Array.isArray(entities) ? entities : [entities];
		return Promise.resolve(castEntities.map(entity => entity as Cliente));
	});

	findOne = jest.fn().mockResolvedValue({} as Cliente);

	delete = jest.fn().mockResolvedValue({ raw: {}, affected: 1 } as DeleteResult);
}
