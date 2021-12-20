
export class Reserva {
  readonly #idUsuario: number;
  readonly #idAuto: number;
  readonly #fechaInicio: Date;
  readonly #fechaEntrega: Date;
  #valor: number;


  constructor(idUsuario: number, idAuto: number, fechaInicio: Date, fechaEntrega: Date, valor: number) {
    this.#idUsuario = idUsuario;
    this.#idAuto = idAuto;
    this.#fechaInicio = fechaInicio;
    this.#fechaEntrega = fechaEntrega;
    this.#valor = valor;

  }

  get idUsuario(): number {
    return this.#idUsuario;
  }

  get idAuto(): number {
    return this.#idAuto;
  }

  get fechaInicio(): Date {
    return this.#fechaInicio;
  }

  get fechaEntrega(): Date {
    return this.#fechaEntrega;
  }

  get valor(): number {
    return this.#valor;
  }

  set valor(newValor: number){
      this.#valor = newValor
  }
}
