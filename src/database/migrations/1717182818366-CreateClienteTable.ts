import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClienteTable1717182818366 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		  CREATE TABLE "cliente" (
			"cliente_id" SERIAL NOT NULL,
			"email" character varying(50),
			"username" character varying(15),
			"senha" character varying(20),
			"nome" character varying(200),
			"cpf" character varying(11) NOT NULL,
			"telefone" character varying(11),
			"data_nascimento" date,
			"endereco_id" integer NOT NULL,
			CONSTRAINT "UQ_cliente_cpf" UNIQUE ("cpf"),
			CONSTRAINT "PK_cliente_id" PRIMARY KEY ("cliente_id")
		  )
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "cliente"`);
	}

}
