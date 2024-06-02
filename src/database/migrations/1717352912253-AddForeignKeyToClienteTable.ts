import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeyToClienteTable1717352912253 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "cliente"
            ADD CONSTRAINT "FK_cliente_endereco"
            FOREIGN KEY ("endereco_id")
            REFERENCES "endereco"("endereco_id")
            ON DELETE CASCADE
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "cliente"
            DROP CONSTRAINT "FK_cliente_endereco"
        `);
	}

}
