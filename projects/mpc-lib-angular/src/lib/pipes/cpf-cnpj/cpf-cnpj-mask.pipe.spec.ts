import { CpfCnpjMaskPipe } from './cpf-cnpj-mask.pipe';

describe('CpfCnpjMaskPipe', () => {
  let pipe: CpfCnpjMaskPipe;

  beforeEach(() => {
    pipe = new CpfCnpjMaskPipe();
  });

  it('deve retornar vazio para valor nulo ou indefinido', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('deve aplicar máscara de CPF corretamente', () => {
    expect(pipe.transform('1')).toBe('1');
    expect(pipe.transform('12')).toBe('12');
    expect(pipe.transform('123')).toBe('123');
    expect(pipe.transform('1234')).toBe('123.4');
    expect(pipe.transform('12345')).toBe('123.45');
    expect(pipe.transform('123456')).toBe('123.456');
    expect(pipe.transform('1234567')).toBe('123.456.7');
    expect(pipe.transform('12345678')).toBe('123.456.78');
    expect(pipe.transform('123456789')).toBe('123.456.789');
    expect(pipe.transform('1234567890')).toBe('123.456.789-0');
    expect(pipe.transform('12345678901')).toBe('123.456.789-01');
  });

  it('deve aplicar máscara de CNPJ corretamente', () => {
    expect(pipe.transform('12345678901234')).toBe('12.345.678/9012-34');
    expect(pipe.transform('1234567890123456')).toBe('12.345.678/9012-34'); // Limita a 14 dígitos
  });

  it('deve remover caracteres não numéricos', () => {
    expect(pipe.transform('123.456.789-01')).toBe('123.456.789-01');
    expect(pipe.transform('12.345.678/9012-34')).toBe('12.345.678/9012-34');
  });
}); 