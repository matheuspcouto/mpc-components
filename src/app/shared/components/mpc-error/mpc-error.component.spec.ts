import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Rotas } from '../../enums/rotas-enum';
import { MpcErro, MpcErrorComponent } from './mpc-error.component';
import { MpcErrorService } from './mpc-error.service';

describe('MpcErrorComponent', () => {
  let component: MpcErrorComponent;
  let fixture: ComponentFixture<MpcErrorComponent>;
  let mockRouter: any;
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

    mockErrorService = {
      erro: jest.fn().mockReturnValue(mockErro),
      limparErro: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MpcErrorComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
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

  describe('propriedades do componente', () => {
    it('deve ter exibirErro definido', () => {
      expect(component['exibirErro']).toBeDefined();
    });

    it('deve ter erro definido', () => {
      expect(component['erro']).toBeDefined();
    });

    it('deve ter imagemErro definido', () => {
      expect(component['imagemErro']).toBeDefined();
    });

    it('deve inicializar isCopiado como false', () => {
      expect(component['isCopiado']).toBe(false);
    });
  });

  describe('voltar', () => {
    it('deve navegar para rota de retorno e limpar erro quando há erro', () => {
      const navigateSpy = jest.spyOn(mockRouter, 'navigate');
      const limparErroSpy = jest.spyOn(mockErrorService, 'limparErro');

      component['voltar']();

      expect(navigateSpy).toHaveBeenCalledWith([mockErro.rotaRetorno]);
      expect(limparErroSpy).toHaveBeenCalled();
    });

    it('deve não fazer nada quando não há erro', () => {
      mockErrorService.erro.mockReturnValue(null);
      fixture = TestBed.createComponent(MpcErrorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const navigateSpy = jest.spyOn(mockRouter, 'navigate');
      const limparErroSpy = jest.spyOn(mockErrorService, 'limparErro');

      component['voltar']();

      expect(navigateSpy).not.toHaveBeenCalled();
      expect(limparErroSpy).not.toHaveBeenCalled();
    });
  });

  describe('copiarMensagem', () => {
    beforeEach(() => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn()
        }
      });
    });

    it('deve copiar mensagem e exibir notificação', async () => {
      const mensagem = 'Mensagem de erro para copiar';
      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

      component['copiarMensagem'](mensagem);

      expect(writeTextSpy).toHaveBeenCalledWith(mensagem);
      expect(component['isCopiado']).toBe(true);
    });

    it('deve não fazer nada quando mensagem é undefined', () => {
      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      component['copiarMensagem'](undefined);

      expect(writeTextSpy).not.toHaveBeenCalled();
      expect(component['isCopiado']).toBe(false);
    });

    it('deve não fazer nada quando mensagem é null', () => {
      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      component['copiarMensagem'](null as any);

      expect(writeTextSpy).not.toHaveBeenCalled();
      expect(component['isCopiado']).toBe(false);
    });

    it('deve resetar isCopiado após 3 segundos', async () => {
      jest.useFakeTimers();
      const mensagem = 'Mensagem de erro para copiar';
      jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

      component['copiarMensagem'](mensagem);
      expect(component['isCopiado']).toBe(true);

      jest.advanceTimersByTime(3000);
      expect(component['isCopiado']).toBe(false);

      jest.useRealTimers();
    });
  });
}); 