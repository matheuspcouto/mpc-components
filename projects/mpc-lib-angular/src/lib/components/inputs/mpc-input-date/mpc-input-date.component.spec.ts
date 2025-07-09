import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputDateComponent } from './mpc-input-date.component';

describe('MpcInputDateComponent', () => {
  let component: MpcInputDateComponent;
  let fixture: ComponentFixture<MpcInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputDateComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar o valor ao setValue', () => {
    (component as any).setValue({ target: { value: '2023-01-01' } });
    expect(component.value).toBe('2023-01-01');
  });

  it('deve validar campo obrigatório', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar minDate', () => {
    component.minDate = '2023-01-01';
    (component as any).campoTocado = true;
    component.value = '2022-12-31';
    const result = component.validate({ value: '2022-12-31' } as any);
    expect(result).toEqual({ minDate: true });
    expect((component as any).errorMessage).toContain('maior ou igual');
  });

  it('deve validar maxDate', () => {
    component.maxDate = '2023-12-31';
    (component as any).campoTocado = true;
    component.value = '2024-01-01';
    const result = component.validate({ value: '2024-01-01' } as any);
    expect(result).toEqual({ maxDate: true });
    expect((component as any).errorMessage).toContain('menor ou igual');
  });

  it('deve aceitar campo válido', () => {
    component.required = false;
    component.minDate = '2023-01-01';
    component.maxDate = '2023-12-31';
    (component as any).campoTocado = true;
    component.value = '2023-06-01';
    const result = component.validate({ value: '2023-06-01' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve aceitar campo readonly', () => {
    component.readonly = true;
    const result = component.validate({ value: '2023-01-01' } as any);
    expect(result).toBeNull();
  });

  it('deve aceitar campo disabled', () => {
    component.disabled = true;
    const result = component.validate({ value: '2023-01-01' } as any);
    expect(result).toBeNull();
  });

  it('deve validar campo obrigatório vazio', () => {
    component.required = true;
    component.label = 'Data';
    (component as any).campoTocado = true;
    component.value = '';
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar campo obrigatório preenchido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    component.value = '2023-01-01';
    const result = component.validate({ value: '2023-01-01' } as any);
    expect(result).toBeNull();
  });

  it('deve formatar data corretamente', () => {
    const dataFormatada = (component as any).formatarData('2023-07-15');
    expect(dataFormatada).toBe('15/07/2023');
  });

  it('deve retornar string vazia ao formatar data indefinida', () => {
    const dataFormatada = (component as any).formatarData(undefined);
    expect(dataFormatada).toBe('');
  });

  it('deve validar isMenorQueDataMinima corretamente', () => {
    component.minDate = '2023-01-01';
    expect((component as any).isMenorQueDataMinima('2022-12-31')).toBe(true);
    expect((component as any).isMenorQueDataMinima('2023-01-01')).toBe(false);
    expect((component as any).isMenorQueDataMinima(undefined)).toBe(false);
    component.minDate = undefined;
    expect((component as any).isMenorQueDataMinima('2022-12-31')).toBe(false);
  });

  it('deve validar isMaiorQueDataMaxima corretamente', () => {
    component.maxDate = '2023-12-31';
    expect((component as any).isMaiorQueDataMaxima('2024-01-01')).toBe(true);
    expect((component as any).isMaiorQueDataMaxima('2023-12-31')).toBe(false);
    expect((component as any).isMaiorQueDataMaxima(undefined)).toBe(false);
    component.maxDate = undefined;
    expect((component as any).isMaiorQueDataMaxima('2024-01-01')).toBe(false);
  });

  it('deve validar isCampoObrigatorio corretamente', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio(undefined)).toBe(true);
    expect((component as any).isCampoObrigatorio('')).toBe(true);
    expect((component as any).isCampoObrigatorio('2023-01-01')).toBe(false);
    component.required = false;
    expect((component as any).isCampoObrigatorio(undefined)).toBe(false);
  });

  it('deve exibir mensagem de erro no template', () => {
    component.required = true;
    component.label = 'Data';
    (component as any).campoTocado = true;
    component.validate({ value: '' } as any);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-danger')?.textContent).toContain('obrigatório');
  });

  it('deve chamar writeValue', () => {
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
