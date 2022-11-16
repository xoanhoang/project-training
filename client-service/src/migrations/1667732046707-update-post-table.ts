import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1667732046707 implements MigrationInterface {
    name = 'updatePostTable1667732046707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phoneNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
