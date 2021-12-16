import { RepositorioReserva } from '../puerto/repositorio/repositorio-reserva';
import { Reserva } from '../modelo/reserva';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarReserva {

  constructor(private readonly _repositorioReserva: RepositorioReserva) {
  }

  async ejecutar(reserva: Reserva) {
    await this._repositorioReserva.guardar(reserva);
  }
}
