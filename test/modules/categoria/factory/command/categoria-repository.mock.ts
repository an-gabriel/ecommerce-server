import { Repository, DeepPartial, FindOneOptions, SaveOptions, DeleteResult, UpdateResult } from 'typeorm';
import { Categoria } from '../../../../../src/modules/categoria/entity';

export class CategoriaRepositoryMock extends Repository<Categoria> {
	create = jest.fn().mockImplementation((data?: DeepPartial<Categoria> | DeepPartial<Categoria>[]) => {
		if (Array.isArray(data)) {
			return data.map(item => Object.assign(new Categoria(), item));
		} else {
			return Object.assign(new Categoria(), data || {});
		}
	});

	save = jest.fn().mockImplementation((entities: DeepPartial<Categoria> | DeepPartial<Categoria>[], options?: SaveOptions) => {
		const castEntities = Array.isArray(entities) ? entities : [entities];
		return Promise.resolve(castEntities.map(entity => entity as Categoria));
	});

	findOne = jest.fn().mockResolvedValue({} as Categoria);

	delete = jest.fn().mockResolvedValue({ raw: {}, affected: 1 } as DeleteResult);
}