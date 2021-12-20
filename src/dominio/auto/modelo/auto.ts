
export class Auto {
  readonly #placa: string;
  readonly #tipo: string;
  readonly #modelo: number;
  readonly #color: string;
  readonly #precioDia: number;


  constructor(placa: string, tipo: string, modelo: number, color: string, precioDia: number) {
    this.#placa = placa;
    this.#tipo = tipo;
    this.#modelo = modelo;
    this.#color = color;
    this.#precioDia = precioDia;

  }

  get placa(): string {
    return this.#placa;
  }

  get tipo(): string {
    return this.#tipo;
  }

  get modelo(): number {
    return this.#modelo;
  }

  get color(): string {
    return this.#color;
  }

  get precioDia(): number {
    return this.#precioDia;
  }
}
