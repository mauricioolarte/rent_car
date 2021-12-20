import { Injectable } from '@nestjs/common';

import { DaoAuto } from 'src/dominio/auto/puerto/dao/dao-auto';
import { AutoDto } from 'src/aplicacion/auto/consulta/dto/auto.dto';

@Injectable()
export class ManejadorListarAuto {
  constructor(private _daoAuto: DaoAuto) {}

  async ejecutar(): Promise<AutoDto[]> {
    return this._daoAuto.listar();
  }

  async ejecutarById(id:string): Promise<AutoDto> {
    return this._daoAuto.listarById(id);
  }
}
