import { RepositorioAuto } from 'src/dominio/auto/puerto/repositorio/repositorio-auto';
import { Auto } from 'src/dominio/auto/modelo/auto';
import { InjectRepository } from '@nestjs/typeorm';
import { AutoEntidad } from '../../entidad/auto.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioAutoMysql implements RepositorioAuto {
  constructor(
    @InjectRepository(AutoEntidad)
    private readonly repositorio: Repository<AutoEntidad>,
  ) {}

  // async existeNombreUsuario(nombre: string): Promise<boolean> {
  //   return (await this.repositorio.count({ nombre })) > 0;
  // }

  async guardar(auto: Auto) {
    const entidad = new AutoEntidad();
    entidad.tipo = auto.tipo;
    entidad.modelo = auto.modelo;
    entidad.color = auto.color;
    await this.repositorio.save(entidad);
  }
}
