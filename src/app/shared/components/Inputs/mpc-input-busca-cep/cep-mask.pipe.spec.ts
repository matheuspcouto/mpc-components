import { CepMaskPipe } from './cep-mask.pipe';

describe('CepMaskPipe', () => {
  let pipe: CepMaskPipe;

  beforeEach(() => {
    pipe = new CepMaskPipe();
  });

  it('deve retornar vazio para valor nulo, indefinido ou vazio', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('deve retornar vazio para valor só com caracteres não numéricos', () => {
    expect(pipe.transform('----')).toBe('');
  });

  it('deve aplicar máscara de CEP corretamente', () => {
    expect(pipe.transform('1')).toBe('1');
    expect(pipe.transform('12')).toBe('12');
    expect(pipe.transform('12345')).toBe('12345');
    expect(pipe.transform('123456')).toBe('12345-6');
    expect(pipe.transform('1234567')).toBe('12345-67');
    expect(pipe.transform('12345678')).toBe('12345-678');
    expect(pipe.transform('123456789')).toBe('12345-678'); // Limita a 8 dígitos
  });

  it('deve remover caracteres não numéricos', () => {
    expect(pipe.transform('12.345-678')).toBe('12345-678');
  });
}); 