import { DaoAuto } from 'src/dominio/auto/puerto/dao/dao-auto';
import { DaoAutoMysql } from 'src/infraestructura/auto/adaptador/dao/dao-auto-mysql';

export const daoAutoProvider = {
  provide: DaoAuto,
  useClass: DaoAutoMysql,
};
