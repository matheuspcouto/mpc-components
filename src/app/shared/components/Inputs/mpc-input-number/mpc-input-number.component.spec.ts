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
    const spy = jest.spyOn(component.error, 'emit');
    (component as any).campoTocado = true;
    (component as any).isCampoValido(5);
    expect(spy).toHaveBeenCalledWith({ min: true });
    expect((component as any).errorMessage).toContain('mínimo');
  });

  it('deve emitir erro se valor for maior que o máximo', () => {
    component.max = 20;
    component.label = 'Idade';
    const spy = jest.spyOn(component.error, 'emit');
    (component as any).campoTocado = true;
    (component as any).isCampoValido(25);
    expect(spy).toHaveBeenCalledWith({ max: true });
    expect((component as any).errorMessage).toContain('máximo');
  });

  it('deve aceitar campo válido', () => {
    component.min = 10;
    component.max = 20;
    component.label = 'Idade';
    (component as any).campoTocado = true;
    expect((component as any).isCampoValido(15)).toBe(true);
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve aceitar campo readonly ou disabled', () => {
    component.readonly = true;
    expect((component as any).isCampoValido(undefined)).toBe(true);
    component.readonly = false;
    component.disabled = true;
    expect((component as any).isCampoValido(undefined)).toBe(true);
  });

  it('deve emitir valor ao setValue válido', () => {
    const spy = jest.spyOn(component.valor, 'emit');
    component.min = 0;
    component.max = 100;
    (component as any).setValue({ target: { value: 50 } });
    expect(spy).toHaveBeenCalledWith(50);
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBe(true);
  });

  it('deve chamar isCampoValido no ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'isCampoValido');
    component.value = 10;
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(10);
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
    expect((component as any).isMaiorQueValorMaximo(25)).toBe(true);
    expect((component as any).isMaiorQueValorMaximo(15)).toBe(false);
    expect((component as any).isMaiorQueValorMaximo(undefined)).toBe(true);
    component.max = undefined;
    expect((component as any).isMaiorQueValorMaximo(25)).toBe(false);
  });
});
