import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1667786949025 implements MigrationInterface {
    name = 'updatePostTable1667786949025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "quantity" integer, "productsId" uuid, "userId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "address" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "isEmailConfirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "status" "public"."orders_status_enum", "address" character varying NOT NULL, "phone" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetail" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "total" integer, "orderId" integer, "productId" uuid, CONSTRAINT "PK_39c7d4260520bd85b6fd76f6443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "price" integer NOT NULL, "sku_id" character varying, "picture" character varying NOT NULL, "inventory" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_value" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "productId" uuid, "attributeId" integer, CONSTRAINT "PK_dff76d9cc1db2684732acdb9ca7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_c1f7d0a853be052a2778171717b" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetail" ADD CONSTRAINT "FK_95fef828af9f890d14a37fa528e" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetail" ADD CONSTRAINT "FK_9509923d9c78ad1464e04b164fa" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_value" ADD CONSTRAINT "FK_a9c2e6cb40d213f00a9478949b1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_value" ADD CONSTRAINT "FK_123ac30d8ade936347e4099cc4a" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attribute_value" DROP CONSTRAINT "FK_123ac30d8ade936347e4099cc4a"`);
        await queryRunner.query(`ALTER TABLE "attribute_value" DROP CONSTRAINT "FK_a9c2e6cb40d213f00a9478949b1"`);
        await queryRunner.query(`ALTER TABLE "orderDetail" DROP CONSTRAINT "FK_9509923d9c78ad1464e04b164fa"`);
        await queryRunner.query(`ALTER TABLE "orderDetail" DROP CONSTRAINT "FK_95fef828af9f890d14a37fa528e"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_c1f7d0a853be052a2778171717b"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "attribute_value"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "orderDetail"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
