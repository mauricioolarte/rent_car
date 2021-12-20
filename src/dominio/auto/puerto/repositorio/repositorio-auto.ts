import { Auto } from '../../modelo/auto';

export abstract class RepositorioAuto {
  abstract async existeAuto(placa: string): Promise<boolean>;
  abstract async guardar(auto: Auto);
}
