import { Module } from '@nestjs/common';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { servicioRegistrarReservaProveedor } from './servicio/servicio-registrar-reserva.proveedor';
import { repositorioReservaProvider } from './repositorio/repositorio-reserva.proveedor';
import { daoReservaProvider } from './dao/dao-reserva.proveedor';
import { ManejadorRegistrarReserva } from 'src/aplicacion/reserva/comando/registar-reserva.manejador';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reservas.manejador';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntidad } from '../entidad/reserva.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntidad])],
  providers: [
    { provide: ServicioRegistrarReserva, inject: [RepositorioReserva, DaoReserva], useFactory: servicioRegistrarReservaProveedor },
    repositorioReservaProvider,
    daoReservaProvider,
    ManejadorRegistrarReserva,
    ManejadorListarReserva,
  ],
  exports: [
    ServicioRegistrarReserva,
    ManejadorRegistrarReserva,
    ManejadorListarReserva,
    RepositorioReserva,
    DaoReserva,
  ],
})
export class ReservaProveedorModule {

}
