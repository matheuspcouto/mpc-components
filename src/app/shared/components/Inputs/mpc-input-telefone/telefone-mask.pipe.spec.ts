import { TelefoneMaskPipe } from './telefone-mask.pipe';

describe('TelefoneMaskPipe', () => {
  let pipe: TelefoneMaskPipe;

  beforeEach(() => {
    pipe = new TelefoneMaskPipe();
  });

  it('deve retornar vazio para valor nulo, indefinido ou vazio', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('deve retornar vazio para valor só com caracteres não numéricos', () => {
    expect(pipe.transform('----')).toBe('');
  });

  it('deve aplicar máscara de telefone corretamente', () => {
    expect(pipe.transform('1')).toBe('(1');
    expect(pipe.transform('12')).toBe('(12');
    expect(pipe.transform('123')).toBe('(12) 3');
    expect(pipe.transform('1234')).toBe('(12) 34');
    expect(pipe.transform('12345')).toBe('(12) 345');
    expect(pipe.transform('123456')).toBe('(12) 3456');
    expect(pipe.transform('1234567')).toBe('(12) 34567');
    expect(pipe.transform('12345678')).toBe('(12) 34567-8');
    expect(pipe.transform('123456789')).toBe('(12) 34567-89');
    expect(pipe.transform('1234567890')).toBe('(12) 34567-890');
    expect(pipe.transform('12345678901')).toBe('(12) 34567-8901');
    expect(pipe.transform('123456789012')).toBe('(12) 34567-8901'); // Limita a 11 dígitos
  });

  it('deve remover caracteres não numéricos', () => {
    expect(pipe.transform('(12) 34567-8901')).toBe('(12) 34567-8901');
  });
}); 