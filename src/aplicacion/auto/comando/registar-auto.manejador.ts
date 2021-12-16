import { Injectable } from '@nestjs/common';
import { ServicioRegistrarAuto } from 'src/dominio/auto/servicio/servicio-registrar-auto';
import { ComandoRegistrarAuto } from './registrar-auto.comando';
import { Auto } from 'src/dominio/auto/modelo/auto';

@Injectable()
export class ManejadorRegistrarAuto {
  constructor(private _servicioRegistrarAuto: ServicioRegistrarAuto) {}

  async ejecutar(comandoRegistrarAuto: ComandoRegistrarAuto) {
    await this._servicioRegistrarAuto.ejecutar(
      new Auto(
        comandoRegistrarAuto.tipo,
        comandoRegistrarAuto.modelo,
        comandoRegistrarAuto.color,
      ),
    );
  }
}
