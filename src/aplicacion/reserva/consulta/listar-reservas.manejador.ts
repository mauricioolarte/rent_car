import { Injectable } from '@nestjs/common';

import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';

@Injectable()
export class ManejadorListarReserva {
  constructor(private _daoReserva: DaoReserva) {}

  async ejecutar(): Promise<ReservaDto[]> {
    return this._daoReserva.listar();
  }
  async ejecutarById(id:string): Promise<ReservaDto[]> {
    return this._daoReserva.listarByUsuarioId(id);
  }
}
