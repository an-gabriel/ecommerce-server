import { DataSource, DataSourceOptions } from "typeorm";


export const dataConnection: DataSourceOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "dev-database",
	synchronize: true,
	logging: true,
	entities: [
		"src/modules/**/entity/*.{ts,js}"
	],
	subscribers: [],
	migrations: [
		"src/database/migrations/*.{ts,js}"
	]
}

export const AppDataSource = new DataSource(dataConnection)