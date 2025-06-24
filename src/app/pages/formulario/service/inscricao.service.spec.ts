import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InscricaoService } from './inscricao.service';

describe('InscricaoService', () => {
  let service: InscricaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InscricaoService]
    });
    service = TestBed.inject(InscricaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('inicialização', () => {
    it('deve ser criado', () => {
      expect(service).toBeTruthy();
    });

    it('deve inicializar com dados vazios', () => {
      expect(service.getDadosInscricao()).toEqual({});
    });

    it('deve inicializar com etapa 1', () => {
      expect(service.getEtapaAtual()).toBe(1);
    });
  });

  describe('atualizarDadosInscricao', () => {
    it('deve atualizar dados e etapa', () => {
      const novosDados = { nome: 'João' };
      const proximaEtapa = 2;

      service.atualizarDadosInscricao(novosDados, proximaEtapa);

      expect(service.getDadosInscricao()).toEqual(novosDados);
      expect(service.getEtapaAtual()).toBe(proximaEtapa);
    });

    it('deve mesclar dados existentes com novos dados', () => {
      service.atualizarDadosInscricao({ nome: 'João' }, 2);
      service.atualizarDadosInscricao({ idade: 30 }, 3);

      expect(service.getDadosInscricao()).toEqual({ nome: 'João', idade: 30 });
    });

    it('deve sobrescrever dados existentes', () => {
      service.atualizarDadosInscricao({ nome: 'João' }, 2);
      service.atualizarDadosInscricao({ nome: 'Maria' }, 3);

      expect(service.getDadosInscricao().nome).toBe('Maria');
    });
  });

  describe('listarInscricoes', () => {
    it('deve retornar dados mock', (done) => {
      service.listarInscricoes().subscribe(resultado => {
        expect(resultado).toBeDefined();
        done();
      });
    });
  });

  describe('inscrever', () => {
    it('deve retornar sucesso após 2 segundos', (done) => {
      const body = { nome: 'João' };
      const sexo = 'M';

      service.inscrever(body, sexo).subscribe(resultado => {
        expect(resultado.status).toBe('OK');
        expect(resultado.message).toBe('Inscrição realizada com sucesso!');
        done();
      });
    });
  });

  describe('isDadosPessoaisCompletos', () => {
    it('deve retornar false quando dados estão incompletos', () => {
      service.atualizarDadosInscricao({}, 1);
      expect(service.isDadosPessoaisCompletos()).toBe(false);
    });

    it('deve retornar false quando falta nome', () => {
      service.atualizarDadosInscricao({
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        cpfCnpj: '12345678901'
      }, 1);
      expect(service.isDadosPessoaisCompletos()).toBe(false);
    });

    it('deve retornar false quando falta data de nascimento', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        cpfCnpj: '12345678901'
      }, 1);
      expect(service.isDadosPessoaisCompletos()).toBe(false);
    });

    it('deve retornar false quando falta sexo', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        dataNasc: '1990-01-01',
        estadoCivil: 'Solteiro',
        cpfCnpj: '12345678901'
      }, 1);
      expect(service.isDadosPessoaisCompletos()).toBe(false);
    });

    it('deve retornar false quando falta estado civil', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        dataNasc: '1990-01-01',
        sexo: 'M',
        cpfCnpj: '12345678901'
      }, 1);
      expect(service.isDadosPessoaisCompletos()).toBe(false);
    });

    it('deve retornar false quando falta CPF/CNPJ', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro'
      }, 1);
      expect(service.isDadosPessoaisCompletos()).toBe(false);
    });

    it('deve retornar true quando todos os dados estão completos', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        cpfCnpj: '12345678901'
      }, 1);
      expect(service.isDadosPessoaisCompletos()).toBe(true);
    });
  });

  describe('isContatoCompleto', () => {
    it('deve retornar false quando dados estão incompletos', () => {
      service.atualizarDadosInscricao({}, 1);
      expect(service.isContatoCompleto()).toBe(false);
    });

    it('deve retornar false quando falta telefone', () => {
      service.atualizarDadosInscricao({
        email: 'joao@email.com',
        cep: '12345-678'
      }, 1);
      expect(service.isContatoCompleto()).toBe(false);
    });

    it('deve retornar false quando falta email', () => {
      service.atualizarDadosInscricao({
        telefone: '11999999999',
        cep: '12345-678'
      }, 1);
      expect(service.isContatoCompleto()).toBe(false);
    });

    it('deve retornar false quando falta CEP', () => {
      service.atualizarDadosInscricao({
        telefone: '11999999999',
        email: 'joao@email.com'
      }, 1);
      expect(service.isContatoCompleto()).toBe(false);
    });

    it('deve retornar true quando todos os dados estão completos', () => {
      service.atualizarDadosInscricao({
        telefone: '11999999999',
        email: 'joao@email.com',
        cep: '12345-678'
      }, 1);
      expect(service.isContatoCompleto()).toBe(true);
    });
  });

  describe('isPagamentoCompleto', () => {
    it('deve retornar false quando dados estão incompletos', () => {
      service.atualizarDadosInscricao({}, 1);
      expect(service.isPagamentoCompleto()).toBe(false);
    });

    it('deve retornar false quando falta forma de pagamento', () => {
      service.atualizarDadosInscricao({
        valor: 100
      }, 1);
      expect(service.isPagamentoCompleto()).toBe(false);
    });

    it('deve retornar false quando falta valor', () => {
      service.atualizarDadosInscricao({
        formaPagamento: 'Cartão'
      }, 1);
      expect(service.isPagamentoCompleto()).toBe(false);
    });

    it('deve retornar true quando todos os dados estão completos', () => {
      service.atualizarDadosInscricao({
        formaPagamento: 'Cartão',
        valor: 100
      }, 1);
      expect(service.isPagamentoCompleto()).toBe(true);
    });
  });

  describe('isInscricaoCompleta', () => {
    it('deve retornar false quando dados pessoais estão incompletos', () => {
      service.atualizarDadosInscricao({
        telefone: '11999999999',
        email: 'joao@email.com',
        cep: '12345-678',
        formaPagamento: 'Cartão',
        valor: 100
      }, 1);
      expect(service.isInscricaoCompleta()).toBe(false);
    });

    it('deve retornar false quando contato está incompleto', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        cpfCnpj: '12345678901',
        formaPagamento: 'Cartão',
        valor: 100
      }, 1);
      expect(service.isInscricaoCompleta()).toBe(false);
    });

    it('deve retornar false quando pagamento está incompleto', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        cpfCnpj: '12345678901',
        telefone: '11999999999',
        email: 'joao@email.com',
        cep: '12345-678'
      }, 1);
      expect(service.isInscricaoCompleta()).toBe(false);
    });

    it('deve retornar true quando todos os dados estão completos', () => {
      service.atualizarDadosInscricao({
        nome: 'João',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        cpfCnpj: '12345678901',
        telefone: '11999999999',
        email: 'joao@email.com',
        cep: '12345-678',
        formaPagamento: 'Cartão',
        valor: 100
      }, 1);
      expect(service.isInscricaoCompleta()).toBe(true);
    });
  });

  describe('observables', () => {
    it('deve emitir dados atualizados via dadosInscricao$', (done) => {
      const dadosTeste = { nome: 'João' };

      service.dadosInscricao$.subscribe(dados => {
        if (dados.nome) {
          expect(dados).toEqual(dadosTeste);
          done();
        }
      });

      service.atualizarDadosInscricao(dadosTeste, 2);
    });

    it('deve emitir etapa atualizada via etapaAtual$', (done) => {
      service.etapaAtual$.subscribe(etapa => {
        if (etapa === 3) {
          expect(etapa).toBe(3);
          done();
        }
      });

      service.atualizarDadosInscricao({}, 3);
    });
  });
});
