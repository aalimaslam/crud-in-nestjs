import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin@123',
  database: 'product_order',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: false,
  logging: true,
} as DataSourceOptions);
