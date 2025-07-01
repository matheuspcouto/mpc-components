import { Inscricao } from './inscricao.model';

describe('Inscricao', () => {
  let inscricao: Inscricao;

  beforeEach(() => {
    inscricao = new Inscricao();
  });

  it('deve criar uma instância vazia', () => {
    expect(inscricao).toBeDefined();
    expect(inscricao.id).toBeUndefined();
    expect(inscricao.nome).toBeUndefined();
  });

  it('deve inicializar dados pessoais', () => {
    const dados = { nome: 'joão', sobrenome: 'silva', dataNasc: '1990-01-01', sexo: 'M', estadoCivil: 'Solteiro', idade: 33, cpfCnpj: '12345678901' };
    inscricao.inicializarDadosPessoais(dados);
    expect(inscricao.nome).toBe('joão silva');
    expect(inscricao.dataNasc).toBe('01/01/1990');
    expect(inscricao.cpfCnpj).toBe('123.456.789-01');
  });

  it('deve inicializar dados de contato', () => {
    const dados = { telefone: '11999998888', email: 'JOAO@EMAIL.COM', rua: 'Rua das Flores', numero: '123', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', cep: '01234-567' };
    inscricao.inicializarContato(dados);
    expect(inscricao.telefone).toBe('(11) 99999-8888');
    expect(inscricao.email).toBe('joao@email.com');
    expect(inscricao.endereco).toContain('Rua das Flores');
  });

  it('deve inicializar dados de pagamento', () => {
    const dados = { formaPagamento: 'Cartão de Crédito', valor: 150.00 };
    inscricao.inicializarPagamento(dados);
    expect(inscricao.formaPagamento).toBe('Cartão de Crédito');
    expect(inscricao.valor).toBe(150.00);
  });

  it('deve formatar nome completo corretamente', () => {
    expect(inscricao.formatarNomeCompleto('joão', 'silva santos')).toBe('joão silva santos');
    expect(inscricao.formatarNomeCompleto('', '')).toBe('');
    expect(inscricao.formatarNomeCompleto('joão', '')).toBe('joão ');
    expect(inscricao.formatarNomeCompleto('', 'silva')).toBe(' silva');
    expect(inscricao.formatarNomeCompleto(undefined, undefined)).toBe('');
  });

  it('deve formatar data de nascimento', () => {
    expect(inscricao.formatarDataNascimento('1990-12-25')).toBe('25/12/1990');
    expect(inscricao.formatarDataNascimento('25/12/1990')).toBe('25/12/1990');
    expect(inscricao.formatarDataNascimento(undefined)).toBe('');
    inscricao.dataNasc = '1985-06-15';
    expect(inscricao.formatarDataNascimento()).toBe('15/06/1985');
    inscricao.dataNasc = undefined;
    expect(inscricao.formatarDataNascimento()).toBe('');
  });

  it('deve formatar CPF/CNPJ', () => {
    expect(inscricao.formatarCpfCnpj('12345678901')).toBe('123.456.789-01');
    expect(inscricao.formatarCpfCnpj('12345678000195')).toBe('12.345.678/0001-95');
    expect(inscricao.formatarCpfCnpj('123.456.789-01')).toBe('123.456.789-01');
    expect(inscricao.formatarCpfCnpj('123456')).toBe('123456');
    expect(inscricao.formatarCpfCnpj(undefined)).toBe('');
    inscricao.cpfCnpj = '98765432100';
    expect(inscricao.formatarCpfCnpj()).toBe('987.654.321-00');
  });

  it('deve formatar telefone', () => {
    expect(inscricao.formatarTelefone('1133334444')).toBe('(11) 3333-4444');
    expect(inscricao.formatarTelefone('11999998888')).toBe('(11) 99999-8888');
    expect(inscricao.formatarTelefone('(11) 99999-8888')).toBe('(11) 99999-8888');
    expect(inscricao.formatarTelefone('123456')).toBe('123456');
    expect(inscricao.formatarTelefone(undefined)).toBe('');
    inscricao.telefone = '1144445555';
    expect(inscricao.formatarTelefone()).toBe('(11) 4444-5555');
  });

  it('deve formatar endereço', () => {
    const dados = { rua: 'Rua das Flores', numero: '123', complemento: 'Apto 45', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', cep: '01234-567' };
    expect(inscricao.formatarEndereco(dados)).toContain('Rua das Flores');
    expect(inscricao.formatarEndereco({ rua: '', numero: '123', bairro: 'Centro' })).toContain('123, Centro');
    expect(inscricao.formatarEndereco({ rua: '  Rua das Flores  ', numero: '  123  ', cep: '  01234-567  ' })).toContain('Rua das Flores, 123 - CEP: 01234-567');
  });

  it('deve obter números do CPF/CNPJ', () => {
    expect(inscricao.obterCpfCnpjNumeros('123.456.789-01')).toBe('12345678901');
    expect(inscricao.obterCpfCnpjNumeros('12.345.678/0001-95')).toBe('12345678000195');
    expect(inscricao.obterCpfCnpjNumeros(undefined)).toBe('');
    inscricao.cpfCnpj = '987.654.321-00';
    expect(inscricao.obterCpfCnpjNumeros()).toBe('98765432100');
    inscricao.cpfCnpj = undefined;
    expect(inscricao.obterCpfCnpjNumeros()).toBe('');
  });

  it('deve obter números do telefone', () => {
    expect(inscricao.obterTelefoneNumeros('(11) 99999-8888')).toBe('11999998888');
    expect(inscricao.obterTelefoneNumeros(undefined)).toBe('');
    inscricao.telefone = '(11) 4444-5555';
    expect(inscricao.obterTelefoneNumeros()).toBe('1144445555');
    inscricao.telefone = undefined;
    expect(inscricao.obterTelefoneNumeros()).toBe('');
  });
});
