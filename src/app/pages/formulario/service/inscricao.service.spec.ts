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

  it('deve ser criado e inicializar corretamente', () => {
    expect(service).toBeTruthy();
    expect(service.getDadosInscricao()).toEqual({});
    expect(service.getEtapaAtual()).toBe(1);
  });

  it('deve atualizar e mesclar dados de inscrição', () => {
    service.atualizarDadosInscricao({ nome: 'João' }, 2);
    expect(service.getDadosInscricao()).toEqual({ nome: 'João' });
    expect(service.getEtapaAtual()).toBe(2);
    service.atualizarDadosInscricao({ idade: 30 }, 3);
    expect(service.getDadosInscricao()).toEqual({ nome: 'João', idade: 30 });
    service.atualizarDadosInscricao({ nome: 'Maria' }, 4);
    expect(service.getDadosInscricao().nome).toBe('Maria');
  });

  it('deve listar inscrições (mock)', done => {
    service.listarInscricoes().subscribe(resultado => {
      expect(resultado).toBeDefined();
      done();
    });
  });

  it('deve inscrever com sucesso', done => {
    service.inscrever({ nome: 'João' } as any).subscribe((resultado: any) => {
      expect(resultado).toBeDefined();
      done();
    });
  });

  it('deve validar dados pessoais completos', () => {
    expect(service.isDadosPessoaisCompletos()).toBe(false);
    service.atualizarDadosInscricao({ nome: 'João', dataNasc: '1990-01-01', sexo: 'M', estadoCivil: 'Solteiro', cpfCnpj: '12345678901' }, 1);
    expect(service.isDadosPessoaisCompletos()).toBe(true);
  });

  it('deve validar contato completo', () => {
    expect(service.isContatoCompleto()).toBe(false);
    service.atualizarDadosInscricao({ telefone: '11999999999', email: 'joao@email.com', cep: '12345-678' }, 1);
    expect(service.isContatoCompleto()).toBe(true);
  });

  it('deve validar pagamento completo', () => {
    expect(service.isPagamentoCompleto()).toBe(false);
    service.atualizarDadosInscricao({ formaPagamento: 'Cartão', valor: 100 }, 1);
    expect(service.isPagamentoCompleto()).toBe(true);
  });

  it('deve validar inscrição completa', () => {
    expect(service.isInscricaoCompleta()).toBe(false);
    service.atualizarDadosInscricao({ nome: 'João', dataNasc: '1990-01-01', sexo: 'M', estadoCivil: 'Solteiro', cpfCnpj: '12345678901', telefone: '11999999999', email: 'joao@email.com', cep: '12345-678', formaPagamento: 'Cartão', valor: 100 }, 1);
    expect(service.isInscricaoCompleta()).toBe(true);
  });

  it('deve detalhar inscrição (mock)', done => {
    service.detalharInscricao('123').subscribe(resultado => {
      expect(resultado).toBeDefined();
      done();
    });
  });

  it('deve limpar dados da inscrição', () => {
    service.limparDadosInscricao();
    expect(service.getDadosInscricao()).toEqual({});
  });

  it('deve retornar dados via signal readonly', () => {
    const dadosTeste = { nome: 'João' };
    service.atualizarDadosInscricao(dadosTeste, 2);
    
    expect(service.dadosInscricao()).toEqual(dadosTeste);
    expect(service.etapaAtual()).toBe(2);
  });

  it('deve verificar inscrição completa via computed signal', () => {
    expect(service.inscricaoCompleta()).toBe(false);
    
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
    
    expect(service.inscricaoCompleta()).toBe(true);
  });
});
