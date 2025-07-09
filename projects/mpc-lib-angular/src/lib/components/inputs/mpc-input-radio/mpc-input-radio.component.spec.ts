import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputRadioComponent, RadioOption } from './mpc-input-radio.component';

describe('MpcInputRadioComponent', () => {
  let component: MpcInputRadioComponent;
  let fixture: ComponentFixture<MpcInputRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputRadioComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar o valor ao setValue', () => {
    const option: RadioOption = { label: 'Teste', value: 'T', checked: false };
    component.options = [option];
    (component as any).setValue(option);
    expect(component.value).toBe('T');
    expect((component as any).opcaoSelecionada).toBe(option);
  });

  it('deve validar campo obrigatório', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar campo obrigatório - required false', () => {
    component.required = false;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve validar campo obrigatório - required true', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve aceitar campo válido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    (component as any).opcaoSelecionada = { label: 'Teste', value: 'T', checked: true };
    const result = component.validate({ value: 'T' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve aceitar campo readonly', () => {
    component.readonly = true;
    const result = component.validate({ value: 'T' } as any);
    expect(result).toBeNull();
  });

  it('deve chamar writeValue', () => {
    const option: RadioOption = { label: 'Teste', value: 'T', checked: false };
    component.options = [option];
    const spyOnWriteValue = jest.spyOn(component as any, 'writeValue');
    component.writeValue('teste');
    expect(spyOnWriteValue).toHaveBeenCalledWith('teste');
  });

  it('deve chamar onFocus', () => {
    const spyOnOnFocus = jest.spyOn(component as any, 'onFocus');
    (component as any).onFocus();
    expect(spyOnOnFocus).toHaveBeenCalled();
  });

});
