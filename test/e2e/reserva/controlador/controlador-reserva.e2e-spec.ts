import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ReservaControlador } from 'src/infraestructura/reserva/controlador/reserva.controlador';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { servicioRegistrarReservaProveedor } from 'src/infraestructura/reserva/proveedor/servicio/servicio-registrar-reserva.proveedor';
import { ManejadorRegistrarReserva } from 'src/aplicacion/reserva/comando/registar-reserva.manejador';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reservas.manejador';
import { ComandoRegistrarReserva } from 'src/aplicacion/reserva/comando/registrar-reserva.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import {Reserva} from 'src/dominio/reserva/modelo/reserva'
import { resolve } from 'path';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de reservas', () => {

  let app: INestApplication;
  let repositorioReserva: SinonStubbedInstance<RepositorioReserva>;
  let daoReserva: SinonStubbedInstance<DaoReserva>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioReserva = createStubObj<RepositorioReserva>(['guardar'], sinonSandbox);
    daoReserva = createStubObj<DaoReserva>(['listar', 'listarByUsuarioId', 'isDisponible', 'precioDia'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [ReservaControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarReserva,
          inject: [RepositorioReserva, DaoReserva],
          useFactory: servicioRegistrarReservaProveedor,
        },
        { provide: RepositorioReserva, useValue: repositorioReserva },
        { provide: DaoReserva, useValue: daoReserva },
        ManejadorRegistrarReserva,
        ManejadorListarReserva,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar las reservas registradas para un usuario especifico', () => {

    const reservas: any[] = [
      {
        idUsuario: 1,
        idAuto: 1,
        fechaInicio: "2021-12-19T01:31:59.253Z",
        fechaEntrega: "2021-12-20T01:31:59.253Z",
        valor: 10000
      }
    ];
    daoReserva.listarByUsuarioId.returns(Promise.resolve(reservas));

    return request(app.getHttpServer())
      .get('/reservas/1')
      .expect(HttpStatus.OK)
      .expect(reservas);
  });

  it('debería listar las reservas registradas', () => {

    const reservas: any[] = [
      {
        idUsuario: 1,
        idAuto: 1,
        fechaInicio: "2021-12-19T01:31:59.253Z",
        fechaEntrega: "2021-12-20T01:31:59.253Z",
        valor: 10000
      }
    ];
    daoReserva.listar.returns(Promise.resolve(reservas));

    return request(app.getHttpServer())
      .get('/reservas')
      .expect(HttpStatus.OK)
      .expect(reservas);
  });

  it('debería listar las reservas registradas', () => {

    const reservas: any[] = [
      {
        idUsuario: 1,
        idAuto: 1,
        fechaInicio: "2021-12-19T01:31:59.253Z",
        fechaEntrega: "2021-12-20T01:31:59.253Z",
        valor: 10000
      }
    ];
    daoReserva.listar.returns(Promise.resolve(reservas));

    return request(app.getHttpServer())
      .get('/reservas')
      .expect(HttpStatus.OK)
      .expect(reservas);
  });

  
  it('debería crear una nueva reserva', async () => {
    const reserva: ComandoRegistrarReserva = {
      idUsuario: 1,
      idAuto: 1,
      fechaInicio: (new Date("2021-12-22T01:31:59.253Z")),
      fechaEntrega: (new Date("2021-12-24T01:31:59.253Z")),
      valor: 10000
    };
    
    const response = await request(app.getHttpServer())
      .post('/reservas').send(reserva)
      .expect(HttpStatus.CREATED);
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('debería rechasar una reserva que ya existe', async () => {
    const reserva: ComandoRegistrarReserva = {
      idUsuario: 1,
      idAuto: 1,
      fechaInicio: (new Date("2021-12-22T01:31:59.253Z")),
      fechaEntrega: (new Date("2021-12-24T01:31:59.253Z")),
      valor: 10000
    };
    
    daoReserva.isDisponible.returns(Promise.resolve([reserva]));
    const mensaje = `La reserva para el auto con id ${reserva.idAuto} entre el dia ${reserva.fechaInicio.toISOString()} y el dia ${reserva.fechaEntrega.toISOString()} ya existe`;

    const response = await request(app.getHttpServer())
      .post('/reservas').send(reserva)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje)  
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
