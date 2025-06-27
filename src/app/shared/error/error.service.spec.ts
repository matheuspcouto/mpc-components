import { TestBed } from '@angular/core/testing';
import { ErrorService, ERRO_PADRAO } from './error.service';
import { Rotas } from '../enums/rotas-enum';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService]
    });
    service = TestBed.inject(ErrorService);
  });

  describe('Inicialização do serviço', () => {
    it('deve ser criado', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('ERRO_PADRAO', () => {
    it('deve ter as propriedades corretas definidas', () => {
      expect(ERRO_PADRAO).toEqual({
        titulo: "Ops, algo deu errado!",
        mensagem: "Não foi possível realizar a operação, tente novamente e caso o problema persista, entre em contato com o suporte.",
        rotaRetorno: Rotas.HOME,
        imagem: "assets/img/modal/error.png"
      });
    });
  });

  describe('construirErro', () => {
    let routerMock: any;
    beforeEach(() => {
      routerMock = { navigate: jest.fn() };
      (service as any).router = routerMock;
    });

    it('deve retornar erro customizado quando o erro possui propriedade error com message e status', () => {
      const erroMock = {
        error: {
          message: 'Erro de validação',
          status: 400
        }
      };
      const rotaRetorno = '/teste';
      service.construirErro(erroMock, rotaRetorno);
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro de validação - (Código 400)',
        rotaRetorno: '/teste',
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve usar rota padrão quando rotaRetorno não for fornecida', () => {
      const erroMock = {
        error: {
          message: 'Erro interno',
          status: 500
        }
      };
      service.construirErro(erroMock, '');
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro interno - (Código 500)',
        rotaRetorno: ERRO_PADRAO.rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve usar rota padrão quando rotaRetorno for null', () => {
      const erroMock = {
        error: {
          message: 'Erro interno',
          status: 500
        }
      };
      service.construirErro(erroMock, null as any);
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro interno - (Código 500)',
        rotaRetorno: ERRO_PADRAO.rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve usar rota padrão quando rotaRetorno for undefined', () => {
      const erroMock = {
        error: {
          message: 'Erro interno',
          status: 500
        }
      };
      service.construirErro(erroMock, undefined as any);
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro interno - (Código 500)',
        rotaRetorno: ERRO_PADRAO.rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro for null', () => {
      const rotaRetorno = '/teste';
      service.construirErro(null, rotaRetorno);
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro for undefined', () => {
      const rotaRetorno = '/teste';
      service.construirErro(undefined, rotaRetorno);
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro não possuir propriedade error', () => {
      const erroMock = {
        message: 'Erro sem propriedade error'
      };
      const rotaRetorno = '/teste';
      service.construirErro(erroMock, rotaRetorno);
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro.error for null', () => {
      const erroMock = {
        error: null
      };
      const rotaRetorno = '/teste';
      service.construirErro(erroMock, rotaRetorno);
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro.error for undefined', () => {
      const erroMock = {
        error: undefined
      };
      const rotaRetorno = '/teste';
      service.construirErro(erroMock, rotaRetorno);
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve construir erro mesmo quando error.message for undefined', () => {
      const erroMock = {
        error: {
          status: 404
        }
      };
      const rotaRetorno = '/teste';
      service.construirErro(erroMock, rotaRetorno);
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'undefined - (Código 404)',
        rotaRetorno: '/teste',
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve construir erro mesmo quando error.status for undefined', () => {
      const erroMock = {
        error: {
          message: 'Erro sem status'
        }
      };
      const rotaRetorno = '/teste';
      service.construirErro(erroMock, rotaRetorno);
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro sem status - (Código undefined)',
        rotaRetorno: '/teste',
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve navegar para a rota de erro ao construir um erro', () => {
      const erroMock = {
        error: {
          message: 'Erro de navegação',
          status: 500
        }
      };
      service.construirErro(erroMock, '/teste');
      expect(routerMock.navigate).toHaveBeenCalledWith([Rotas.ERROR]);
    });
  });

  describe('limparErro', () => {
    it('deve limpar o estado do erro', () => {
      // Primeiro, define um erro
      service.construirErro({ error: { message: 'Erro', status: 400 } }, '/teste');
      expect(service['erro']()).not.toBeNull();
      // Agora limpa
      service.limparErro();
      expect(service['erro']()).toBeNull();
    });
  });
});
