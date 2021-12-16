import { Reserva } from '../../modelo/reserva';

export abstract class RepositorioReserva {
  abstract async guardar(reserva: Reserva);
}
