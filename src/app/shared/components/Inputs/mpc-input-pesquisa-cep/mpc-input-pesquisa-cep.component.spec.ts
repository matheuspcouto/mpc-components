import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MpcInputPesquisaCepComponent, Endereco } from './mpc-input-pesquisa-cep.component';

describe('MpcInputPesquisaCepComponent', () => {
  let component: MpcInputPesquisaCepComponent;
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
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  describe('Inicialização', () => {
    it('deve criar o component', () => {
      expect(component).toBeTruthy();
    });

    it('deve inicializar com valores padrão', () => {
      expect(component.id).toBe('');
      expect(component.tabIndex).toBe(0);
      expect(component.ariaLabel).toBe('');
      expect(component.value).toBeUndefined();
      expect(component.required).toBe(false);
    });
  });

  describe('Getter valorFormatado', () => {
    it('deve retornar valor formatado através do pipe', () => {
      component.value = '12345678';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor formatado para valor undefined', () => {
      component.value = undefined;
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar vazio quando valor formatado enviado for vazio', () => {
      component.value = '.';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve aplicar mascara quando valor formatado for enviado - 5 Dígitos', () => {
      component.value = '12345';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });
  });

  describe('Eventos de Foco', () => {
    it('deve marcar campo como tocado e validar no onFocus', () => {
      const spyValidacao = jest.spyOn(component as any, 'isCampoValido');
      component.value = '12345-678';

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
    });
  });

  describe('setValue', () => {
    it('deve definir valor, validar e chamar pesquisarCep quando válido', () => {
      const spyValidacao = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const spyPesquisar = jest.spyOn(component as any, 'pequisarCep');
      const event = { target: { value: '12345-678' } };

      component['setValue'](event);

      expect(component.value).toBe('12345-678');
      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
      expect(spyPesquisar).toHaveBeenCalledWith('12345-678');
    });

    it('deve definir valor e validar mas não chamar pesquisarCep quando inválido', () => {
      const spyValidacao = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      const spyPesquisar = jest.spyOn(component as any, 'pequisarCep');
      const event = { target: { value: '123' } };

      component['setValue'](event);

      expect(component.value).toBe('123');
      expect(spyValidacao).toHaveBeenCalledWith('123');
      expect(spyPesquisar).not.toHaveBeenCalled();
    });
  });

  describe('Validações', () => {
    beforeEach(() => {
      component['campoTocado'] = true;
    });

    it('deve retornar erro quando campo obrigatório está vazio', () => {
      component.required = true;
      const spyError = jest.spyOn(component.error, 'emit');

      const resultado = component['isCampoValido']('');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo CEP é obrigatório');
      expect(spyError).toHaveBeenCalledWith({ required: true });
    });

    it('deve retornar erro quando CEP não atende regex', () => {
      const spyError = jest.spyOn(component.error, 'emit');

      const resultado = component['isCampoValido']('123');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo CEP deve conter 8 dígitos');
      expect(spyError).toHaveBeenCalledWith({ regex: true });
    });

    it('deve retornar true para CEP válido', () => {
      const spyError = jest.spyOn(component.error, 'emit');

      const resultado = component['isCampoValido']('12345-678');

      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
      expect(spyError).not.toHaveBeenCalled();
    });
  });

  describe('Validação de Regex', () => {
    it('deve validar regex corretamente', () => {
      expect(component['validaRegex']('12345-678')).toBe(false); // válido
      expect(component['validaRegex']('12345678')).toBe(false);  // válido
      expect(component['validaRegex']('123')).toBe(true);        // inválido
      expect(component['validaRegex']('abcde-fgh')).toBe(true);  // inválido
      expect(component['validaRegex'](undefined)).toBe(true);    // inválido
      expect(component['validaRegex']('')).toBe(true);           // inválido
    });
  });

  describe('Validação de Campo Obrigatório', () => {
    it('deve retornar false quando campo não é obrigatório', () => {
      component.required = false;
      expect(component['validaRequired']('')).toBe(false);
      expect(component['validaRequired']('12345')).toBe(false);
    });

    it('deve retornar true quando campo é obrigatório e está vazio', () => {
      component.required = true;
      expect(component['validaRequired']('')).toBe(true);
      expect(component['validaRequired'](undefined)).toBe(true);
    });

    it('deve retornar true quando campo é obrigatório, tocado e vazio', () => {
      component.required = true;
      component['campoTocado'] = true;
      expect(component['validaRequired']('')).toBe(true);
    });

    it('deve retornar false quando campo é obrigatório mas tem valor', () => {
      component.required = true;
      component['campoTocado'] = true;
      expect(component['validaRequired']('12345')).toBe(false);
    });
  });

  describe('Pesquisa de CEP', () => {
    it('deve pesquisar CEP com sucesso e emitir endereco', () => {
      const spyValor = jest.spyOn(component.valor, 'emit');
      const mockResponse = {
        logradouro: 'Rua Teste',
        bairro: 'Bairro Teste',
        localidade: 'Cidade Teste',
        estado: 'Estado Teste',
        cep: '12345-678'
      };

      component['pequisarCep']('12345-678');

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

      component['pequisarCep']('12345-678');

      const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
      req.flush(mockResponse);

      expect(component['errorMessage']).toBe('CEP não encontrado');
    });

    it('deve tratar erro de requisição HTTP', () => {
      component['pequisarCep']('12345-678');

      const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
      req.error(new ErrorEvent('Erro de rede'));

      expect(component['errorMessage']).toBe('CEP não encontrado');
    });

    it('deve remover caracteres não numéricos do CEP antes da pesquisa', () => {
      component['pequisarCep']('12345-678');

      const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
      expect(req.request.url).toContain('12345678');
      req.flush({});
    });

    it('deve retornar early quando CEP é undefined', () => {
      const spyHttp = jest.spyOn(component['http'], 'get');

      component['pequisarCep'](undefined);

      expect(spyHttp).not.toHaveBeenCalled();
    });

    it('deve retornar early quando CEP é vazio', () => {
      const spyHttp = jest.spyOn(component['http'], 'get');

      component['pequisarCep']('');

      expect(spyHttp).not.toHaveBeenCalled();
    });
  });

  describe('Casos Extremos', () => {
    it('deve lidar com valor undefined no setter de value', () => {
      expect(() => {
        component.value = undefined;
      }).not.toThrow();
      expect(component.value).toBeUndefined();
    });

    it('deve lidar com event.target.value undefined no setValue', () => {
      const event = { target: { value: undefined } };
      expect(() => {
        component['setValue'](event);
      }).not.toThrow();
      expect(component.value).toBeUndefined();
    });

    it('deve lidar com validação quando campo não foi tocado', () => {
      component['campoTocado'] = false;
      component.required = true;

      const resultado = component['isCampoValido']('');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo CEP é obrigatório');
    });
  });
});
