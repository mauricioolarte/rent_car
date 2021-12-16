
export class Auto {
  readonly #tipo: string;
  readonly #modelo: number;
  readonly #color: string;

  constructor(tipo: string, modelo: number, color: string) {
    this.#tipo = tipo;
    this.#modelo = modelo;
    this.#color = color;
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
}
