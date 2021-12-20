import { Injectable } from '@nestjs/common';
import { RepositorioReserva } from '../puerto/repositorio/repositorio-reserva';
import { Reserva } from '../modelo/reserva';
import { DaoReserva } from '../puerto/dao/dao-reserva';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';


const MIN_DIAS_OBTENER_DESCUENTO = 5;
const DESCUENTO_MAS_5_DIAS = 0.05;
const DESCUENTO_ENTRESEMANA = 0.08;
const MILISEGNDOS_DIA = 86400000;
const DIA_LUNES = 1;
const DIA_MARTES = 2;
const DIA_MIERCOLES = 3;


@Injectable()
export class ServicioRegistrarReserva {

  constructor(private _repositorioReserva: RepositorioReserva, private _daoReserva: DaoReserva ) {
  }


  async ejecutar(reserva: Reserva) {

    const diasDescuentoEntreseman = [DIA_LUNES,DIA_MARTES,DIA_MIERCOLES];

    const fechIni:Date = new Date(reserva.fechaInicio);
    const stringFechIni = `${fechIni.getFullYear()}-${fechIni.getMonth() + 1}-${fechIni.getDate() + 1}`;

    const fechFin:Date = new Date(reserva.fechaEntrega);
    const stringFechFin = `${fechFin.getFullYear()}-${fechFin.getMonth() + 1}-${fechFin.getDate() + 1}`;
   
    if ((await this._daoReserva.isDisponible(String(reserva.idAuto), stringFechIni, stringFechFin))?.length ){
      throw new ErrorDeNegocio(
        `La reserva para el auto con id ${reserva.idAuto} entre el dia ${reserva.fechaInicio} y el dia ${reserva.fechaEntrega} ya existe`,
        );

    }
    const numeroDias:number = (fechFin.getTime() - fechIni.getTime())/MILISEGNDOS_DIA;
    let descuentoSemanal: number = numeroDias > MIN_DIAS_OBTENER_DESCUENTO? DESCUENTO_MAS_5_DIAS:0;

    let descuentoEntreSemana: number = diasDescuentoEntreseman.includes(fechIni.getDay())? DESCUENTO_ENTRESEMANA:0;
    let descuento:number = reserva.valor * Math.max(descuentoEntreSemana, descuentoSemanal);
    let newValor:number = reserva.valor - descuento;
    reserva.valor = newValor;

    return this._repositorioReserva.guardar(reserva);
  }

}
