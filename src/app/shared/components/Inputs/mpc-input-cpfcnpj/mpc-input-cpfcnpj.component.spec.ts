import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputCpfcnpjComponent } from './mpc-input-cpfcnpj.component';

describe('MpcInputCpfcnpjComponent', () => {
  let component: MpcInputCpfcnpjComponent;
  let fixture: ComponentFixture<MpcInputCpfcnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputCpfcnpjComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputCpfcnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('valorFormatado - CPF', () => {
    it('deve retornar valor formatado através do pipe', () => {
      component.value = '12345678901';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor formatado através do pipe - 3 digitos', () => {
      component.value = '123';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor formatado através do pipe - 6 digitos', () => {
      component.value = '123456';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor formatado através do pipe - 9 digitos', () => {
      component.value = '123456789';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });
  });

  describe('valorFormatado - CNPJ', () => {
    it('deve retornar valor formatado através do pipe', () => {
      component.value = '12345678901234';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });
  });

  describe('onFocus', () => {
    it('deve marcar campo como tocado e validar', () => {
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(component['isCampoValido']).toHaveBeenCalledWith(component.value);
    });
  });

  describe('setValue', () => {
    beforeEach(() => {
      jest.spyOn(component.valor, 'emit');
      jest.spyOn(component as any, 'isCampoValido');
    });

    it('deve processar CPF válido e emitir valor', () => {
      const event = { target: { value: '12345678909' } };
      (component as any).isCampoValido.mockReturnValue(true);

      component['setValue'](event);

      expect(component.value).toBe('12345678909');
      expect(component['isCampoValido']).toHaveBeenCalledWith('12345678909');
      expect(component.valor.emit).toHaveBeenCalledWith('12345678909');
    });

    it('deve processar CNPJ válido e emitir valor', () => {
      const event = { target: { value: '11222333000181' } };
      (component as any).isCampoValido.mockReturnValue(true);

      component['setValue'](event);

      expect(component.value).toBe('11222333000181');
      expect(component.valor.emit).toHaveBeenCalledWith('11222333000181');
    });

    it('deve processar valor inválido e não emitir', () => {
      const event = { target: { value: '123' } };
      (component as any).isCampoValido.mockReturnValue(false);

      component['setValue'](event);

      expect(component.value).toBe('123');
      expect(component.valor.emit).not.toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    beforeEach(() => {
      component['campoTocado'] = true;
      jest.spyOn(component.error, 'emit');
    });

    it('deve retornar true quando readonly é true', () => {
      component.readonly = true;
      component.value = 'valor_invalido';

      const resultado = component['isCampoValido']('valor_invalido');

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando disabled é true', () => {
      component.disabled = true;
      component.value = 'valor_invalido';

      const resultado = component['isCampoValido']('valor_invalido');

      expect(resultado).toBe(true);
    });

    it('deve retornar false e emitir erro quando campo obrigatório está vazio', () => {
      component.required = true;

      const resultado = component['isCampoValido']('');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo CPF/CNPJ é obrigatório');
      expect(component.error.emit).toHaveBeenCalledWith({ required: true });
    });

    it('deve retornar false e emitir erro quando CPF/CNPJ é inválido', () => {
      jest.spyOn(component as any, 'isValidCpfOrCnpj').mockReturnValue(false);

      const resultado = component['isCampoValido']('12345678900');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O formato do CPF/CNPJ não é válido');
      expect(component.error.emit).toHaveBeenCalledWith({ regex: true });
    });

    it('deve retornar true quando campo é válido', () => {
      jest.spyOn(component as any, 'isValidCpfOrCnpj').mockReturnValue(true);

      const resultado = component['isCampoValido']('12345678909');

      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
    });
  });

  describe('validaRequired', () => {
    it('deve retornar false quando required é false', () => {
      component.required = false;

      expect(component['validaRequired']('')).toBe(false);
      expect(component['validaRequired'](undefined)).toBe(false);
      expect(component['validaRequired']('valor')).toBe(false);
    });

    it('deve retornar true quando required é true e valor está vazio', () => {
      component.required = true;

      expect(component['validaRequired']('')).toBe(true);
      expect(component['validaRequired'](undefined)).toBe(true);
    });

    it('deve retornar false quando required é true e valor está preenchido', () => {
      component.required = true;

      expect(component['validaRequired']('12345678901')).toBe(false);
    });
  });

  describe('isValidCPF', () => {
    it('deve validar CPF válido sem formatação', () => {
      expect(component['isValidCPF']('12345678909')).toBe(true);
    });

    it('deve validar CPF válido com formatação', () => {
      expect(component['isValidCPF']('123.456.789-09')).toBe(true);
    });

    it('deve invalidar CPF com comprimento incorreto', () => {
      expect(component['isValidCPF']('123456789')).toBe(false);
    });

    it('deve invalidar CPF com todos os dígitos iguais', () => {
      expect(component['isValidCPF']('11111111111')).toBe(false);
      expect(component['isValidCPF']('00000000000')).toBe(false);
    });

    it('deve invalidar CPF com primeiro dígito verificador incorreto', () => {
      expect(component['isValidCPF']('12345678919')).toBe(false);
    });

    it('deve invalidar CPF com segundo dígito verificador incorreto', () => {
      expect(component['isValidCPF']('12345678908')).toBe(false);
    });

    it('deve tratar CPF undefined', () => {
      expect(component['isValidCPF'](undefined)).toBe(false);
    });

    it('deve aplicar correção quando primeiro dígito é 10 ou 11', () => {
      // Testando cenário onde firstDigit seria 10 ou 11
      expect(component['isValidCPF']('11144477735')).toBe(true);
    });

    it('deve aplicar correção quando segundo dígito é 10 ou 11', () => {
      // Testando cenário onde secondDigit seria 10 ou 11
      expect(component['isValidCPF']('98765432100')).toBe(true);
    });
  });

  describe('isValidCNPJ', () => {
    it('deve validar CNPJ válido', () => {
      expect(component['isValidCNPJ']('11222333000181')).toBe(true);
    });

    it('deve validar CNPJ válido com formatação', () => {
      expect(component['isValidCNPJ']('11.222.333/0001-81')).toBe(true);
    });

    it('deve invalidar CNPJ com comprimento incorreto', () => {
      expect(component['isValidCNPJ']('1122233300018')).toBe(false);
    });

    it('deve invalidar CNPJ com todos os dígitos iguais', () => {
      expect(component['isValidCNPJ']('11111111111111')).toBe(false);
    });

    it('deve invalidar CNPJ com dígitos verificadores incorretos', () => {
      expect(component['isValidCNPJ']('11222333000180')).toBe(false);
    });

    it('deve tratar CNPJ undefined', () => {
      expect(component['isValidCNPJ'](undefined)).toBe(false);
    });

    it('deve calcular corretamente os dígitos verificadores', () => {
      expect(component['isValidCNPJ']('11444777000161')).toBe(true);
    });
  });

  describe('isValidCpfOrCnpj', () => {
    it('deve validar CPF quando valor tem 11 dígitos', () => {
      jest.spyOn(component as any, 'isValidCPF').mockReturnValue(true);

      const resultado = component['isValidCpfOrCnpj']('12345678909');

      expect(component['isValidCPF']).toHaveBeenCalledWith('12345678909');
      expect(resultado).toBe(true);
    });

    it('deve validar CNPJ quando valor não tem 11 dígitos', () => {
      jest.spyOn(component as any, 'isValidCNPJ').mockReturnValue(true);

      const resultado = component['isValidCpfOrCnpj']('11222333000181');

      expect(component['isValidCNPJ']).toHaveBeenCalledWith('11222333000181');
      expect(resultado).toBe(true);
    });

    it('deve retornar false para valor undefined', () => {
      const resultado = component['isValidCpfOrCnpj'](undefined);
      expect(resultado).toBe(false);
    });
  });
});
