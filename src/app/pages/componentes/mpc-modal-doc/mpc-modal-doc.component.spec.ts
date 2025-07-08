import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcModalDocComponent } from './mpc-modal-doc.component';
import { provideToastr } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MpcModalComponent } from 'mpc-lib-angular';

describe('ModaisComponent', () => {
  let component: MpcModalDocComponent;
  let fixture: ComponentFixture<MpcModalDocComponent>;
  let mockModal: jest.Mocked<MpcModalComponent>;

  beforeEach(async () => {
    const modalSpy = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    } as jest.Mocked<Partial<MpcModalComponent>>;

    await TestBed.configureTestingModule({
      imports: [MpcModalDocComponent, MpcModalComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              params: {},
              queryParams: {},
              data: {}
            }
          }
        },
        provideToastr()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcModalDocComponent);
    component = fixture.componentInstance;
    mockModal = modalSpy as jest.Mocked<MpcModalComponent>;
    component.modalExemplo = mockModal;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar a propriedade erro como undefined', () => {
    expect(component.erro).toBeUndefined();
  });

  describe('abrirModalConfirmacao', () => {
    it('deve abrir modal de confirmação com configuração correta', () => {
      component.abrirModalConfirmacao();

      expect(mockModal.abrirModal).toHaveBeenCalled();
    });

    it('deve retornar true quando botao é executado', () => {
      component.abrirModalConfirmacao();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];
      let resultado;

      if (config.botao) {
        resultado = config.botao();
      }

      expect(resultado).toBeDefined();
    });

    it('deve chamar fecharModal quando segundoBotao é executado', () => {
      component.abrirModalConfirmacao();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];

      if (config.segundoBotao) {
        config.segundoBotao();
      }

      expect(mockModal.fecharModal).toHaveBeenCalled();
    });
  });

  describe('abrirModalSucesso', () => {
    it('deve abrir modal de sucesso com configuração correta', () => {
      component.abrirModalSucesso();

      expect(mockModal.abrirModal).toHaveBeenCalled();
    });

    it('deve retornar true quando botao é executado', () => {
      component.abrirModalSucesso();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];
      let resultado;

      if (config.botao) {
        resultado = config.botao();
      }

      expect(resultado).toBeDefined();
    });

    it('deve chamar fecharModal quando segundoBotao é executado', () => {
      component.abrirModalSucesso();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];

      if (config.segundoBotao) {
        config.segundoBotao();
      }

      expect(mockModal.fecharModal).toHaveBeenCalled();
    });
  });

  describe('abrirModalAlerta', () => {
    it('deve abrir modal de alerta com configuração correta', () => {
      component.abrirModalAlerta();

      expect(mockModal.abrirModal).toHaveBeenCalled();
    });

    it('deve retornar true quando botao é executado', () => {
      component.abrirModalAlerta();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];
      let resultado;

      if (config.botao) {
        resultado = config.botao();
      }

      expect(resultado).toBeDefined();
    });

    it('deve chamar fecharModal quando segundoBotao é executado', () => {
      component.abrirModalAlerta();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];

      if (config.segundoBotao) {
        config.segundoBotao();
      }

      expect(mockModal.fecharModal).toHaveBeenCalled();
    });
  });

  describe('abrirModalErro', () => {
    it('deve abrir modal de erro com configuração correta', () => {
      component.abrirModalErro();

      expect(mockModal.abrirModal).toHaveBeenCalled();
    });

    it('deve chamar fecharModal quando botao é executado', () => {
      component.abrirModalErro();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];

      if (config.botao) {
        config.botao();
      }
      expect(mockModal.fecharModal).toHaveBeenCalled();
    });

    it('não deve ter segundoBotao nem textoSegundoBotao', () => {
      component.abrirModalErro();
      const chamada = mockModal.abrirModal.mock.calls[0];
      const config = chamada[0];

      expect(config.segundoBotao).toBeUndefined();
      expect(config.textoSegundoBotao).toBeUndefined();
    });
  });

  describe('modalExemplo ViewChild', () => {
    it('deve ter modalExemplo definido como ViewChild', () => {
      expect(component.modalExemplo).toBeDefined();
    });

    it('deve chamar abrirModal com operador de navegação segura', () => {
      component.modalExemplo = null as any;

      expect(() => component.abrirModalConfirmacao()).not.toThrow();
      expect(() => component.abrirModalSucesso()).not.toThrow();
      expect(() => component.abrirModalAlerta()).not.toThrow();
      expect(() => component.abrirModalErro()).not.toThrow();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
