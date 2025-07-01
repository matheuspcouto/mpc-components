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

  it('deve emitir valor ao setar data', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '2023-01-01' } });
    expect(component.valor.emit).toHaveBeenCalledWith('2023-01-01');
  });

  it('deve emitir erro ao valor vazio se required', () => {
    jest.spyOn(component.error, 'emit');
    component.required = true;
    component['setValue']({ target: { value: '' } });
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect((component as any)['campoTocado']).toBe(true);
  });

  it('isCampoValido retorna true se readonly', () => {
    component.readonly = true;
    expect(component['isCampoValido']('2023-01-01')).toBe(true);
  });

  it('isCampoValido retorna false se obrigatório e vazio', () => {
    component.required = true;
    component.label = 'Data';
    jest.spyOn(component.error, 'emit');
    expect(component['isCampoValido']('')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna false se menor que minDate', () => {
    component.required = true;
    component.minDate = '2023-01-01';
    jest.spyOn(component.error, 'emit');
    expect(component['isCampoValido']('2022-12-31')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna false se maior que maxDate', () => {
    component.required = true;
    component.maxDate = '2023-12-31';
    jest.spyOn(component.error, 'emit');
    expect(component['isCampoValido']('2024-01-01')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna true se válido', () => {
    expect(component['isCampoValido']('2023-01-01')).toBe(true);
  });

  it('isMenorQueDataMinima retorna true se valor menor que minDate', () => {
    component.required = true;
    component.minDate = '2023-01-01';
    expect(component['isMenorQueDataMinima']('2022-12-31')).toBe(true);
  });

  it('isMenorQueDataMinima retorna false se required for false', () => {
    component.required = false;
    component.minDate = '2023-01-01';
    expect(component['isMenorQueDataMinima']('2024-01-01')).toBe(false);
  });

  it('isMenorQueDataMinima retorna false se required for true e valor for undefined', () => {
    component.required = true;
    component.minDate = '2023-01-01';
    expect(component['isMenorQueDataMinima'](undefined)).toBe(true);
  });

  it('isMaiorQueDataMaxima retorna true se valor maior que maxDate', () => {
    component.required = true;
    component.maxDate = '2023-12-31';
    expect(component['isMaiorQueDataMaxima']('2024-01-01')).toBe(true);
  });

  it('isMaiorQueDataMaxima retorna false se required for false', () => {
    component.required = false;
    component.maxDate = '2023-12-31';
    expect(component['isMaiorQueDataMaxima']('2024-01-01')).toBe(false);
  });

  it('isMaiorQueDataMaxima retorna true se required for true e valor for undefined', () => {
    component.required = true;
    component.maxDate = '2023-12-31';
    expect(component['isMaiorQueDataMaxima'](undefined)).toBe(true);
  });

  it('isCampoObrigatorio retorna true se required e vazio', () => {
    component.required = true;
    expect(component['isCampoObrigatorio']('')).toBe(true);
  });

  it('isCampoObrigatorio retorna false se preenchido', () => {
    component.required = true;
    expect(component['isCampoObrigatorio']('2023-01-01')).toBe(false);
  });

  it('deve exibir mensagem de erro obrigatória no template', () => {
    component.required = true;
    component.label = 'Data';
    component['campoTocado'] = true;
    component['isCampoValido']('');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-danger')?.textContent).toContain('O campo Data é obrigatório');
  });

  it('deve exibir mensagem de erro de minDate no template', () => {
    component.required = true;
    component.label = 'Data';
    component.minDate = '2023-01-01';
    component['campoTocado'] = true;
    component['isCampoValido']('2022-12-31');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-danger')?.textContent).toContain('A data deve ser maior ou igual a 01/01/2023');
  });

  it('deve exibir mensagem de erro de maxDate no template', () => {
    component.required = true;
    component.label = 'Data';
    component.maxDate = '2023-12-31';
    component['campoTocado'] = true;
    component['isCampoValido']('2024-01-01');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-danger')?.textContent).toContain('A data deve ser menor ou igual a 31/12/2023');
  });

  it('formatarData deve formatar corretamente a data', () => {
    expect((component as any)['formatarData']('2023-12-31')).toBe('31/12/2023');
    expect((component as any)['formatarData']('')).toBe('');
    expect((component as any)['formatarData'](undefined)).toBe('');
  });
});
