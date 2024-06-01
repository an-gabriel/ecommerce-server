import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "dev-database",
	synchronize: true,
	logging: true,
	entities: [
		"src/modules/**/entity/**/*.ts"
	],
	subscribers: [],
	migrations: [
		"src/database/migrations/*.ts"
	]
})