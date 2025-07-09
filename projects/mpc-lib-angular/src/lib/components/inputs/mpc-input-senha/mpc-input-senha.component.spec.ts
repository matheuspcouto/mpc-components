import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputSenhaComponent } from './mpc-input-senha.component';

describe('MpcInputSenhaComponent', () => {
  let component: MpcInputSenhaComponent;
  let fixture: ComponentFixture<MpcInputSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputSenhaComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar o valor ao setValue', () => {
    const event = { target: { value: 'SenhaForte123' } } as any;
    component['setValue'](event);
    expect(component.value).toBe('SenhaForte123');
  });

  it('deve validar campo obrigatório', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar regex da senha', () => {
    component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'senhafraca' } as any);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessage).toContain('formato válido');
  });

  it('deve validar regex da senha - valor inválido', () => {
    component.regexSenha = '12';
    const result = component['isSenhaInvalida']('aaaa');
    expect(result).toBeTruthy();
  });

  it('deve aceitar campo válido', () => {
    component.required = true;
    component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'SenhaForte123' } as any);
    expect(result).toEqual({ "required": true });
  });

  it('deve aceitar campo readonly', () => {
    component.readonly = true;
    const result = component.validate({ value: 'qualquer' } as any);
    expect(result).toBeNull();
  });

  it('deve chamar onFocus', () => {
    const spyOnOnFocus = jest.spyOn(component as any, 'onFocus');
    (component as any).onFocus();
    expect(spyOnOnFocus).toHaveBeenCalled();
  });
});
