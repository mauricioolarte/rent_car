import { Auto } from '../../modelo/auto';

export abstract class RepositorioAuto {
  abstract async guardar(auto: Auto);
}
