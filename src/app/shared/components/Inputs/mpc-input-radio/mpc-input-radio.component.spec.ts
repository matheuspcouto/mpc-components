import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputRadioComponent, RadioOption } from './mpc-input-radio.component';

describe('MpcInputRadioComponent', () => {
  let component: MpcInputRadioComponent;
  let fixture: ComponentFixture<MpcInputRadioComponent>;

  const mockOptions: RadioOption[] = [
    { label: 'Masculino', value: 'M', checked: false },
    { label: 'Feminino', value: 'F', checked: false },
    { label: 'Outro', value: 'O', checked: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputRadioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputRadioComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve emitir valor da opção marcada como checked na inicialização', () => {
      const spyEmit = jest.spyOn(component.valor, 'emit');
      component.options = mockOptions;

      component.ngOnInit();

      expect(spyEmit).toHaveBeenCalledWith('O');
    });

    it('não deve emitir valor quando nenhuma opção está marcada como checked', () => {
      const spyEmit = jest.spyOn(component.valor, 'emit');
      component.options = [
        { label: 'Masculino', value: 'M', checked: false },
        { label: 'Feminino', value: 'F', checked: false }
      ];

      component.ngOnInit();

      expect(spyEmit).not.toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('deve marcar campo como tocado e validar campo', () => {
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido');

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(spyIsCampoValido).toHaveBeenCalled();
    });
  });

  describe('setValue', () => {
    it('deve definir valor da opção, desmarcar outras opções e emitir valor quando campo é válido', () => {
      const opcao = mockOptions[0];
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const spyEmit = jest.spyOn(component.valor, 'emit');
      component.options = [...mockOptions];

      component['setValue'](opcao);

      expect(component.options[0].checked).toBe(true);
      expect(component.options[1].checked).toBe(false);
      expect(component.options[2].checked).toBe(false);
      expect(component['opcaoSelecionada']).toBe(opcao);
      expect(spyIsCampoValido).toHaveBeenCalled();
      expect(spyEmit).toHaveBeenCalledWith('M');
    });

    it('não deve emitir valor quando campo é inválido', () => {
      const opcao = mockOptions[0];
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      const spyEmit = jest.spyOn(component.valor, 'emit');
      component.options = [...mockOptions];

      component['setValue'](opcao);

      expect(component.options[0].checked).toBe(true);
      expect(component['opcaoSelecionada']).toBe(opcao);
      expect(spyEmit).not.toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    it('deve retornar true quando campo é readonly', () => {
      component.readonly = true;

      const resultado = component['isCampoValido']();

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando campo é disabled', () => {
      component.disabled = true;

      const resultado = component['isCampoValido']();

      expect(resultado).toBe(true);
    });

    it('deve retornar false e emitir erro quando validação required falha', () => {
      const spyValidaRequired = jest.spyOn(component as any, 'validaRequired').mockReturnValue(true);
      const spyErrorEmit = jest.spyOn(component.error, 'emit');
      component.label = 'Sexo';

      const resultado = component['isCampoValido']();

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo Sexo é obrigatório');
      expect(spyErrorEmit).toHaveBeenCalledWith({ 'required': true });
      expect(spyValidaRequired).toHaveBeenCalled();
    });

    it('deve retornar true quando todas as validações passam', () => {
      const spyValidaRequired = jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);

      const resultado = component['isCampoValido']();

      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
      expect(spyValidaRequired).toHaveBeenCalled();
    });
  });

  describe('validaRequired', () => {
    it('deve retornar true quando campo é obrigatório, tocado e sem opção selecionada', () => {
      component.required = true;
      component['campoTocado'] = true;
      component['opcaoSelecionada'] = undefined;

      const resultado = component['validaRequired']();

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando campo não é obrigatório', () => {
      component.required = false;
      component['campoTocado'] = true;
      component['opcaoSelecionada'] = undefined;

      const resultado = component['validaRequired']();

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando campo não foi tocado', () => {
      component.required = true;
      component['campoTocado'] = false;
      component['opcaoSelecionada'] = undefined;

      const resultado = component['validaRequired']();

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando há opção selecionada', () => {
      component.required = true;
      component['campoTocado'] = true;
      component['opcaoSelecionada'] = mockOptions[0];

      const resultado = component['validaRequired']();

      expect(resultado).toBe(false);
    });
  });

  describe('propriedades de entrada', () => {
    it('deve definir valores padrão corretos', () => {
      expect(component.id).toBe('');
      expect(component.tabIndex).toBe(0);
      expect(component.ariaLabel).toBe('');
      expect(component.label).toBe('');
      expect(component.readonly).toBe(false);
      expect(component.disabled).toBe(false);
      expect(component.options).toEqual([]);
      expect(component.required).toBe(false);
    });

    it('deve aceitar valores customizados nas propriedades de entrada', () => {
      component.id = 'test-id';
      component.tabIndex = 5;
      component.ariaLabel = 'test-aria';
      component.label = 'Test Label';
      component.readonly = true;
      component.disabled = true;
      component.options = mockOptions;
      component.required = true;

      expect(component.id).toBe('test-id');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('test-aria');
      expect(component.label).toBe('Test Label');
      expect(component.readonly).toBe(true);
      expect(component.disabled).toBe(true);
      expect(component.options).toBe(mockOptions);
      expect(component.required).toBe(true);
    });
  });

  describe('propriedades protegidas', () => {
    it('deve inicializar propriedades protegidas com valores padrão', () => {
      expect(component['opcaoSelecionada']).toBeUndefined();
      expect(component['errorMessage']).toBeUndefined();
      expect(component['campoTocado']).toBe(false);
    });
  });
});
