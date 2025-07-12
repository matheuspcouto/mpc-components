import { TestBed } from '@angular/core/testing';
import { Rotas } from '../../enums/rotas-enum';
import { MpcErrorService, ERRO_PADRAO } from './mpc-error.service';

describe('MpcErrorService', () => {
  let service: MpcErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpcErrorService]
    });
    service = TestBed.inject(MpcErrorService);
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
      service.construirErro({ ...erroMock, rotaRetorno: '/teste' });
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
      service.construirErro({ ...erroMock, rotaRetorno: undefined });
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
      service.construirErro({ ...erroMock, rotaRetorno: null });
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
      service.construirErro({ ...erroMock, rotaRetorno: undefined });
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro interno - (Código 500)',
        rotaRetorno: ERRO_PADRAO.rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro for undefined', () => {
      service.construirErro(undefined);
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno: ERRO_PADRAO.rotaRetorno,
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro não possuir propriedade error', () => {
      const erroMock = {
        message: 'Não foi possível realizar a operação, tente novamente e caso o problema persista, entre em contato com o suporte.'
      };
      service.construirErro({ ...erroMock, rotaRetorno: '/teste' });
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno: '/teste',
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro.error for null', () => {
      const erroMock = {
        error: null
      };
      service.construirErro({ ...erroMock, rotaRetorno: '/teste' });
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno: '/teste',
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve retornar ERRO_PADRAO quando erro.error for undefined', () => {
      const erroMock = {
        error: undefined
      };
      service.construirErro({ ...erroMock, rotaRetorno: '/teste' });
      expect(service['erro']()).toEqual({
        ...ERRO_PADRAO,
        rotaRetorno: '/teste',
        imagem: ERRO_PADRAO.imagem
      });
    });

    it('deve construir erro mesmo quando error.message for undefined', () => {
      const erroMock = {
        error: {
          status: 404
        }
      };
      service.construirErro({ ...erroMock, rotaRetorno: '/teste' });
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro desconhecido - (Código 404)',
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
      service.construirErro(erroMock);
      expect(service['erro']()).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro sem status - (Código N/A)',
        rotaRetorno: '/',
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
      service.construirErro({ ...erroMock, rotaRetorno: '/teste' });
      expect(routerMock.navigate).toHaveBeenCalledWith([Rotas.ERROR]);
    });

    it('deve construir erro customizado com todas as propriedades preenchidas', () => {
      const erroCustomizado = {
        titulo: 'Erro customizado',
        mensagem: 'Mensagem customizada',
        rotaRetorno: '/rota-custom',
        imagem: 'custom.png'
      };
      service.construirErro(erroCustomizado);
      expect(service['erro']()).toEqual(erroCustomizado);
    });
  });

  describe('limparErro', () => {
    it('deve limpar o estado do erro', () => {
      // Primeiro, define um erro
      service.construirErro({ error: { message: 'Erro', status: 400 } });
      expect(service['erro']()).not.toBeNull();
      // Agora limpa
      service.limparErro();
      expect(service['erro']()).toBeNull();
    });
  });
});