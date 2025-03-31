import { MigrationInterface, QueryRunner } from "typeorm";

export class CoursesEnrollmentTable1743400937464 implements MigrationInterface {
    name = 'CoursesEnrollmentTable1743400937464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.query(`
            CREATE TABLE enrollCourse (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                courseId UUID NOT NULL,
                userId UUID NOT NULL,
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_course FOREIGN KEY (courseId) REFERENCES courses(id),
                CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE enrollCourse;`);
    }

}
