import { RepositorioAuto } from '../puerto/repositorio/repositorio-auto';
import { Auto } from '../modelo/auto';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarAuto {

  constructor(private readonly _repositorioAuto: RepositorioAuto) {
  }

  async ejecutar(auto: Auto) {
    if (await this._repositorioAuto.existeAuto(auto.placa)) {
      throw new ErrorDeNegocio(
        `El auto ${auto.placa} ya existe`,
      );
    }
    await this._repositorioAuto.guardar(auto);
  }
}
