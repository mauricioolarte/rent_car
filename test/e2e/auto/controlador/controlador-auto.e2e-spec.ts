import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioAuto } from 'src/dominio/auto/puerto/repositorio/repositorio-auto';
import { DaoAuto } from 'src/dominio/auto/puerto/dao/dao-auto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AutoControlador } from 'src/infraestructura/auto/controlador/auto.controlador';
import { ServicioRegistrarAuto } from 'src/dominio/auto/servicio/servicio-registrar-auto';
import { servicioRegistrarAutoProveedor } from 'src/infraestructura/auto/proveedor/servicio/servicio-registrar-auto.proveedor';
import { ManejadorRegistrarAuto } from 'src/aplicacion/auto/comando/registar-auto.manejador';
import { ManejadorListarAuto } from 'src/aplicacion/auto/consulta/listar-autos.manejador';
import { ComandoRegistrarAuto } from 'src/aplicacion/auto/comando/registrar-auto.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de autos', () => {

  let app: INestApplication;
  let repositorioAuto: SinonStubbedInstance<RepositorioAuto>;
  let daoAuto: SinonStubbedInstance<DaoAuto>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioAuto = createStubObj<RepositorioAuto>(['existeAuto', 'guardar'], sinonSandbox);
    daoAuto = createStubObj<DaoAuto>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [AutoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarAuto,
          inject: [RepositorioAuto],
          useFactory: servicioRegistrarAutoProveedor,
        },
        { provide: RepositorioAuto, useValue: repositorioAuto },
        { provide: DaoAuto, useValue: daoAuto },
        ManejadorRegistrarAuto,
        ManejadorListarAuto,
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

  it('debería listar los autos registrados', () => {

    const autos: any[] = [{
      placa: "ABC123",
      tipo: "Suv",
      modelo: 2021,
      color: "blanco",
      precioDia: 20000
    }];
    daoAuto.listar.returns(Promise.resolve(autos));

    return request(app.getHttpServer())
      .get('/autos')
      .expect(HttpStatus.OK)
      .expect(autos);
  });


  it('debería fallar al registar un auto ya existente', async () => {
    const auto: ComandoRegistrarAuto = {
      placa: "ABC123",
      tipo: "Suv",
      modelo: 2021,
      color: "blanco",
      precioDia: 20000
    };
    const mensaje = `El auto ${auto.placa} ya existe`;
    repositorioAuto.existeAuto.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/autos').send(auto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
