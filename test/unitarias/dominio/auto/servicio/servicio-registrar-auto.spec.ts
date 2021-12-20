import { ServicioRegistrarAuto } from 'src/dominio/auto/servicio/servicio-registrar-auto';
import { Auto } from 'src/dominio/auto/modelo/auto';
import { RepositorioAuto } from 'src/dominio/auto/puerto/repositorio/repositorio-auto';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioRegistrarAuto', () => {

  let servicioRegistrarAuto: ServicioRegistrarAuto;
  let repositorioAutoStub: SinonStubbedInstance<RepositorioAuto>;

  beforeEach(() => {

    repositorioAutoStub = createStubObj<RepositorioAuto>(['existeAuto', 'guardar']);
    servicioRegistrarAuto = new ServicioRegistrarAuto(repositorioAutoStub);
  });

  it('si el nombre de auto ya existe no se puede crear y deberia retonar error', async () => {

    repositorioAutoStub.existeAuto.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarAuto.ejecutar(
        new Auto('ABC123', 'Suv', 2021, "blanco", 20000),
      ),
    ).rejects.toThrow('El auto ABC123 ya existe');
  });

  it('si el nombre no existe guarda el auto el repositorio', async () => {
    const auto = new Auto('ABC123', 'Suv', 2021, "blanco", 20000);
    repositorioAutoStub.existeAuto.returns(Promise.resolve(false));

    await servicioRegistrarAuto.ejecutar(auto);

    expect(repositorioAutoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioAutoStub.guardar.calledWith(auto)).toBeTruthy();
  });
});
