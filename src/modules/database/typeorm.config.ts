import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

/**
 * Returns the TypeORM configuration for NestJS
 */
export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'your_username'),
    password: configService.get<string>('DB_PASSWORD', 'your_password'),
    database: configService.get<string>('DB_NAME', 'your_database'),
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')], // Load all entities
    migrations: [join(__dirname, 'migrations/*{.ts,.js}')], // Migration path
    synchronize: false, // Should be false in production
    migrationsRun: true, // Automatically run pending migrations
    ssl: configService.get<boolean>('DB_SSL', false)
      ? { rejectUnauthorized: false }
      : false,
    logging: configService.get<boolean>('DB_LOGGING', true), // Enable logging
  };
}

/**
 * DataSource configuration for running migrations.
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  logging: process.env.DB_LOGGING === 'true',
} as DataSourceOptions);
