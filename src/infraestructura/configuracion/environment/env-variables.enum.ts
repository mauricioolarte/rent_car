export enum EnvVariables {
  /* DATABASE VARIABLES */
  DATABASE_TYPE = 'mysql',
  DATABASE_PORT = 'localhost',
  DATABASE_HOST = '3306',
  DATABASE_USER = 'app_user',
  DATABASE_PASSWORD = 'XMfdx7T;qW[#',
  DATABASE_NAME = 'rent_car',

  /* TYPEORM VARIABLES */
  TYPEORM_ENTITIES_DIR='dist/**/*.entidad{.ts,.js}',
  TYPEORM_MIGRATIONS_DIR='dist/infraestructura/migraciones/*.js',
  TYPEORM_MIGRATIONS_TABLENAME='migration_history',
  TYPEORMCLI_MIGRATIONS_DIR='src/infraestructura/migraciones',

  /* APP VARIABLES */
  APPLICATION_PORT = 'api',
  APPLICATION_CONTEXT_PATH='3000'
}
