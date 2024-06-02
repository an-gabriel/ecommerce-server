import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeyToPedidoTable1717349108914 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD CONSTRAINT "FK_pedido_cliente"
            FOREIGN KEY ("cliente_id")
            REFERENCES "cliente"("cliente_id")
            ON DELETE CASCADE
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "pedido"
            DROP CONSTRAINT "FK_pedido_cliente"
        `);
	}

}
