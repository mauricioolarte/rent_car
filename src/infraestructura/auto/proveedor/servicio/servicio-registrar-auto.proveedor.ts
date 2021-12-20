import { RepositorioAuto } from 'src/dominio/auto/puerto/repositorio/repositorio-auto';
import { ServicioRegistrarAuto } from 'src/dominio/auto/servicio/servicio-registrar-auto';

export function servicioRegistrarAutoProveedor(repositorioAuto: RepositorioAuto) {
  return new ServicioRegistrarAuto(repositorioAuto);
}
