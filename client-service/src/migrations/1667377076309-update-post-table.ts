import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1667377076309 implements MigrationInterface {
    name = 'updatePostTable1667377076309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attribute_value" DROP CONSTRAINT "FK_123ac30d8ade936347e4099cc4a"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "sku_id" character varying`);
        await queryRunner.query(`ALTER TABLE "attribute_value" ADD CONSTRAINT "FK_123ac30d8ade936347e4099cc4a" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "attribute_value" DROP CONSTRAINT "FK_123ac30d8ade936347e4099cc4a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sku_id"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_value" ADD CONSTRAINT "FK_123ac30d8ade936347e4099cc4a" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
