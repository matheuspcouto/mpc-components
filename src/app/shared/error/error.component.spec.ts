import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorComponent } from './error.component';
import { ErrorService } from './error.service';
import { Erro } from './error.interface';
import { Rotas } from '../enums/rotas-enum';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let mockRouter: any;
  let mockToastrService: any;
  let mockErrorService: any;

  const mockErro: Erro = {
    titulo: 'Erro de Teste',
    mensagem: 'Esta é uma mensagem de erro de teste',
    rotaRetorno: Rotas.HOME,
    imagem: 'assets/img/modal/error.png'
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    };

    mockToastrService = {
      info: jest.fn(),
      error: jest.fn()
    };

    mockErrorService = {
      erro: jest.fn().mockReturnValue(mockErro),
      limparErro: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ErrorComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ErrorService, useValue: mockErrorService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir informações do erro', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-title').textContent).toContain(mockErro.titulo);
    expect(compiled.querySelector('.error-description').textContent).toContain(mockErro.mensagem);
  });

  it('deve exibir a imagem do erro', () => {
    const compiled = fixture.nativeElement;
    const imgElement = compiled.querySelector('.error-image');
    expect(imgElement.src).toContain(mockErro.imagem);
  });

  it('deve usar imagem padrão quando não há imagem no erro', () => {
    const erroSemImagem = { ...mockErro, imagem: undefined };
    mockErrorService.erro.mockReturnValue(erroSemImagem);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const imgElement = compiled.querySelector('.error-image');
    expect(imgElement.src).toContain('assets/img/modal/error.png');
  });

  it('deve navegar para rota de retorno quando voltar for chamado', () => {
    component['voltar']();
    expect(mockRouter.navigate).toHaveBeenCalledWith([mockErro.rotaRetorno]);
    expect(mockErrorService.limparErro).toHaveBeenCalled();
  });

  it('deve copiar mensagem de erro para área de transferência', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    component['copiarMensagem']();

    expect(writeTextMock).toHaveBeenCalledWith(mockErro.mensagem);
    expect(mockToastrService.info).toHaveBeenCalledWith('Copiado para área de transferência', '');
    expect(component['isCopiado']).toBe(true);
  });
}); 