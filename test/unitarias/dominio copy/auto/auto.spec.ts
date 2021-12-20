import { Auto } from 'src/dominio/auto/modelo/auto';

describe('Auto', () => {

  const _Auto = Auto as any;

  it('crea un auto', () => {
    const auto = new _Auto('ABC123', 'Suv', 2021, "blanco", 20000);

    expect(auto.placa).toEqual('ABC123');
    expect(auto.tipo).toEqual('Suv');
    expect(auto.modelo).toEqual(2021);
    expect(auto.color).toEqual('blanco');
    expect(auto.precioDia).toEqual(20000);
    
  });
});
