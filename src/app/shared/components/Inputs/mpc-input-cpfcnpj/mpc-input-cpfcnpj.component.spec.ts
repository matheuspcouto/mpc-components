import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputCpfcnpjComponent } from './mpc-input-cpfcnpj.component';

describe('MpcInputCpfcnpjComponent', () => {
  let component: MpcInputCpfcnpjComponent;
  let fixture: ComponentFixture<MpcInputCpfcnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputCpfcnpjComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputCpfcnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir erro se campo obrigatório estiver vazio', () => {
    component.required = true;
    const spy = jest.spyOn(component.error, 'emit');
    component['campoTocado'] = true;
    component['isCampoValido']('');
    expect(spy).toHaveBeenCalledWith({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve emitir erro se CPF/CNPJ for inválido', () => {
    const spy = jest.spyOn(component.error, 'emit');
    component['campoTocado'] = true;
    component['isCampoValido']('123');
    expect(spy).toHaveBeenCalledWith({ regex: true });
    expect((component as any).errorMessage).toContain('não é válido');
  });

  it('deve aceitar campo válido', () => {
    component.required = true;
    component['campoTocado'] = true;
    component['isCampoValido']('52998224725'); // CPF válido
    expect(component['errorMessage']).toBeUndefined();
  });

  it('deve aceitar campo readonly ou disabled', () => {
    component.readonly = true;
    expect(component['isCampoValido'](undefined)).toBe(true);
    component.readonly = false;
    component.disabled = true;
    expect(component['isCampoValido'](undefined)).toBe(true);
  });

  it('deve validar CPF/CNPJ', () => {
    // CNPJ
    expect(component['isCpfCnpjValido']('19100000000197')).toBe(false);
    expect(component['isCpfCnpjValido']('12345678000195')).toBe(true);
    expect(component['isCpfCnpjValido']('11111111111111')).toBe(false);
    expect(component['isCNPJValido']('12345678000194')).toBe(false);
    expect(component['isCNPJValido']('12345678000100')).toBe(false);

    // CPF
    expect(component['isCpfCnpjValido']('52998224725')).toBe(true);
    expect(component['isCpfCnpjValido']('12345678901')).toBe(false);
    expect(component['isCpfCnpjValido']('11111111111')).toBe(false);
    expect(component['isCPFValido']('52998224724')).toBe(false);
    expect(component['isCPFValido']('52998224700')).toBe(false);
    expect(component['isCPFValido'](undefined)).toBe(false);
  });

  it('deve emitir valor ao setValue válido', () => {
    const spy = jest.spyOn(component.valor, 'emit');
    component.required = true;
    component['setValue']({ target: { value: '52998224725' } });
    expect(spy).toHaveBeenCalledWith('52998224725');
  });

  it('deve marcar campo como tocado ao focar', () => {
    component['campoTocado'] = false;
    component['onFocus']();
    expect(component['campoTocado']).toBe(true);
  });

  it('deve formatar valor corretamente', () => {
    component.value = '52998224725';
    expect(component.valorFormatado).toBe('529.982.247-25');
  });

  it('deve chamar isCampoValido no ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'isCampoValido');
    component.value = '52998224725';
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('52998224725');
  });
});
