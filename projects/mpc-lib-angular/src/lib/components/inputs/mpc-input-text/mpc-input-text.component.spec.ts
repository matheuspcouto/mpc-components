import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTextComponent } from './mpc-input-text.component';
import { ValidationErrors } from '@angular/forms';

describe('MpcInputTextComponent', () => {
  let component: MpcInputTextComponent;
  let fixture: ComponentFixture<MpcInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTextComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir erro se valor for menor que o mínimo', () => {
    component.min = 5;
    component.label = 'Nome';
    (component as any).campoTocado = true;
    component.value = 'abc';
    const result = component.validate({ value: 'abc' } as any);
    expect(result).toEqual({ min: true });
    expect((component as any).errorMessage).toContain('mínimo');
  });

  it('deve aceitar campo válido', () => {
    component.min = 2;
    component.label = 'Nome';
    (component as any).campoTocado = true;
    component.value = 'abc';
    const result = component.validate({ value: 'abc' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve atualizar o valor ao setValue', () => {
    component.min = 2;
    const event = { target: { value: 'abc' } } as any;
    component['setValue'](event);
    expect(component.value).toBe('abc');
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBe(true);
  });

  it('deve validar isMenorQueValorMinimo corretamente', () => {
    component.min = 5;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(true);
    expect((component as any).isMenorQueValorMinimo('abcdef')).toBe(false);
    expect((component as any).isMenorQueValorMinimo(undefined)).toBe(true);
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
    component.min = 0;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });

  it('deve emitir erro se valor for maior que o máximo', () => {
    component.max = 5;
    component.label = 'Nome';
    (component as any).campoTocado = true;
    component.value = 'abcdef';
    const result = component.validate({ value: 'abcdef' } as any);
    expect(result).toEqual({ max: true });
    expect((component as any).errorMessage).toContain('máximo');
  });

  it('deve aceitar campo readonly', () => {
    component.readonly = true;
    const result = component.validate({ value: 'abc' } as any);
    expect(result).toBeNull();
  });

  it('deve aceitar campo disabled', () => {
    component.disabled = true;
    const result = component.validate({ value: 'abc' } as any);
    expect(result).toBeNull();
  });

  it('isMenorQueValorMinimo deve retornar false se min for undefined', () => {
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });

  it('isMenorQueValorMinimo deve retornar true se value for vazio e min > 0', () => {
    component.min = 2;
    expect((component as any).isMenorQueValorMinimo('')).toBe(true);
  });

  it('isMenorQueValorMinimo deve retornar false se value.length >= min', () => {
    component.min = 2;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });

  it('isMaiorQueValorMaximo deve retornar false se max for undefined', () => {
    component.max = undefined;
    expect((component as any).isMaiorQueValorMaximo('abc')).toBe(false);
  });

  it('isMaiorQueValorMaximo deve retornar false se value for vazio', () => {
    component.max = 5;
    expect((component as any).isMaiorQueValorMaximo('')).toBe(false);
  });

  it('isMaiorQueValorMaximo deve retornar true se value.length > max', () => {
    component.max = 2;
    expect((component as any).isMaiorQueValorMaximo('abc')).toBe(true);
  });

  it('deve chamar writeValue', () => {
    const spyOnWriteValue = jest.spyOn(component as any, 'writeValue');
    component.writeValue('teste');
    expect(spyOnWriteValue).toHaveBeenCalledWith('teste');
  });

});
