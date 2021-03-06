import { AutoDto } from 'src/aplicacion/auto/consulta/dto/auto.dto';

export abstract class DaoAuto {
  abstract async listar(): Promise<AutoDto[]>;
  abstract async listarById(id:string): Promise<AutoDto>;

}
