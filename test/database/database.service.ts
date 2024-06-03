import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
	private db: Record<string, any> = {};

	getCollection<T>(name: string): T[] {
		if (!this.db[name]) {
			this.db[name] = [];
		}
		return this.db[name];
	}
}
