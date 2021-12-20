import { Injectable } from '@nestjs/common';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { ComandoRegistrarReserva } from './registrar-reserva.comando';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';


@Injectable()
export class ManejadorRegistrarReserva {
  constructor(private _servicioRegistrarReserva: ServicioRegistrarReserva,
    ) {}

  async ejecutar(comandoRegistrarReserva: ComandoRegistrarReserva) {
    await this._servicioRegistrarReserva.ejecutar(
      new Reserva(
        comandoRegistrarReserva.idUsuario,
        comandoRegistrarReserva.idAuto,
        comandoRegistrarReserva.fechaInicio,
        comandoRegistrarReserva.fechaEntrega,
        comandoRegistrarReserva.valor,
      ),
    );
  }
}
