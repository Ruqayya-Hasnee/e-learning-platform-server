import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { getTypeOrmConfig } from './typeorm.config';
import { ConfigService } from '@nestjs/config';

// Create a new DataSource instance for migrations
export const AppDataSource = new DataSource({
  ...getTypeOrmConfig(new ConfigService()), // Use the TypeORM config
} as DataSourceOptions);
