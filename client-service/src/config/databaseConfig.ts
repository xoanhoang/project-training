import { DataSource, DataSourceOptions } from "typeorm";

 export const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'training-be', 
    synchronize: true,
    schema: 'public',

  entities: ['dist/**/*.entity{.ts,.js}'],

  subscribers: ['dist/**/*.subscriber{.ts,.js}'],

  migrationsTableName: 'migrations',

  migrations: ['dist/migrations/*.js'], 


}

const AppDataSource = new DataSource(databaseConfig);
export default AppDataSource;

