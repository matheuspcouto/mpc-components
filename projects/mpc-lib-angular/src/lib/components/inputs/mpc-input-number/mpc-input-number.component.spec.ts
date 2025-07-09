import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputNumberComponent } from './mpc-input-number.component';
import { ValidationErrors } from '@angular/forms';

describe('MpcInputNumberComponent', () => {
  let component: MpcInputNumberComponent;
  let fixture: ComponentFixture<MpcInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputNumberComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir erro se valor for menor que o mínimo', () => {
    component.min = 10;
    component.label = 'Idade';
    (component as any).campoTocado = true;
    const result = component.validate({ value: 5 } as any);
    expect(result).toEqual({ min: true });
    expect((component as any).errorMessage).toContain('mínimo');
  });

  it('deve emitir erro se valor for maior que o máximo', () => {
    component.max = 20;
    component.label = 'Idade';
    (component as any).campoTocado = true;
    component.value = 25;
    const result = component.validate({ value: 25 } as any);
    expect(result).toEqual({ max: true });
    expect((component as any).errorMessage).toContain('máximo');
  });

  it('deve aceitar campo válido', () => {
    component.min = 10;
    component.max = 20;
    component.label = 'Idade';
    (component as any).campoTocado = true;
    component.value = 15;
    const result = component.validate({ value: 15 } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve atualizar o valor ao setValue', () => {
    component.min = 0;
    component.max = 100;
    const event = { target: { value: 50 } } as any;
    component['setValue'](event);
    expect(component.value).toBe(50);
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBe(true);
  });

  it('deve validar isMenorQueValorMinimo corretamente', () => {
    component.min = 10;
    expect((component as any).isMenorQueValorMinimo(5)).toBe(true);
    expect((component as any).isMenorQueValorMinimo(15)).toBe(false);
    expect((component as any).isMenorQueValorMinimo(undefined)).toBe(true);
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo(5)).toBe(false);
  });

  it('deve validar isMaiorQueValorMaximo corretamente', () => {
    component.max = 20;
    expect(component['isMaiorQueValorMaximo'](25)).toBe(true);
    expect(component['isMaiorQueValorMaximo'](15)).toBe(false);
    expect(component['isMaiorQueValorMaximo'](undefined)).toBe(false);
    component.max = undefined;
    expect(component['isMaiorQueValorMaximo'](25)).toBe(false);
  });

  it('deve retornar null se readonly for true', () => {
    component.readonly = true;
    component.value = 10;
    const result = component.validate({ value: 10 } as any);
    expect(result).toBeNull();
  });

  it('deve retornar null se disabled for true', () => {
    component.disabled = true;
    component.value = 10;
    const result = component.validate({ value: 10 } as any);
    expect(result).toBeNull();
  });

  it('deve emitir erro se campo for obrigatório e vazio', () => {
    component.required = true;
    component.label = 'Idade';
    (component as any).campoTocado = true;
    component.value = undefined as any;
    const result = component.validate({ value: undefined } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve executar writeValue corretamente', () => {
    component.writeValue(42);
    expect(component.value).toBe(42);
  });

  it('deve executar registerOnChange e registerOnTouched', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.registerOnTouched(fn);
    component.onChange(123);
    component.onTouched();
    expect(fn).toHaveBeenCalledWith(123);
  });

  it('isMenorQueValorMinimo deve retornar false se min for undefined', () => {
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo(5)).toBe(false);
  });

  it('isMenorQueValorMinimo deve retornar true se value for undefined', () => {
    component.min = 10;
    expect((component as any).isMenorQueValorMinimo(undefined)).toBe(true);
  });

  it('isMaiorQueValorMaximo deve retornar false se max for undefined', () => {
    component.max = undefined;
    expect((component as any).isMaiorQueValorMaximo(25)).toBe(false);
  });

  it('isMaiorQueValorMaximo deve retornar false se value for undefined', () => {
    component.max = 20;
    expect((component as any).isMaiorQueValorMaximo(undefined)).toBe(false);
  });
});
