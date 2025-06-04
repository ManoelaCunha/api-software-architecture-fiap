import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749001689662 implements MigrationInterface {
    name = 'Migration1749001689662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, CONSTRAINT "UQ_413de651cfd9c576b99cec83fd3" UNIQUE ("cpf"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "category" "public"."products_category_enum" NOT NULL, "description" character varying, "imageUrl" character varying, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_products" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "totalProduct" numeric(10,2) NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_3e59f094c2dc3310d585216a813" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('Pendente', 'Recebido', 'Em preparação', 'Pronto', 'Finalizado', 'Cancelado')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "totalOrder" numeric(10,2) NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'Recebido', "payment" boolean NOT NULL DEFAULT false, "pix" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_28b66449cf7cd76444378ad4e92" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_27ca18f2453639a1cafb7404ece" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_27ca18f2453639a1cafb7404ece"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_28b66449cf7cd76444378ad4e92"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
