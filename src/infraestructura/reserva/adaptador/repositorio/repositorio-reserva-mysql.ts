import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntidad } from '../../entidad/reserva.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioReservaMysql implements RepositorioReserva {
  constructor(
    @InjectRepository(ReservaEntidad)
    private readonly repositorio: Repository<ReservaEntidad>,
  ) {}

  // async existeNombreUsuario(nombre: string): Promise<boolean> {
  //   return (await this.repositorio.count({ nombre })) > 0;
  // }

  async guardar(reserva: Reserva) {
    const entidad = new ReservaEntidad();
    entidad.idUsuario = reserva.idUsuario;
    entidad.idAuto = reserva.idAuto;
    entidad.fechaInicio = reserva.fechaInicio;
    entidad.fechaEntrega = reserva.fechaEntrega;

    await this.repositorio.save(entidad);
  }
}
