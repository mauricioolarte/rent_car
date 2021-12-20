import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';
import { ReservaPrecioDiaDto } from 'src/aplicacion/reserva/consulta/dto/reservaPrecioDia.dto';


@Injectable()
export class DaoReservaMysql implements DaoReserva {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<ReservaDto[]> {
    return this.entityManager.query(
      'SELECT r.idusuario, r.idauto, r.fechainicio, r.fechaentrega, r.valor FROM RESERVA r',
    );
  }

  async listarByUsuarioId(id: string): Promise<ReservaDto[]> {
    return this.entityManager.query(
      `SELECT r.idusuario, r.idauto, r.fechainicio, r.fechaentrega, r.valor FROM RESERVA r WHERE r.idusuario=${id} `,
    );
  }

  async isDisponible(id: string, fechIni: string, fechEntr: string): Promise<ReservaDto[]> {

    return await this.entityManager.query(
      `SELECT r.idusuario, r.idauto, r.fechainicio, r.fechaentrega, r.valor FROM RESERVA r WHERE 
    r.idauto=${id} and ((r.fechainicio>=\'${fechIni}\' and r.fechainicio<=\'${fechEntr}\' ) or (r.fechaentrega>=\'${fechIni}\' and r.fechaentrega<=\'${fechEntr}\' ) or (r.fechainicio<=\'${fechIni}\' and r.fechaentrega>=\'${fechEntr}\') )`,
    );
  }
  // and r.fechainicio<=${fechEntr})
  // r.idauto=${id} and or (r.fechaentrega>=${fechIni} and r.fechaentrega<=${fechEntr}) or (r.fechainicio<=${fechIni} and r.fechaentrega>=${fechEntr})

  async precioDia(id: string): Promise<ReservaPrecioDiaDto> {
    return await this.entityManager.query(
      `SELECT DISTINCT(a.precioDia) FROM RESERVA r RIGHT JOIN AUTO a ON a.id=r.idauto WHERE a.id=${id}`
    );
  }
}

// and ((r.fechainicio>=${fechIni} and r.fechaentrega<=${fechEntr}) or (r.fechaentrega>=${fechIni} and r.fechaentrega<=${fechEntr}) or (r.fechainicio<=${fechIni} and r.fechaentrega>=${fechEntr}))