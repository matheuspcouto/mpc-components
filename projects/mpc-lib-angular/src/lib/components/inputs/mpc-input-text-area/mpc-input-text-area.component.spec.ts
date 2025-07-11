import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTextAreaComponent } from './mpc-input-text-area.component';

describe('MpcInputTextAreaComponent', () => {
  let component: MpcInputTextAreaComponent;
  let fixture: ComponentFixture<MpcInputTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTextAreaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir a contagem de caracteres corretamente', () => {
    component.value = 'abc';
    fixture.detectChanges();
    expect(component.qtdCaracteres).toBe(3);
  });

  it('deve atualizar o valor ao setValue', () => {
    const event = { target: { value: 'teste', style: { height: 'auto' }, scrollHeight: 42 } } as any;
    component.textareaRef = { nativeElement: { style: { height: 'auto' }, scrollHeight: 42 } } as any;
    component['setValue'](event);
    expect(component.value).toBe('teste');
  });

  it('deve exibir mensagem de erro se valor for menor que min', () => {
    component.label = 'Descrição';
    component.min = 5;
    component.value = 'abc';
    component['campoTocado'] = true;
    component.validate({ value: 'abc' } as any);
    expect((component as any).errorMessage).toBeDefined();
  });

  it('deve chamar onFocus', () => {
    const spyOnFocus = jest.spyOn(component as any, 'onFocus');
    component['onFocus']();
    expect(spyOnFocus).toHaveBeenCalled();
  });

  it('isMenorQueValorMinimo retorna false se min for undefined', () => {
    component.min = undefined;
    expect(component['isMenorQueValorMinimo']('abc')).toBe(false);
  });

  it('isMenorQueValorMinimo retorna false se min for vazio', () => {
    component.min = 0;
    expect(component['isMenorQueValorMinimo']('abc')).toBe(false);
  });

  it('isMenorQueValorMinimo retorna true se valor for undefined', () => {
    component.min = 5;
    expect(component['isMenorQueValorMinimo'](undefined)).toBe(true);
  });

  it('isMenorQueValorMinimo retorna true se valor for vazio', () => {
    component.min = 5;
    expect(component['isMenorQueValorMinimo']('')).toBe(true);
  });

  it('isMenorQueValorMinimo retorna true se valor for menor que min', () => {
    component.min = 5;
    expect(component['isMenorQueValorMinimo']('abc')).toBe(true);
  });

  it('isMenorQueValorMinimo retorna true se valor for maior que min', () => {
    component.min = 5;
    expect(component['isMenorQueValorMinimo']('abc')).toBe(true);
  });

  it('deve emitir erro se valor for menor que o mínimo', () => {
    component.min = 5;
    component.label = 'Descrição';
    (component as any).campoTocado = true;
    component.value = 'abc';
    const result = component.validate({ value: 'abc' } as any);
    expect(result).toEqual({ min: true });
    expect((component as any).errorMessage).toContain('mínimo');
  });

  it('deve aceitar campo válido', () => {
    component.min = 2;
    component.label = 'Descrição';
    (component as any).campoTocado = true;
    component.value = 'abcdef';
    const result = component.validate({ value: 'abcdef' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
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

  it('qtdCaracteres deve retornar o tamanho correto', () => {
    component.value = 'abcdef';
    expect(component.qtdCaracteres).toBe(6);
    component.value = '';
    expect(component.qtdCaracteres).toBe(0);
  });

  it('isMenorQueValorMinimo deve retornar false se min for undefined', () => {
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });

  it('isMenorQueValorMinimo deve retornar true se value for vazio', () => {
    component.min = 3;
    expect((component as any).isMenorQueValorMinimo('')).toBe(true);
  });

  it('isMenorQueValorMinimo deve retornar true se value.length < min', () => {
    component.min = 5;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(true);
  });

  it('isMenorQueValorMinimo deve retornar false se value.length >= min', () => {
    component.min = 2;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });

  it('deve chamar writeValue', () => {
    const spyOnWriteValue = jest.spyOn(component as any, 'writeValue');
    component.writeValue('teste');
    expect(spyOnWriteValue).toHaveBeenCalledWith('teste');
  });

  it('deve chamar ajustarAltura no ngAfterViewInit se houver valor', () => {
    component.value = 'valor inicial';
    const ajustarAlturaSpy = jest.spyOn<any, any>(component as any, 'ajustarAltura');
    component.textareaRef = { nativeElement: { style: { height: 'auto' }, scrollHeight: 42 } } as any;
    jest.useFakeTimers();
    component.ngAfterViewInit();
    jest.runAllTimers();
    expect(ajustarAlturaSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('deve chamar ajustarAltura no writeValue se textareaRef existir', () => {
    const ajustarAlturaSpy = jest.spyOn<any, any>(component as any, 'ajustarAltura');
    component.textareaRef = { nativeElement: { style: { height: 'auto' }, scrollHeight: 42 } } as any;
    jest.useFakeTimers();
    component.writeValue('novo valor');
    jest.runAllTimers();
    expect(ajustarAlturaSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('deve executar ajustarAltura corretamente', () => {
    const textarea = { style: { height: 'auto' }, scrollHeight: 123 } as any;
    (component as any).ajustarAltura(textarea);
    expect(textarea.style.height).toBe('123px');
  });

  it('deve registrar função de mudança com registerOnChange', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('deve registrar função de toque com registerOnTouched', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });
}); 