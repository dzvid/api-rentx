require('dotenv/config');

const connectionSetup = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const devConfig = {
  entities: [
    './src/modules/**/infra/typeorm/entities/*.ts',
    './src/modules/**/entities/*.ts',
  ],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
  ...connectionSetup,
};

const prodConfig = {
  entities: [
    './dist/modules/**/infra/typeorm/entities/*.js',
    './dist/modules/**/entities/*.js',
  ],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: './dist/shared/infra/typeorm/migrations',
  },
  ...connectionSetup,
};

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
