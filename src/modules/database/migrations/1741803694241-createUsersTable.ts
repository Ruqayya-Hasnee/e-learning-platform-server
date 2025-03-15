import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1741803694241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable uuid-ossp extension (required for generating UUIDs)
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create ENUM type for role
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM ('STUDENT', 'INSTRUCTOR');`,
    );

    await queryRunner.query(`
            CREATE TABLE users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                introduction VARCHAR(255) NOT NULL,
                education VARCHAR(255) NOT NULL,
                achievements TEXT[] NOT NULL,
                role "user_role_enum" NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
    await queryRunner.query(`DROP TYPE "user_role_enum";`);
  }
}
