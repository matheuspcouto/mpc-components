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
      });
    });
  });

  describe('construirErro', () => {
    it('deve retornar erro customizado quando o erro possui propriedade error com message e status', () => {
      // Arrange
      const erroMock = {
        error: {
          message: 'Erro de validação',
          status: 400
        }
      };
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(erroMock, rotaRetorno);

      // Assert
      expect(resultado).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro de validação - (Código 400)',
        rotaRetorno: '/teste'
      });
    });

    it('deve usar rota padrão quando rotaRetorno não for fornecida', () => {
      // Arrange
      const erroMock = {
        error: {
          message: 'Erro interno',
          status: 500
        }
      };

      // Act
      const resultado = service.construirErro(erroMock, '');

      // Assert
      expect(resultado).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro interno - (Código 500)',
        rotaRetorno: ERRO_PADRAO.rotaRetorno
      });
    });

    it('deve usar rota padrão quando rotaRetorno for null', () => {
      // Arrange
      const erroMock = {
        error: {
          message: 'Erro interno',
          status: 500
        }
      };

      // Act
      const resultado = service.construirErro(erroMock, null as any);

      // Assert
      expect(resultado).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro interno - (Código 500)',
        rotaRetorno: ERRO_PADRAO.rotaRetorno
      });
    });

    it('deve usar rota padrão quando rotaRetorno for undefined', () => {
      // Arrange
      const erroMock = {
        error: {
          message: 'Erro interno',
          status: 500
        }
      };

      // Act
      const resultado = service.construirErro(erroMock, undefined as any);

      // Assert
      expect(resultado).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro interno - (Código 500)',
        rotaRetorno: ERRO_PADRAO.rotaRetorno
      });
    });

    it('deve retornar ERRO_PADRAO quando erro for null', () => {
      // Arrange
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(null, rotaRetorno);

      // Assert
      expect(resultado).toEqual(ERRO_PADRAO);
    });

    it('deve retornar ERRO_PADRAO quando erro for undefined', () => {
      // Arrange
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(undefined, rotaRetorno);

      // Assert
      expect(resultado).toEqual(ERRO_PADRAO);
    });

    it('deve retornar ERRO_PADRAO quando erro não possuir propriedade error', () => {
      // Arrange
      const erroMock = {
        message: 'Erro sem propriedade error'
      };
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(erroMock, rotaRetorno);

      // Assert
      expect(resultado).toEqual(ERRO_PADRAO);
    });

    it('deve retornar ERRO_PADRAO quando erro.error for null', () => {
      // Arrange
      const erroMock = {
        error: null
      };
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(erroMock, rotaRetorno);

      // Assert
      expect(resultado).toEqual(ERRO_PADRAO);
    });

    it('deve retornar ERRO_PADRAO quando erro.error for undefined', () => {
      // Arrange
      const erroMock = {
        error: undefined
      };
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(erroMock, rotaRetorno);

      // Assert
      expect(resultado).toEqual(ERRO_PADRAO);
    });

    it('deve construir erro mesmo quando error.message for undefined', () => {
      // Arrange
      const erroMock = {
        error: {
          status: 404
        }
      };
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(erroMock, rotaRetorno);

      // Assert
      expect(resultado).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'undefined - (Código 404)',
        rotaRetorno: '/teste'
      });
    });

    it('deve construir erro mesmo quando error.status for undefined', () => {
      // Arrange
      const erroMock = {
        error: {
          message: 'Erro sem status'
        }
      };
      const rotaRetorno = '/teste';

      // Act
      const resultado = service.construirErro(erroMock, rotaRetorno);

      // Assert
      expect(resultado).toEqual({
        titulo: ERRO_PADRAO.titulo,
        mensagem: 'Erro sem status - (Código undefined)',
        rotaRetorno: '/teste'
      });
    });
  });
});
