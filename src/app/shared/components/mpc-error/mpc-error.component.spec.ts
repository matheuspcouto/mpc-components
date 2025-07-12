import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rotas } from '../../enums/rotas-enum';
import { MpcErro, MpcErrorComponent } from './mpc-error.component';
import { MpcErrorService } from './mpc-error.service';

describe('MpcErrorComponent', () => {
  let component: MpcErrorComponent;
  let fixture: ComponentFixture<MpcErrorComponent>;
  let mockRouter: any;
  let mockToastrService: any;
  let mockErrorService: any;

  const mockErro: MpcErro = {
    titulo: 'Erro de Teste',
    mensagem: 'Esta é uma mensagem de erro de teste',
    rotaRetorno: Rotas.HOME
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
      imports: [MpcErrorComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MpcErrorService, useValue: mockErrorService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcErrorComponent);
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

    component['copiarMensagem']('abc');

    expect(writeTextMock).toHaveBeenCalledWith('abc');
    expect(mockToastrService.info).toHaveBeenCalledWith('Copiado para área de transferência', '');
    expect(component['isCopiado']).toBe(true);
  });

  it('não deve copiar mensagem de erro para área de transferência se não houver mensagem', () => {
    component['copiarMensagem'](undefined);
    expect(component['isCopiado']).toBe(false);
  });

  it('deve retornar a imagem padrão se não existir imagem no erro', () => {
    mockErrorService.erro.mockReturnValue({ ...mockErro, imagem: undefined });
    fixture.detectChanges();
    expect(component['imagemErro']()).toBe('assets/img/modal/error.png');
  });
}); 