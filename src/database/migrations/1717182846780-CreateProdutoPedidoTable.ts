import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProdutoPedidoTable1717182846780 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		  CREATE TABLE "produto_pedido" (
			"produto_pedido_id" SERIAL NOT NULL,
			"qtd_produto_pedido" integer,
			"preco_produto_pedido" numeric,
			"produto_id" integer,
			"pedido_id" integer,
			CONSTRAINT "PK_produto_pedido_id" PRIMARY KEY ("produto_pedido_id")
		  )
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "produto_pedido"`);
	}

}
