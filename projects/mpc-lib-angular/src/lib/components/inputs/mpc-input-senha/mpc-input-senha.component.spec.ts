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
    const event = { target: { value: 'SenhaForte123!' } } as any;
    component['setValue'](event);
    expect(component.value).toBe('SenhaForte123!');
  });

  it('deve validar campo obrigatório', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessages).toContain('O campo senha é obrigatório');
  });

  it('deve validar regex da senha - senha fraca', () => {
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'senhafraca' } as any);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessages).toContain('A senha deve ter no mínimo 8 caracteres');
    expect((component as any).errorMessages).toContain('A senha deve conter pelo menos uma letra maiúscula');
    expect((component as any).errorMessages).toContain('A senha deve conter pelo menos um número');
    expect((component as any).errorMessages).toContain('A senha deve conter pelo menos um caractere especial (@$!%*?&)');
  });

  it('deve validar regex da senha - sem caractere especial', () => {
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'SenhaForte123' } as any);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessages).toContain('A senha deve conter pelo menos um caractere especial (@$!%*?&_-)');
  });

  it('deve validar regex da senha - sem letra maiúscula', () => {
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'senhaforte123!' } as any);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessages).toContain('A senha deve conter pelo menos uma letra maiúscula');
  });

  it('deve validar regex da senha - sem letra minúscula', () => {
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'SENHAFORTE123!' } as any);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessages).toContain('A senha deve conter pelo menos uma letra minúscula');
  });

  it('deve validar regex da senha - sem número', () => {
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'SenhaForte!' } as any);
    expect(result).toEqual({ regex: true });
    expect((component as any).errorMessages).toContain('A senha deve conter pelo menos um número');
  });

  it('deve aceitar senha válida', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: 'SenhaForte123!' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessages.length).toBe(0);
  });

  it('deve aceitar campo readonly', () => {
    component.readonly = true;
    const result = component.validate({ value: 'qualquer' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessages.length).toBe(0);
  });

  it('deve aceitar campo disabled', () => {
    component.disabled = true;
    const result = component.validate({ value: 'qualquer' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessages.length).toBe(0);
  });

  it('deve chamar onFocus', () => {
    const spyOnOnFocus = jest.spyOn(component as any, 'onFocus');
    (component as any).onFocus();
    expect(spyOnOnFocus).toHaveBeenCalled();
  });

  it('deve validar senha com caracteres especiais válidos', () => {
    const senhasValidas = [
      'Senha123@',
      'MinhaSenha$',
      'Teste123!',
      'Password1%',
      'Secure123*',
      'MyPass123?',
      'SenhaForte123&',
      'Senha123_',
      'Senha123-',
      'Senha_Forte123',
      'Senha-Forte123'
    ];

    senhasValidas.forEach(senha => {
      const result = component['validarSenha'](senha);
      expect(result.length).toBe(0);
    });
  });

  it('deve rejeitar senhas inválidas', () => {
    const senhasInvalidas = [
      'senha', // muito curta
      'senhafraca', // sem maiúscula, número e caractere especial
      'SENHAFRACA', // sem minúscula, número e caractere especial
      'SenhaFraca', // sem número e caractere especial
      'Senha123', // sem caractere especial
      'senha123!', // sem maiúscula
      'SENHA123!', // sem minúscula
      'SenhaForte!', // sem número
      '12345678', // só números
      'abcdefgh', // só letras minúsculas
      'ABCDEFGH', // só letras maiúsculas
      '!@#$%^&*' // só caracteres especiais
    ];

    senhasInvalidas.forEach(senha => {
      const result = component['validarSenha'](senha);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  it('deve retornar múltiplos erros para senha fraca', () => {
    const senhaFraca = 'senha';
    const errors = component['validarSenha'](senhaFraca);
    expect(errors).toContain('A senha deve ter no mínimo 8 caracteres');
    expect(errors).toContain('A senha deve conter pelo menos uma letra maiúscula');
    expect(errors).toContain('A senha deve conter pelo menos um número');
    expect(errors).toContain('A senha deve conter pelo menos um caractere especial (@$!%*?&_-)');
  });

  it('deve verificar se há erros com getter hasErrors', () => {
    expect(component.hasErrors).toBeFalsy();
    
    (component as any).errorMessages = ['Erro teste'];
    expect(component.hasErrors).toBeTruthy();
    
    (component as any).errorMessages = [];
    expect(component.hasErrors).toBeFalsy();
  });
});
