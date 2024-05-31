import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePedidoTable1717182834035 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		  CREATE TABLE "pedido" (
			"pedido_id" SERIAL NOT NULL,
			"numero_pedido" integer,
			"valor_total_pedido" numeric,
			"data_pedido" date NOT NULL DEFAULT now(),
			"status" boolean,
			"cliente_id" integer NOT NULL,
			CONSTRAINT "PK_pedido_id" PRIMARY KEY ("pedido_id")
		  )
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "pedido"`);
	}

}
