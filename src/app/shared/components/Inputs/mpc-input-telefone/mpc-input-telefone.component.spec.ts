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

  it('deve atualizar o valor ao setValue', () => {
    const event = { target: { value: '(11) 99999-9999' } } as any;
    component['setValue'](event);
    expect(component.value).toBe('11999999999');
  });

  it('deve validar campo obrigatório', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar campo readonly e disabled', () => {
    component.readonly = true;
    expect(component.validate({ value: '' } as any)).toBeNull();
    component.readonly = false;
    component.disabled = true;
    expect(component.validate({ value: '' } as any)).toBeNull();
  });

  it('deve validar telefone inválido', () => {
    (component as any).campoTocado = true;
    component.value = '123';
    const result = component.validate({ value: '123' } as any);
    expect(result).toEqual({ pattern: true });
    expect((component as any).errorMessage).toContain('formato válido');
  });

  it('deve aceitar telefone válido', () => {
    (component as any).campoTocado = true;
    component.value = '11999999999';
    const result = component.validate({ value: '11999999999' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('isCampoObrigatorio deve retornar true se required e vazio', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('')).toBe(true);
    expect((component as any).isCampoObrigatorio(undefined)).toBe(true);
  });

  it('isCampoObrigatorio deve retornar false se não required ou preenchido', () => {
    component.required = false;
    expect((component as any).isCampoObrigatorio('')).toBe(false);
    component.required = true;
    expect((component as any).isCampoObrigatorio('123')).toBe(false);
  });

  it('isTelefoneInvalido deve retornar true para valores inválidos', () => {
    expect((component as any).isTelefoneInvalido(undefined)).toBe(true);
    expect((component as any).isTelefoneInvalido('')).toBe(true);
    expect((component as any).isTelefoneInvalido('123')).toBe(true);
  });

  it('isTelefoneInvalido deve retornar false para telefone válido', () => {
    expect((component as any).isTelefoneInvalido('11999999999')).toBe(false);
    expect((component as any).isTelefoneInvalido('(11) 99999-9999')).toBe(false);
  });

  it('deve formatar valor corretamente', () => {
    component.value = '11999999999';
    expect(component.valorFormatado).toBe('(11) 99999-9999');
  });

  it('deve disparar onChange e onTouched ao setValue', () => {
    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);
    (component as any).setValue({ target: { value: '11999999999' } });
    expect(onChange).toHaveBeenCalledWith('11999999999');
    expect(onTouched).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBeTruthy();
  });

  it('deve chamar writeValue', () => {
    const spyOnWriteValue = jest.spyOn(component as any, 'writeValue');
    component.writeValue('teste');
    expect(spyOnWriteValue).toHaveBeenCalledWith('teste');
  });
});
