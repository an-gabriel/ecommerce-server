import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriaTable1717182773981 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
          CREATE TABLE "categoria" (
            "categoria_id" SERIAL NOT NULL,
            "nome_categoria" character varying(20),
            "descricao_categoria" character varying(200),
            CONSTRAINT "PK_categoria_id" PRIMARY KEY ("categoria_id")
          )
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "categoria"`);
	}
}
