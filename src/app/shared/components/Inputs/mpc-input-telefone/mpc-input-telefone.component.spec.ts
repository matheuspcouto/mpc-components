import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTelefoneComponent } from './mpc-input-telefone.component';

describe('MpcInputTelefoneComponent', () => {
  let component: MpcInputTelefoneComponent;
  let fixture: ComponentFixture<MpcInputTelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTelefoneComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir valor ao setar telefone', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '(11) 99999-9999' } });
    expect(component.valor.emit).toHaveBeenCalledWith('11999999999');
  });

  it('deve emitir erro ao valor vazio se required', () => {
    jest.spyOn(component.error, 'emit');
    component.required = true;
    component['campoTocado'] = true;
    component['setValue']({ target: { value: '' } });
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect(component['campoTocado']).toBe(true);
  });

  describe('isCampoValido', () => {
    it('isCampoValido retorna true se disabled é true', () => {
      component.disabled = true;
      expect(component['isCampoValido']('(11) 99999-9999')).toBe(true);
    });

    it('isCampoValido retorna true se readonly é true', () => {
      component.readonly = true;
      expect(component['isCampoValido']('(11) 99999-9999')).toBe(true);
    });

    it('isCampoValido retorna false se valor for vazio e required é true', () => {
      component.required = true;
      expect(component['isCampoValido']('')).toBe(false);
    });

    it('isCampoValido retorna false se valor for inválido', () => {
      component.required = true;
      expect(component['isCampoValido']('abc')).toBe(false);
    });

    it('isCampoValido retorna true se valor for válido', () => {
      component.required = true;
      expect(component['isCampoValido']('(11) 99999-9999')).toBe(true);
    });

    it('isCampoValido retorna false se valor for vazio e required é false', () => {
      component.required = false;
      expect(component['isCampoValido']('')).toBe(false);
    });

  });
});
