import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';
import { ReservaPrecioDiaDto } from 'src/aplicacion/reserva/consulta/dto/reservaPrecioDia.dto';

export abstract class DaoReserva {
  abstract async listar(): Promise<ReservaDto[]>;
  abstract async listarByUsuarioId(id:string): Promise<ReservaDto[]>;
  abstract async isDisponible(id:string, fechIni:string, fechEntr:string): Promise<ReservaDto[]>;
  abstract async precioDia(id:string): Promise<ReservaPrecioDiaDto>;


}
