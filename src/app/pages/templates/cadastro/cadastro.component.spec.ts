import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import CadastroComponent from './cadastro.component';
import { AuthService } from '../../../shared/services/auth.service';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [CadastroComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockToastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('nome')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('senha')?.value).toBe('');
    expect(component.form.get('cpf')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.form;
    
    expect(form.valid).toBeFalsy();
    
    form.patchValue({
      nome: 'João Silva',
      email: 'joao@email.com',
      senha: '123456',
      cpf: '12345678901'
    });
    
    expect(form.valid).toBeTruthy();
  });

  it('should call cadastrar method when form is valid', () => {
    spyOn(console, 'log');
    
    component.form.patchValue({
      nome: 'João Silva',
      email: 'joao@email.com',
      senha: '123456',
      cpf: '12345678901'
    });

    component.cadastrar();

    expect(console.log).toHaveBeenCalledWith('Dados do cadastro:', {
      nome: 'João Silva',
      email: 'joao@email.com',
      senha: '123456',
      cpf: '12345678901'
    });
    expect(mockToastrService.success).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should show error when form is invalid', () => {
    component.cadastrar();

    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor, preencha todos os campos corretamente!');
  });

  it('should navigate to login when irParaLogin is called', () => {
    component.irParaLogin();

    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
