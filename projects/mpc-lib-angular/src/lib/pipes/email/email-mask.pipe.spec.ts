import { EmailMaskPipe } from './email-mask.pipe';

describe('EmailMaskPipe', () => {
  let pipe: EmailMaskPipe;

  beforeEach(() => {
    pipe = new EmailMaskPipe();
  });

  it('deve retornar vazio para valor nulo, indefinido ou vazio', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('deve formatar email simples corretamente', () => {
    expect(pipe.transform('USUARIO@EXEMPLO.COM')).toBe('usuario@exemplo.com');
    expect(pipe.transform(' usuario@exemplo.com ')).toBe('usuario@exemplo.com');
  });

  it('deve remover caracteres inválidos', () => {
    expect(pipe.transform('us!ua#rio@exem$plo.com')).toBe('usuario@exemplo.com');
  });

  it('deve tratar email sem @', () => {
    expect(pipe.transform('usuario.exemplo')).toBe('usuario.exemplo');
  });

  it('deve tratar email com múltiplos @', () => {
    expect(pipe.transform('a@b@c@d')).toBe('a@bcd');
  });

  it('deve limitar parte local e domínio', () => {
    const local = 'a'.repeat(70);
    const dominio = 'b'.repeat(260);
    const email = `${local}@${dominio}`;
    const result = pipe.transform(email);
    expect(result.split('@')[0].length).toBeLessThanOrEqual(64);
    expect(result.split('@')[1].length).toBeLessThanOrEqual(253);
  });

  it('deve remover pontos consecutivos, início e fim', () => {
    expect(pipe.transform('..usuario..@..exemplo..com..')).toBe('usuario@exemplo.com');
  });

  it('deve retornar parte local com @ se domínio vazio', () => {
    expect(pipe.transform('usuario@')).toBe('usuario@');
  });

  it('não deve retornar parte local se @ for o primeiro caractere', () => {
    expect(pipe.transform('@usuario')).toBe('@usuario');
  });

  it('não deve retornar parte local se @ for o último caractere', () => {
    expect(pipe.transform('usuario@')).toBe('usuario@');
  });

  it('não deve retornar parte local se @ for o último caractere', () => {
    expect(pipe.transform('@')).toBe('');
  });
}); 