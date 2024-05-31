import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProdutoTable1717182840334 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		  CREATE TABLE "produto" (
			"produto_id" SERIAL NOT NULL,
			"nome_produto" character varying(50),
			"descricao_produto" character varying(200),
			"preco_produto" numeric,
			"qtd_estoque" integer,
			"data_cadastro_produto" date NOT NULL DEFAULT now(),
			"categoria_id" integer NOT NULL,
			"imagem" text,
			CONSTRAINT "PK_produto_id" PRIMARY KEY ("produto_id")
		  )
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "produto"`);
	}

}
