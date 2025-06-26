import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MpcInputPesquisaCepComponent, Endereco } from './mpc-input-pesquisa-cep.component';

describe('MpcInputPesquisaCepComponent', () => {
  let componente: MpcInputPesquisaCepComponent;
  let fixture: ComponentFixture<MpcInputPesquisaCepComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MpcInputPesquisaCepComponent,
        HttpClientTestingModule,
        NgxMaskDirective
      ],
      providers: [provideNgxMask()]
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
      expect(componente.value).toBe('');
      expect(componente.required).toBe(false);
      expect(componente['mascara']).toBe('00000-000');
    });
  });

  describe('Propriedades Value', () => {
    it('deve definir e obter valor através do setter/getter', () => {
      componente.Value = '12345-678';
      expect(componente.Value).toBe('12345-678');
    });

    it('deve chamar pequisarCep quando valor é válido no setter', () => {
      const spyPesquisar = jest.spyOn(componente as any, 'pequisarCep');
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido').mockReturnValue(true);

      componente.Value = '12345-678';

      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
      expect(spyPesquisar).toHaveBeenCalledWith('12345-678');
    });

    it('não deve chamar pequisarCep quando valor é inválido no setter', () => {
      const spyPesquisar = jest.spyOn(componente as any, 'pequisarCep');
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido').mockReturnValue(false);

      componente.Value = '123';

      expect(spyValidacao).toHaveBeenCalledWith('123');
      expect(spyPesquisar).not.toHaveBeenCalled();
    });
  });

  describe('Métodos de Controle de Formulário', () => {
    it('deve escrever valor através de writeValue', () => {
      componente.writeValue('87654-321');
      expect(componente.value).toBe('87654-321');
    });

    it('deve registrar função onChange', () => {
      const mockFn = jest.fn();
      componente.registerOnChange(mockFn);
      expect(componente.onChange).toBe(mockFn);
    });

    it('deve registrar função onTouched', () => {
      const mockFn = jest.fn();
      componente.registerOnTouched(mockFn);
      expect(componente.onTouched).toBe(mockFn);
    });
  });

  describe('Eventos de Foco', () => {
    it('deve chamar onTouched e validar campo no onBlur', () => {
      const spyOnTouched = jest.spyOn(componente, 'onTouched');
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido');
      componente.Value = '12345-678';

      componente['onBlur']();

      expect(spyOnTouched).toHaveBeenCalled();
      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
    });

    it('deve marcar campo como tocado e validar no onFocus', () => {
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido');
      componente.Value = '12345-678';

      componente['onFocus']();

      expect(componente['campoTocado']).toBe(true);
      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
    });
  });

  describe('setValue', () => {
    it('deve definir valor e chamar callbacks no setValue', () => {
      const spyOnChange = jest.spyOn(componente, 'onChange');
      const spyOnTouched = jest.spyOn(componente, 'onTouched');
      const spyValidacao = jest.spyOn(componente as any, 'isCampoValido');
      const event = { target: { value: '12345-678' } };

      componente['setValue'](event);

      expect(componente.Value).toBe('12345-678');
      expect(spyOnChange).toHaveBeenCalledWith('12345-678');
      expect(spyOnTouched).toHaveBeenCalled();
      expect(spyValidacao).toHaveBeenCalledWith('12345-678');
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
      const resultado = componente['isCampoValido']('12345-678');

      expect(resultado).toBe(true);
      expect(componente['errorMessage']).toBeUndefined();
    });

    it('deve validar regex corretamente', () => {
      expect(componente['validaRegex']('12345-678')).toBe(false);
      expect(componente['validaRegex']('12345678')).toBe(false);
      expect(componente['validaRegex']('123')).toBe(true);
      expect(componente['validaRegex']('abcde-fgh')).toBe(true);
    });

    it('deve validar campo obrigatório corretamente', () => {
      componente.required = true;
      componente['campoTocado'] = true;

      expect(componente['validaRequired']('')).toBe(true);
      expect(componente['validaRequired']('12345')).toBe(false);

      componente.required = false;
      expect(componente['validaRequired']('')).toBe(false);

      componente['campoTocado'] = false;
      componente.required = true;
      expect(componente['validaRequired']('')).toBe(false);
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
  });

  describe('Cobertura de Casos Extremos', () => {
    it('deve lidar com valor undefined no setter', () => {
      expect(() => {
        componente.Value = undefined as any;
      }).not.toThrow();
    });

    it('deve lidar com event.target.value undefined no setValue', () => {
      const event = { target: { value: undefined } };
      expect(() => {
        componente['setValue'](event);
      }).not.toThrow();
    });
  });
});
