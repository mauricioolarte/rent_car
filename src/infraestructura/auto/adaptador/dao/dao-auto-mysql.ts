import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoAuto } from 'src/dominio/auto/puerto/dao/dao-auto';
import { AutoDto } from 'src/aplicacion/auto/consulta/dto/auto.dto';

@Injectable()
export class DaoAutoMysql implements DaoAuto {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<AutoDto[]> {
    return this.entityManager.query(
      'SELECT a.id, a.placa, a.tipo, a.modelo, a.color, a.precioDia FROM AUTO a',
    );
  }

  async listarById(id:string): Promise<AutoDto> {
    return this.entityManager.query(
      `SELECT a.id, a.placa, a.tipo, a.modelo, a.color, a.precioDia FROM AUTO a where a.id = ${id}`,
    );
  }
}
