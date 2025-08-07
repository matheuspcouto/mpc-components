import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './shared/services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockPlatformId: any;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockPlatformId = 'browser';

    const authServiceMock = {
      isAuthenticated: jest.fn().mockReturnValue(false),
      getUsuarioAtual: jest.fn(),
      getAuthToken: jest.fn(),
      login: jest.fn(),
      logout: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: ['/']
            }
          }
        },
        {
          provide: PLATFORM_ID,
          useValue: mockPlatformId
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  });

  describe('Inicialização do Componente', () => {
    it('deve criar o componente com sucesso', () => {
      expect(component).toBeTruthy();
    });

    it('deve implementar OnInit', () => {
      expect(component.ngOnInit).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    let mockWindow: any;
    let mockDocument: any;
    let mockElement: any;

    beforeEach(() => {
      mockElement = {
        style: {
          visibility: ''
        }
      };

      mockDocument = {
        getElementById: jest.fn().mockReturnValue(mockElement)
      };

      mockWindow = {
        addEventListener: jest.fn(),
        scrollY: 0
      };

      Object.defineProperty(window, 'addEventListener', {
        value: mockWindow.addEventListener,
        writable: true
      });

      Object.defineProperty(window, 'scrollY', {
        value: mockWindow.scrollY,
        writable: true
      });

      Object.defineProperty(document, 'getElementById', {
        value: mockDocument.getElementById,
        writable: true
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('deve adicionar event listener de scroll quando executado no browser', () => {
      component.ngOnInit();
      expect(mockWindow.addEventListener).toHaveBeenCalled();
    });

    it('deve mostrar o botão scroll-to-top quando scroll > 300px', () => {
      component.ngOnInit();

      // Simula o callback do event listener
      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];

      // Simula scroll > 300px
      Object.defineProperty(window, 'scrollY', {
        value: 400,
        writable: true
      });

      scrollCallback();

      expect(component['showScrollTop']).toBe(true);
    });

    it('deve ocultar o botão scroll-to-top quando scroll <= 300px', () => {
      component.ngOnInit();

      // Simula o callback do event listener
      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];

      // Simula scroll <= 300px
      Object.defineProperty(window, 'scrollY', {
        value: 200,
        writable: true
      });

      scrollCallback();

      expect(component['showScrollTop']).toBe(false);
    });

    it('deve lidar com elemento scrollTop não encontrado', () => {
      mockDocument.getElementById.mockReturnValue(null);

      component.ngOnInit();

      // Simula o callback do event listener
      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];

      // Não deve gerar erro
      expect(() => scrollCallback()).not.toThrow();
    });

    it('deve definir showScrollTop como false quando scroll <= 300px', () => {
      component.ngOnInit();

      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];

      Object.defineProperty(window, 'scrollY', {
        value: 300,
        writable: true
      });

      scrollCallback();

      expect(component['showScrollTop']).toBe(false);
    });

    it('deve definir showScrollTop como true quando scroll > 300px', () => {
      component.ngOnInit();

      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];

      Object.defineProperty(window, 'scrollY', {
        value: 301,
        writable: true
      });

      scrollCallback();

      expect(component['showScrollTop']).toBe(true);
    });
  });

  describe('scrollToTop', () => {
    let mockWindow: any;

    beforeEach(() => {
      mockWindow = {
        scrollTo: jest.fn()
      };

      Object.defineProperty(window, 'scrollTo', {
        value: mockWindow.scrollTo,
        writable: true
      });
    });

    it('deve chamar window.scrollTo com comportamento smooth quando executado no browser', () => {
      component['scrollToTop']();

      expect(mockWindow.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('deve chamar window.scrollTo apenas uma vez', () => {
      component['scrollToTop']();

      expect(mockWindow.scrollTo).toHaveBeenCalledTimes(1);
    });
  });

  describe('Injeção de Dependências', () => {
    it('deve ter platformId injetado corretamente', () => {
      expect(component['platformId']).toBe(mockPlatformId);
    });
  });

  describe('Estrutura do Componente', () => {
    it('deve ter o seletor correto', () => {
      expect(component.constructor.name).toBe('AppComponent');
    });

    it('deve ter o método ngOnInit definido', () => {
      expect(typeof component.ngOnInit).toBe('function');
    });

    it('deve ter o método scrollToTop definido', () => {
      expect(typeof component['scrollToTop']).toBe('function');
    });
  });

  describe('Cobertura de Código - Casos Extremos', () => {
    it('deve lidar com múltiplas chamadas de scrollToTop', () => {
      const mockScrollTo = jest.fn();
      Object.defineProperty(window, 'scrollTo', {
        value: mockScrollTo,
        writable: true
      });

      component['scrollToTop']();
      component['scrollToTop']();
      component['scrollToTop']();

      expect(mockScrollTo).toHaveBeenCalledTimes(3);
    });
  });
});
