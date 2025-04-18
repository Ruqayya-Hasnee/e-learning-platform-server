import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursesEnrollmentTable1743400937464 implements MigrationInterface {
    name = 'CoursesEnrollmentTable1743400937464';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.query(`
            CREATE TABLE enroll_course (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                course_id UUID NOT NULL,
                user_id UUID NOT NULL,
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id),
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS enroll_course;`);
    }
}
