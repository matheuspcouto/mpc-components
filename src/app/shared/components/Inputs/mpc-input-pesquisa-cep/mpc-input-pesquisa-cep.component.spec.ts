import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MpcInputPesquisaCepComponent, Endereco } from './mpc-input-pesquisa-cep.component';

describe('MpcInputPesquisaCepComponent', () => {
  let componente: MpcInputPesquisaCepComponent;
  let fixture: ComponentFixture<MpcInputPesquisaCepComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MpcInputPesquisaCepComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputPesquisaCepComponent);
    componente = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  describe('Inicialização', () => {
    it('deve criar o componente', () => {
      expect(componente).toBeTruthy();
    });

    it('deve inicializar com valores padrão', () => {
      expect(componente.id).toBe('');
      expect(componente.tabIndex).toBe(0);
      expect(componente.ariaLabel).toBe('');
      expect(componente.value).toBeUndefined();
      expect(componente.required).toBe(false);
    });
  });

  describe('Getter valorFormatado', () => {
    it('deve retornar valor formatado através do pipe', () => {
      componente.value = '12345678';
      const valorFormatado = componente.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });
  });

  describe('Eventos de Foco', () => {
    it('deve marcar campo como tocado e validar no onFocus', () => {
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido');
      componente.value = '12345-678';

      componente['onFocus']();

      expect(componente['campoTocado']).toBe(true);
      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
    });
  });

  describe('setValue', () => {
    it('deve definir valor, validar e chamar pesquisarCep quando válido', () => {
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido').mockReturnValue(true);
      const spyPesquisar = jest.spyOn(componente as any, 'pequisarCep');
      const event = { target: { value: '12345-678' } };

      componente['setValue'](event);

      expect(componente.value).toBe('12345-678');
      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
      expect(spyPesquisar).toHaveBeenCalledWith('12345-678');
    });

    it('deve definir valor e validar mas não chamar pesquisarCep quando inválido', () => {
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido').mockReturnValue(false);
      const spyPesquisar = jest.spyOn(componente as any, 'pequisarCep');
      const event = { target: { value: '123' } };

      componente['setValue'](event);

      expect(componente.value).toBe('123');
      expect(spyValidacao).toHaveBeenCalledWith('123');
      expect(spyPesquisar).not.toHaveBeenCalled();
    });
  });

  describe('Validações', () => {
    beforeEach(() => {
      componente['campoTocado'] = true;
    });

    it('deve retornar erro quando campo obrigatório está vazio', () => {
      componente.required = true;
      const spyError = jest.spyOn(componente.error, 'emit');

      const resultado = componente['isCampoValido']('');

      expect(resultado).toBe(false);
      expect(componente['errorMessage']).toBe('O campo CEP é obrigatório');
      expect(spyError).toHaveBeenCalledWith({ required: true });
    });

    it('deve retornar erro quando CEP não atende regex', () => {
      const spyError = jest.spyOn(componente.error, 'emit');

      const resultado = componente['isCampoValido']('123');

      expect(resultado).toBe(false);
      expect(componente['errorMessage']).toBe('O campo CEP deve conter 8 dígitos');
      expect(spyError).toHaveBeenCalledWith({ regex: true });
    });

    it('deve retornar true para CEP válido', () => {
      const spyError = jest.spyOn(componente.error, 'emit');

      const resultado = componente['isCampoValido']('12345-678');

      expect(resultado).toBe(true);
      expect(componente['errorMessage']).toBeUndefined();
      expect(spyError).not.toHaveBeenCalled();
    });
  });

  describe('Validação de Regex', () => {
    it('deve validar regex corretamente', () => {
      expect(componente['validaRegex']('12345-678')).toBe(false); // válido
      expect(componente['validaRegex']('12345678')).toBe(false);  // válido
      expect(componente['validaRegex']('123')).toBe(true);        // inválido
      expect(componente['validaRegex']('abcde-fgh')).toBe(true);  // inválido
      expect(componente['validaRegex'](undefined)).toBe(true);    // inválido
      expect(componente['validaRegex']('')).toBe(true);           // inválido
    });
  });

  describe('Validação de Campo Obrigatório', () => {
    it('deve retornar false quando campo não é obrigatório', () => {
      componente.required = false;
      expect(componente['validaRequired']('')).toBe(false);
      expect(componente['validaRequired']('12345')).toBe(false);
    });

    it('deve retornar true quando campo é obrigatório e está vazio', () => {
      componente.required = true;
      expect(componente['validaRequired']('')).toBe(true);
      expect(componente['validaRequired'](undefined)).toBe(true);
    });

    it('deve retornar true quando campo é obrigatório, tocado e vazio', () => {
      componente.required = true;
      componente['campoTocado'] = true;
      expect(componente['validaRequired']('')).toBe(true);
    });

    it('deve retornar false quando campo é obrigatório mas tem valor', () => {
      componente.required = true;
      componente['campoTocado'] = true;
      expect(componente['validaRequired']('12345')).toBe(false);
    });
  });

  describe('Pesquisa de CEP', () => {
    it('deve pesquisar CEP com sucesso e emitir endereco', () => {
      const spyValor = jest.spyOn(componente.valor, 'emit');
      const mockResponse = {
        logradouro: 'Rua Teste',
        bairro: 'Bairro Teste',
        localidade: 'Cidade Teste',
        estado: 'Estado Teste',
        cep: '12345-678'
      };

      componente['pequisarCep']('12345-678');

      const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const enderecoEsperado: Endereco = {
        rua: 'Rua Teste',
        bairro: 'Bairro Teste',
        cidade: 'Cidade Teste',
        estado: 'Estado Teste',
        cep: '12345-678'
      };

      expect(spyValor).toHaveBeenCalledWith(enderecoEsperado);
    });

    it('deve tratar erro quando CEP não é encontrado na resposta', () => {
      const mockResponse = { erro: true };

      componente['pequisarCep']('12345-678');

      const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
      req.flush(mockResponse);

      expect(componente['errorMessage']).toBe('CEP não encontrado');
    });

    it('deve tratar erro de requisição HTTP', () => {
      componente['pequisarCep']('12345-678');

      const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
      req.error(new ErrorEvent('Erro de rede'));

      expect(componente['errorMessage']).toBe('CEP não encontrado');
    });

    it('deve remover caracteres não numéricos do CEP antes da pesquisa', () => {
      componente['pequisarCep']('12345-678');

      const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
      expect(req.request.url).toContain('12345678');
      req.flush({});
    });

    it('deve retornar early quando CEP é undefined', () => {
      const spyHttp = jest.spyOn(componente['http'], 'get');

      componente['pequisarCep'](undefined);

      expect(spyHttp).not.toHaveBeenCalled();
    });

    it('deve retornar early quando CEP é vazio', () => {
      const spyHttp = jest.spyOn(componente['http'], 'get');

      componente['pequisarCep']('');

      expect(spyHttp).not.toHaveBeenCalled();
    });
  });

  describe('Casos Extremos', () => {
    it('deve lidar com valor undefined no setter de value', () => {
      expect(() => {
        componente.value = undefined;
      }).not.toThrow();
      expect(componente.value).toBeUndefined();
    });

    it('deve lidar com event.target.value undefined no setValue', () => {
      const event = { target: { value: undefined } };
      expect(() => {
        componente['setValue'](event);
      }).not.toThrow();
      expect(componente.value).toBeUndefined();
    });

    it('deve lidar com validação quando campo não foi tocado', () => {
      componente['campoTocado'] = false;
      componente.required = true;

      const resultado = componente['isCampoValido']('');

      expect(resultado).toBe(false);
      expect(componente['errorMessage']).toBe('O campo CEP é obrigatório');
    });
  });
});
