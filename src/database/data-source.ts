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
		"./dist/src/modules/**/entity/*.{ts,js}"
	],
	subscribers: [],
	migrations: [
		"./dist/src/database/migrations/*.{ts,js}"
	]
}

export const AppDataSource = new DataSource(dataConnection)