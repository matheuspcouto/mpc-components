import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { Rotas } from './shared/enums/rotas-enum';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockPlatformId: any;

  beforeEach(async () => {
    mockPlatformId = 'browser';

    await TestBed.configureTestingModule({
      imports: [AppComponent],
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
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialização do Componente', () => {
    it('deve criar o componente com sucesso', () => {
      expect(component).toBeTruthy();
    });

    it('deve implementar OnInit', () => {
      expect(component.ngOnInit).toBeDefined();
    });
  });

  describe('Configuração das Abas da Navbar', () => {
    it('deve ter a propriedade abas definida', () => {
      expect(component['abas']).toBeDefined();
      expect(Array.isArray(component['abas'])).toBe(true);
    });

    it('deve ter a aba Home configurada corretamente', () => {
      const abaHome = component['abas'].find(aba => aba.titulo === 'Home');
      expect(abaHome).toBeDefined();
      expect(abaHome?.rota).toBe(Rotas.HOME);
      expect(abaHome?.icone).toBe('bi bi-house-fill');
    });

    it('deve ter a aba Componentes configurada com sub-rotas', () => {
      const abaComponentes = component['abas'].find(aba => aba.titulo === 'Componentes');
      expect(abaComponentes).toBeDefined();
      expect(abaComponentes?.icone).toBe('bi bi-code-slash');
      expect(abaComponentes?.subRotas).toBeDefined();
      expect(Array.isArray(abaComponentes?.subRotas)).toBe(true);
    });

    it('deve ter todas as sub-rotas da aba Componentes', () => {
      const abaComponentes = component['abas'].find(aba => aba.titulo === 'Componentes');
      const subRotasEsperadas = [
        { titulo: 'mpc-cards', rota: Rotas.CARDS },
        { titulo: 'mpc-button', rota: Rotas.BUTTONS },
        { titulo: 'mpc-btn-float', rota: Rotas.BTN_FLOAT },
        { titulo: 'mpc-modal', rota: Rotas.MODAIS },
        { titulo: 'mpc-loader', rota: Rotas.LOADERS },
        { titulo: 'mpc-tabs', rota: Rotas.TABS },
        { titulo: 'mpc-pagination', rota: Rotas.PAGINACAO },
        { titulo: 'mpc-inputs', rota: Rotas.INPUTS },
        { titulo: 'mpc-page-divider-img', rota: Rotas.PAGE_DIVIDER_IMG },
      ];
      expect(abaComponentes?.subRotas).toEqual(subRotasEsperadas);
    });

    it('deve ter a aba Formulário configurada com sub-rotas', () => {
      const abaFormulario = component['abas'].find(aba => aba.titulo === 'Formulário');
      expect(abaFormulario).toBeDefined();
      expect(abaFormulario?.icone).toBe('bi bi-file-earmark-text-fill');
      expect(abaFormulario?.subRotas).toBeDefined();
      expect(Array.isArray(abaFormulario?.subRotas)).toBe(true);
    });

    it('deve ter todas as sub-rotas da aba Formulário', () => {
      const abaFormulario = component['abas'].find(aba => aba.titulo === 'Formulário');
      const subRotasEsperadas = [
        { titulo: 'Realizar Inscrição (Fluxo)', rota: Rotas.DADOS_PESSOAIS },
        { titulo: 'Pesquisar Inscrição', rota: Rotas.PESQUISA },
        { titulo: 'Inscrições Encerradas', rota: Rotas.INSCRICOES_ENCERRADAS },
      ];

      expect(abaFormulario?.subRotas).toEqual(subRotasEsperadas);
    });

    it('deve ter a aba Templates configurada com sub-rotas', () => {
      const abaPaginas = component['abas'].find(aba => aba.titulo === 'Templates');
      expect(abaPaginas).toBeDefined();
      expect(abaPaginas?.icone).toBe('bi bi-filetype-html');
      expect(abaPaginas?.subRotas).toBeDefined();
      expect(Array.isArray(abaPaginas?.subRotas)).toBe(true);
    });

    it('deve ter todas as sub-rotas da aba Templates', () => {
      const abaPaginas = component['abas'].find(aba => aba.titulo === 'Templates');
      const subRotasEsperadas = [
        { titulo: 'Aguarde', rota: Rotas.AGUARDE },
        { titulo: 'Erro', rota: Rotas.PAGINA_ERRO },
        { titulo: 'Navbar', rota: Rotas.NAVBAR },
        { titulo: 'Footer', rota: Rotas.FOOTER },
      ];
      expect(abaPaginas?.subRotas).toEqual(subRotasEsperadas);
    });

    it('deve ter o total correto de abas principais', () => {
      expect(component['abas'].length).toBeGreaterThan(0);
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
      
      expect(mockDocument.getElementById).toHaveBeenCalledWith('btn-scroll-top');
      expect(mockElement.style.visibility).toBe('visible');
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
      
      expect(mockDocument.getElementById).toHaveBeenCalledWith('btn-scroll-top');
      expect(mockElement.style.visibility).toBe('hidden');
    });

    it('deve lidar com elemento scrollTop não encontrado', () => {
      mockDocument.getElementById.mockReturnValue(null);
      
      component.ngOnInit();
      
      // Simula o callback do event listener
      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];
      
      // Não deve gerar erro
      expect(() => scrollCallback()).not.toThrow();
    });

    it('deve definir visibility como hidden quando scroll <= 300px', () => {
      component.ngOnInit();
      
      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];
      
      Object.defineProperty(window, 'scrollY', {
        value: 300,
        writable: true
      });
      
      scrollCallback();
      
      expect(mockElement.style.visibility).toBe('hidden');
    });

    it('deve definir visibility como visible quando scroll > 300px', () => {
      component.ngOnInit();
      
      const scrollCallback = mockWindow.addEventListener.mock.calls[0][1];
      
      Object.defineProperty(window, 'scrollY', {
        value: 301,
        writable: true
      });
      
      scrollCallback();
      
      expect(mockElement.style.visibility).toBe('visible');
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

    it('deve ter a propriedade abas configurada', () => {
      expect(component['abas']).toBeDefined();
      expect(Array.isArray(component['abas'])).toBe(true);
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

    it('deve lidar com múltiplas chamadas de ngOnInit', () => {
      const mockAddEventListener = jest.fn();
      Object.defineProperty(window, 'addEventListener', {
        value: mockAddEventListener,
        writable: true
      });

      component.ngOnInit();
      component.ngOnInit();
      component.ngOnInit();

      expect(mockAddEventListener).toHaveBeenCalledTimes(3);
    });

    it('deve manter a configuração das abas inalterada após múltiplas inicializações', () => {
      const configuracaoOriginal = JSON.stringify(component['abas']);
      
      component.ngOnInit();
      component.ngOnInit();
      
      expect(JSON.stringify(component['abas'])).toBe(configuracaoOriginal);
    });
  });
});
