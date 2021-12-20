import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import {ReservaDto} from 'src/aplicacion/reserva/consulta/dto/reserva.dto'
import { date } from '@hapi/joi';


describe('ServicioRegistrarReserva', () => {

  let servicioRegistrarReserva: ServicioRegistrarReserva;
  let daoReserva: DaoReserva;
  let repositorioReservaStub: SinonStubbedInstance<RepositorioReserva>;
  let daoReservaStub: SinonStubbedInstance<DaoReserva>;
  beforeEach(() => {

    repositorioReservaStub = createStubObj<RepositorioReserva>(['guardar']);
    daoReservaStub = createStubObj<DaoReserva>(['isDisponible'])
    servicioRegistrarReserva = new ServicioRegistrarReserva(repositorioReservaStub, daoReservaStub);
  });

  it('si la reserva ya existe no se puede crear y deberia retonar error', async () => {

    const reserva: ReservaDto = {
      idUsuario: 1,
      idAuto: 1,
      fechaInicio: (new Date("2021-12-22T01:31:59.253Z")),
      fechaEntrega: (new Date("2021-12-24T01:31:59.253Z")),
      valor: 10000
    }
    daoReservaStub.isDisponible.returns(Promise.resolve([
      reserva
    ]))

    await expect(
      servicioRegistrarReserva.ejecutar(
        new Reserva(1,1, (new Date("2021-12-22T01:31:59.253Z")), (new Date("2021-12-24T01:31:59.253Z")), 10000 ),
      ),
    ).rejects.toThrow(`La reserva para el auto con id 1 entre el dia Tue Dec 21 2021 20:31:59 GMT-0500 (Colombia Standard Time) y el dia Thu Dec 23 2021 20:31:59 GMT-0500 (Colombia Standard Time) ya existe`);
  });

  it('si la reserva no existe se puede crear', async () => {

    const reserva: Reserva = new Reserva(1,1, (new Date("2021-12-22T01:31:59.253Z")), (new Date("2021-12-24T01:31:59.253Z")), 10000 );
    daoReservaStub.isDisponible.returns(Promise.resolve([]))

    await servicioRegistrarReserva.ejecutar(reserva);

    expect(repositorioReservaStub.guardar.getCalls().length).toBe(1);
    expect(repositorioReservaStub.guardar.calledWith(reserva)).toBeTruthy();

    });

});
