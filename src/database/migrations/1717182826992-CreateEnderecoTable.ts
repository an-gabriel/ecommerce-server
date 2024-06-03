import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnderecoTable1717182826992 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		  CREATE TABLE "endereco" (
			"endereco_id" SERIAL NOT NULL,
			"cep" character varying(9),
			"rua" character varying(100),
			"bairro" character varying(30),
			"cidade" character varying(30),
			"numero" character varying(10),
			"complemento" character varying(100),
			"uf" character varying(2),
			CONSTRAINT "PK_endereco_id" PRIMARY KEY ("endereco_id")
		  )
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "endereco"`);
	}

}
