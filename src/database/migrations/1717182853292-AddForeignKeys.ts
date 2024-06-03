import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeys1717182853292 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		  ALTER TABLE "pedido" ADD CONSTRAINT "FK_pedido_cliente_id" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
		  ALTER TABLE "produto" ADD CONSTRAINT "FK_produto_categoria_id" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("categoria_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
		  ALTER TABLE "produto_pedido" ADD CONSTRAINT "FK_produto_pedido_pedido_id" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("pedido_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
		  ALTER TABLE "produto_pedido" ADD CONSTRAINT "FK_produto_pedido_produto_id" FOREIGN KEY ("produto_id") REFERENCES "produto"("produto_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		  ALTER TABLE "produto_pedido" DROP CONSTRAINT "FK_produto_pedido_produto_id";
		  ALTER TABLE "produto_pedido" DROP CONSTRAINT "FK_produto_pedido_pedido_id";
		  ALTER TABLE "produto" DROP CONSTRAINT "FK_produto_categoria_id";
		  ALTER TABLE "pedido" DROP CONSTRAINT "FK_pedido_cliente_id";
		`);
	}

}
