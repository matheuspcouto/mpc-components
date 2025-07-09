import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MpcInputCpfcnpjComponent } from './mpc-input-cpfcnpj.component';

describe('MpcInputCpfcnpjComponent', () => {
  let component: MpcInputCpfcnpjComponent;
  let fixture: ComponentFixture<MpcInputCpfcnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputCpfcnpjComponent, ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputCpfcnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve escrever valor via writeValue', () => {
    component.writeValue('12345678901');
    expect(component.value).toBe('12345678901');
  });

  it('deve registrar onChange e onTouched', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.registerOnTouched(fn);
    component.onChange('abc');
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });

  it('deve validar campo obrigatório vazio', () => {
    component.required = true;
    (component as any).campoTocado = true;
    component.value = '';
    const control = new FormControl('');
    const result = component.validate(control);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar CPF/CNPJ inválido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    component.value = '123';
    const control = new FormControl('123');
    const result = component.validate(control);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessage).toContain('não é válido');
  });

  it('deve aceitar CPF válido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    component.value = '52998224725';
    const control = new FormControl('52998224725');
    const result = component.validate(control);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve aceitar campo readonly ou disabled', () => {
    component.readonly = true;
    component.value = '';
    const control = new FormControl('');
    expect(component.validate(control)).toBeNull();
    component.readonly = false;
    component.disabled = true;
    expect(component.validate(control)).toBeNull();
  });

  it('deve formatar valor corretamente', () => {
    component.value = '52998224725';
    expect(component.valorFormatado).toBe('529.982.247-25');
  });

  it('deve atualizar valor e disparar onChange/onTouched ao setValue', () => {
    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);
    (component as any).setValue({ target: { value: '52998224725' } });
    expect(component.value).toBe('52998224725');
    expect(onChange).toHaveBeenCalledWith('52998224725');
    expect(onTouched).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBeTruthy();
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

  it('deve validar corretamente CPF e CNPJ', () => {
    // ---- Testes de CPF ----
    // CPF inválido (tamanho errado)
    expect((component as any).isCPFValido('123')).toBe(false);
    // CPF inválido (dígitos repetidos)
    expect((component as any).isCPFValido('11111111111')).toBe(false);
    // CPF inválido (dígito verificador errado)
    expect((component as any).isCPFValido('52998224724')).toBe(false);
    // CPF válido
    expect((component as any).isCPFValido('52998224725')).toBe(true);
    // CPF: 39053344710 (primeiro dígito verificador = 10, deve virar 0)
    expect((component as any).isCPFValido('39053344710')).toBe(false);
    // CPF: 74697131401 (segundo dígito verificador = 10, deve virar 0)
    expect((component as any).isCPFValido('74697131401')).toBe(true);

    // ---- Testes de CNPJ ----
    // CNPJ inválido (tamanho errado)
    expect((component as any).isCNPJValido('123')).toBe(false);
    // CNPJ inválido (dígitos repetidos)
    expect((component as any).isCNPJValido('11111111111111')).toBe(false);
    // CNPJ inválido (dígito verificador errado)
    expect((component as any).isCNPJValido('11222333000180')).toBe(false);
    // CNPJ válido
    expect((component as any).isCNPJValido('11222333000181')).toBe(true);
  });

  it('isCpfCnpjValido deve chamar isCPFValido para valores de até 11 dígitos', () => {
    const spy = jest.spyOn(component as any, 'isCPFValido');
    (component as any).isCpfCnpjValido('52998224725');
    expect(spy).toHaveBeenCalledWith('52998224725');
  });

  it('isCpfCnpjValido deve chamar isCNPJValido para valores maiores que 11 dígitos', () => {
    const spy = jest.spyOn(component as any, 'isCNPJValido');
    (component as any).isCpfCnpjValido('11222333000181');
    expect(spy).toHaveBeenCalledWith('11222333000181');
  });

  it('validate deve retornar erro regex se valor inválido e campo não obrigatório', () => {
    component.required = false;
    (component as any).campoTocado = true;
    component.value = '123';
    const control = new FormControl('123');
    const result = component.validate(control);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessage).toContain('não é válido');
  });
});
