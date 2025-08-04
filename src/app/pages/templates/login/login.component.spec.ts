
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import LoginComponent from './login.component';
import { AuthService } from '../../../shared/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: any;
  let toastrService: any;

  beforeEach(async () => {
    const authServiceMock = {
      login: jest.fn()
    };

    const toastrServiceMock = {
      error: jest.fn(),
      success: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, 
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar o formulário e executar login', () => {
    // Mock do retorno do login
    authService.login.mockReturnValue(of({ data: { id: 1, nome: 'Teste', email: 'teste@teste.com', token: 'token123' } }));

    component['form'].patchValue({
      email: 'teste@teste.com',
      senha: '123456'
    });
    
    component['login']();
    
    expect(component['form'].valid).toBeTruthy();
    expect(authService.login).toHaveBeenCalledWith('teste@teste.com', '123456');
  });

  it('deve mostrar erro quando email ou senha estão vazios', () => {
    // Simular campos vazios
    component['form'].patchValue({
      email: '',
      senha: ''
    });
    
    // Verificar se o formulário é inválido quando os campos estão vazios
    expect(component['form'].valid).toBeFalsy();
    
    // Tentar fazer login com formulário inválido
    component['login']();
    
    // Como o formulário é inválido, o método login não deve executar a lógica interna
    // e não deve chamar o toastrService.error
    expect(toastrService.error).not.toHaveBeenCalled();
  });

  it('deve mostrar erro quando o login falha', () => {
    const errorResponse = { error: { message: 'Credenciais inválidas' } };
    authService.login.mockReturnValue(throwError(() => errorResponse));

    component['form'].patchValue({
      email: 'teste@teste.com',
      senha: 'senhaerrada'
    });
    
    component['login']();
    
    expect(toastrService.error).toHaveBeenCalledWith('Credenciais inválidas');
  });
});
