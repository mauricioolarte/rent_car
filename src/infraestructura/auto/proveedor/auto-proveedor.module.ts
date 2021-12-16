import { Module } from '@nestjs/common';
import { ServicioRegistrarAuto } from 'src/dominio/auto/servicio/servicio-registrar-auto';
import { RepositorioAuto } from 'src/dominio/auto/puerto/repositorio/repositorio-auto';
import { servicioRegistrarAutoProveedor } from './servicio/servicio-registrar-auto.proveedor';
import { repositorioAutoProvider } from './repositorio/repositorio-auto.proveedor';
import { daoAutoProvider } from './dao/dao-auto.proveedor';
import { ManejadorRegistrarAuto } from 'src/aplicacion/auto/comando/registar-auto.manejador';
import { ManejadorListarAuto } from 'src/aplicacion/auto/consulta/listar-autos.manejador';
import { DaoAuto } from 'src/dominio/auto/puerto/dao/dao-auto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoEntidad } from '../entidad/auto.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([AutoEntidad])],
  providers: [
    { provide: ServicioRegistrarAuto, inject: [RepositorioAuto], useFactory: servicioRegistrarAutoProveedor },
    repositorioAutoProvider,
    daoAutoProvider,
    ManejadorRegistrarAuto,
    ManejadorListarAuto,
  ],
  exports: [
    ServicioRegistrarAuto,
    ManejadorRegistrarAuto,
    ManejadorListarAuto,
    RepositorioAuto,
    DaoAuto,
  ],
})
export class AutoProveedorModule {

}
