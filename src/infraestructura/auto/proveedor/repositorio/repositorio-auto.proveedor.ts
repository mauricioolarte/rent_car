import { RepositorioAuto } from 'src/dominio/auto/puerto/repositorio/repositorio-auto';
import { RepositorioAutoMysql } from 'src/infraestructura/auto/adaptador/repositorio/repositorio-auto-mysql';

export const repositorioAutoProvider = {
  provide: RepositorioAuto,
  useClass: RepositorioAutoMysql,
};
