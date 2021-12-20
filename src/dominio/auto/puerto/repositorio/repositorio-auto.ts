import { Auto } from '../../modelo/auto';

export abstract class RepositorioAuto {
  abstract existeAuto(placa: string): Promise<boolean>;
  abstract guardar(auto: Auto);
}
