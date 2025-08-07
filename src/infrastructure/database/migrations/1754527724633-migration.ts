import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754527724633 implements MigrationInterface {
    name = 'Migration1754527724633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "payment" TO "paymentStatus"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_paymentstatus_enum" AS ENUM('Pendente', 'Aprovado', 'Recusado')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "paymentStatus" "public"."orders_paymentstatus_enum" NOT NULL DEFAULT 'Pendente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."orders_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "paymentStatus" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "paymentStatus" TO "payment"`);
    }

}
