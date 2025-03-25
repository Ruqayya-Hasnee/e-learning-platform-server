import { table } from 'console';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoursesTable1742817366042 implements MigrationInterface {
  name = ' CreateCoursesTable1742817366042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`
            CREATE TABLE courses (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                created_by UUID REFERENCES users(id),
                title VARCHAR(100) NOT NULL,
                description VARCHAR(150) UNIQUE NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE courses;`);
  }
}
