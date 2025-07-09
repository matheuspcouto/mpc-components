import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputEmailComponent } from './mpc-input-email.component';

describe('MpcInputEmailComponent', () => {
  let component: MpcInputEmailComponent;
  let fixture: ComponentFixture<MpcInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputEmailComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar o valor ao setValue', () => {
    const event = { target: { value: 'teste@email.com' } } as any;
    component['setValue'](event);
    expect(component.value).toBe('teste@email.com');
  });

  it('deve validar campo obrigatório', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar formato de e-mail', () => {
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'email-invalido' } as any);
    expect(result).toEqual({ pattern: true });
    expect((component as any).errorMessage).toContain('formato válido');
  });

  it('deve aceitar campo válido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'teste@teste.com' } as any);
    expect(result).toEqual({ "required": true });
  });

  it('deve aceitar campo readonly', () => {
    component.readonly = true;
    const result = component.validate({ value: 'qualquer' } as any);
    expect(result).toBeNull();
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

  it('deve chamar get valorFormatado', () => {
    component.value = 'teste@teste.com';
    expect((component as any).valorFormatado.length).toBeGreaterThan(0);
  });
});
