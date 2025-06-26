import { Inscricao } from './inscricao.model';

describe('Inscricao', () => {
  let inscricao: Inscricao;

  beforeEach(() => {
    inscricao = new Inscricao();
  });

  describe('constructor', () => {
    it('deve criar uma instância vazia', () => {
      expect(inscricao).toBeDefined();
      expect(inscricao.id).toBeUndefined();
      expect(inscricao.nome).toBeUndefined();
    });
  });

  describe('inicializarDadosPessoais', () => {
    it('deve inicializar dados pessoais e retornar a instância', () => {
      const dados = {
        nome: 'joão',
        sobrenome: 'silva',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        idade: 33,
        cpfCnpj: '12345678901'
      };

      const resultado = inscricao.inicializarDadosPessoais(dados);

      expect(resultado).toBe(inscricao);
      expect(inscricao.nome).toBe('joão silva');
      expect(inscricao.dataNasc).toBe('01/01/1990');
      expect(inscricao.sexo).toBe('M');
      expect(inscricao.estadoCivil).toBe('Solteiro');
      expect(inscricao.idade).toBe(33);
      expect(inscricao.cpfCnpj).toBe('123.456.789-01');
    });
  });

  describe('inicializarContato', () => {
    it('deve inicializar dados de contato e retornar a instância', () => {
      const dados = {
        telefone: '11999998888',
        email: 'JOAO@EMAIL.COM',
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567'
      };

      const resultado = inscricao.inicializarContato(dados);

      expect(resultado).toBe(inscricao);
      expect(inscricao.telefone).toBe('(11) 99999-8888');
      expect(inscricao.email).toBe('joao@email.com');
      expect(inscricao.endereco).toBe('Rua das Flores, 123, Centro, São Paulo, SP - CEP: 01234-567');
    });

    it('deve tratar email undefined', () => {
      const dados = { telefone: '11999998888' };
      inscricao.inicializarContato(dados);
      expect(inscricao.email).toBeUndefined();
    });
  });

  describe('inicializarPagamento', () => {
    it('deve inicializar dados de pagamento e retornar a instância', () => {
      const dados = {
        formaPagamento: 'Cartão de Crédito',
        valor: 150.00
      };

      const resultado = inscricao.inicializarPagamento(dados);

      expect(resultado).toBe(inscricao);
      expect(inscricao.formaPagamento).toBe('Cartão de Crédito');
      expect(inscricao.valor).toBe(150.00);
    });

    it('deve usar valor padrão quando não informado', () => {
      const dados = { formaPagamento: 'PIX' };
      inscricao.inicializarPagamento(dados);
      expect(inscricao.valor).toBe(100.00);
    });
  });

  describe('formatarNomeCompleto', () => {
    it('deve formatar nome completo corretamente', () => {
      const resultado = inscricao.formatarNomeCompleto('joão', 'silva santos');
      expect(resultado).toBe('joão silva santos');
    });

    it('deve tratar nome vazio', () => {
      const resultado = inscricao.formatarNomeCompleto('', '');
      expect(resultado).toBe('');
    });

    it('deve tratar apenas nome', () => {
      const resultado = inscricao.formatarNomeCompleto('joão', '');
      expect(resultado).toBe('joão ');
    });

    it('deve tratar apenas sobrenome', () => {
      const resultado = inscricao.formatarNomeCompleto('', 'silva');
      expect(resultado).toBe(' silva');
    });

    it('deve tratar parâmetros undefined', () => {
      const resultado = inscricao.formatarNomeCompleto(undefined, undefined);
      expect(resultado).toBe('');
    });
  });

  describe('formatarDataNascimento', () => {
    it('deve converter data de YYYY-MM-DD para DD/MM/YYYY', () => {
      const resultado = inscricao.formatarDataNascimento('1990-12-25');
      expect(resultado).toBe('25/12/1990');
    });

    it('deve manter data já formatada', () => {
      const resultado = inscricao.formatarDataNascimento('25/12/1990');
      expect(resultado).toBe('25/12/1990');
    });

    it('deve retornar string vazia para data undefined', () => {
      const resultado = inscricao.formatarDataNascimento(undefined);
      expect(resultado).toBe('');
    });

    it('deve usar dataNasc da instância quando parâmetro não informado', () => {
      inscricao.dataNasc = '1985-06-15';
      const resultado = inscricao.formatarDataNascimento();
      expect(resultado).toBe('15/06/1985');
    });

    it('deve retornar string vazia quando não há data na instância', () => {
      const resultado = inscricao.formatarDataNascimento();
      expect(resultado).toBe('');
    });
  });

  describe('formatarCpfCnpj', () => {
    it('deve formatar CPF corretamente', () => {
      const resultado = inscricao.formatarCpfCnpj('12345678901');
      expect(resultado).toBe('123.456.789-01');
    });

    it('deve formatar CNPJ corretamente', () => {
      const resultado = inscricao.formatarCpfCnpj('12345678000195');
      expect(resultado).toBe('12.345.678/0001-95');
    });

    it('deve remover caracteres não numéricos antes de formatar', () => {
      const resultado = inscricao.formatarCpfCnpj('123.456.789-01');
      expect(resultado).toBe('123.456.789-01');
    });

    it('deve retornar valor original para tamanho inválido', () => {
      const resultado = inscricao.formatarCpfCnpj('123456');
      expect(resultado).toBe('123456');
    });

    it('deve retornar string vazia para valor undefined', () => {
      const resultado = inscricao.formatarCpfCnpj(undefined);
      expect(resultado).toBe('');
    });

    it('deve usar cpfCnpj da instância quando parâmetro não informado', () => {
      inscricao.cpfCnpj = '98765432100';
      const resultado = inscricao.formatarCpfCnpj();
      expect(resultado).toBe('987.654.321-00');
    });
  });

  describe('formatarTelefone', () => {
    it('deve formatar telefone fixo corretamente', () => {
      const resultado = inscricao.formatarTelefone('1133334444');
      expect(resultado).toBe('(11) 3333-4444');
    });

    it('deve formatar celular corretamente', () => {
      const resultado = inscricao.formatarTelefone('11999998888');
      expect(resultado).toBe('(11) 99999-8888');
    });

    it('deve remover caracteres não numéricos antes de formatar', () => {
      const resultado = inscricao.formatarTelefone('(11) 99999-8888');
      expect(resultado).toBe('(11) 99999-8888');
    });

    it('deve retornar valor original para tamanho inválido', () => {
      const resultado = inscricao.formatarTelefone('123456');
      expect(resultado).toBe('123456');
    });

    it('deve retornar string vazia para valor undefined', () => {
      const resultado = inscricao.formatarTelefone(undefined);
      expect(resultado).toBe('');
    });

    it('deve usar telefone da instância quando parâmetro não informado', () => {
      inscricao.telefone = '1144445555';
      const resultado = inscricao.formatarTelefone();
      expect(resultado).toBe('(11) 4444-5555');
    });
  });

  describe('formatarEndereco', () => {
    it('deve formatar endereço completo', () => {
      const dados = {
        rua: 'Rua das Flores',
        numero: '123',
        complemento: 'Apto 45',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567'
      };

      const resultado = inscricao.formatarEndereco(dados);
      expect(resultado).toBe('Rua das Flores, 123, Apto 45, Centro, São Paulo, SP - CEP: 01234-567');
    });

    it('deve formatar endereço sem complemento', () => {
      const dados = {
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567'
      };

      const resultado = inscricao.formatarEndereco(dados);
      expect(resultado).toBe('Rua das Flores, 123, Centro, São Paulo, SP - CEP: 01234-567');
    });

    it('deve formatar endereço sem CEP', () => {
      const dados = {
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP'
      };

      const resultado = inscricao.formatarEndereco(dados);
      expect(resultado).toBe('Rua das Flores, 123, Centro, São Paulo, SP');
    });

    it('deve tratar campos vazios', () => {
      const dados = {
        rua: '',
        numero: '123',
        bairro: 'Centro'
      };

      const resultado = inscricao.formatarEndereco(dados);
      expect(resultado).toBe('123, Centro');
    });

    it('deve tratar campos com espaços', () => {
      const dados = {
        rua: '  Rua das Flores  ',
        numero: '  123  ',
        cep: '  01234-567  '
      };

      const resultado = inscricao.formatarEndereco(dados);
      expect(resultado).toBe('Rua das Flores, 123 - CEP: 01234-567');
    });
  });

  describe('obterCpfCnpjNumeros', () => {
    it('deve remover formatação do CPF', () => {
      const resultado = inscricao.obterCpfCnpjNumeros('123.456.789-01');
      expect(resultado).toBe('12345678901');
    });

    it('deve remover formatação do CNPJ', () => {
      const resultado = inscricao.obterCpfCnpjNumeros('12.345.678/0001-95');
      expect(resultado).toBe('12345678000195');
    });

    it('deve retornar string vazia para valor undefined', () => {
      const resultado = inscricao.obterCpfCnpjNumeros(undefined);
      expect(resultado).toBe('');
    });

    it('deve usar cpfCnpj da instância quando parâmetro não informado', () => {
      inscricao.cpfCnpj = '987.654.321-00';
      const resultado = inscricao.obterCpfCnpjNumeros();
      expect(resultado).toBe('98765432100');
    });

    it('deve retornar string vazia quando não há cpfCnpj na instância', () => {
      const resultado = inscricao.obterCpfCnpjNumeros();
      expect(resultado).toBe('');
    });
  });

  describe('obterTelefoneNumeros', () => {
    it('deve remover formatação do telefone', () => {
      const resultado = inscricao.obterTelefoneNumeros('(11) 99999-8888');
      expect(resultado).toBe('11999998888');
    });

    it('deve retornar string vazia para valor undefined', () => {
      const resultado = inscricao.obterTelefoneNumeros(undefined);
      expect(resultado).toBe('');
    });

    it('deve usar telefone da instância quando parâmetro não informado', () => {
      inscricao.telefone = '(11) 4444-5555';
      const resultado = inscricao.obterTelefoneNumeros();
      expect(resultado).toBe('1144445555');
    });

    it('deve retornar string vazia quando não há telefone na instância', () => {
      const resultado = inscricao.obterTelefoneNumeros();
      expect(resultado).toBe('');
    });
  });
});
