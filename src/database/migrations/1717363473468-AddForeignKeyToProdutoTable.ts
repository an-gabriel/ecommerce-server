import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeyToProdutoTable1717363473468 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "produto"
            ADD CONSTRAINT "FK_produto_categoria"
            FOREIGN KEY ("categoria_id")
            REFERENCES "categoria"("categoria_id")
            ON DELETE CASCADE
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "produto"
            DROP CONSTRAINT "FK_produto_categoria"
        `);
	}

}
