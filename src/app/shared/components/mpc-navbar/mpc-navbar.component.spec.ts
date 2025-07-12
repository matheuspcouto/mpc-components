import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MpcNavbarComponent } from './mpc-navbar.component';

describe('MpcNavbarComponent', () => {
  let component: MpcNavbarComponent;
  let fixture: ComponentFixture<MpcNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcNavbarComponent],
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
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar abas e abaLogin corretamente no ngOnInit', () => {
    const abasMock = [
      { titulo: 'Home', rota: '/', icone: 'home' },
      { titulo: 'Login', rota: '/login', icone: 'login' }
    ];
    component.abasInput = abasMock;
    component.ngOnInit();
    expect(component.abas.length).toBe(1); // Apenas a aba Home
    expect(component.abaLogin).toEqual(abasMock[1]);
  });

  describe('isAbaAtiva', () => {
    it('deve retornar true para isAbaAtiva quando subRotas contém rota ativa', () => {
      const aba = {
        titulo: 'Test',
        rota: '/test',
        icone: 'icon',
        subRotas: [
          { titulo: 'Sub', rota: '/test/sub' }
        ]
      };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/test/sub');
      expect(component.isAbaAtiva(aba)).toBeTruthy();
    });

    it('deve retornar false para isAbaAtiva quando subRotas contém rota undefined', () => {
      const aba = {
        titulo: 'Test',
        rota: '/test',
        icone: 'icon',
        subRotas: [
          { titulo: 'Sub' }
        ]
      };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/test/sub');
      expect(component.isAbaAtiva(aba)).toBeFalsy();
    });

    it('deve retornar true para isAbaAtiva quando rota é home e url é home', () => {
      const aba = { titulo: 'Home', rota: '/', icone: 'home' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/');
      expect(component.isAbaAtiva(aba)).toBeTruthy();
    });

    it('deve retornar true para isAbaAtiva quando rota é home e url é vazio', () => {
      const aba = { titulo: 'Home', rota: '/', icone: 'home' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('');
      expect(component.isAbaAtiva(aba)).toBeTruthy();
    });

    it('deve retornar false para isAbaAtiva quando url começa com a rota', () => {
      const aba = { titulo: 'Teste', rota: '/rota', icone: 'icon' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/rota/alguma-coisa');
      expect(component.isAbaAtiva(aba)).toBeFalsy();
    });

    it('deve retornar false para isAbaAtiva quando url não corresponde', () => {
      const aba = { titulo: 'Teste', rota: '/rota', icone: 'icon' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/outra');
      expect(component.isAbaAtiva(aba)).toBeFalsy();
    });

    it('deve ignorar sub-rota com rota "/" em isAbaAtiva', () => {
      const aba = {
        titulo: 'Test',
        rota: '/test',
        icone: 'icon',
        subRotas: [
          { titulo: 'Sub', rota: '/' }
        ]
      };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/');
      expect(component.isAbaAtiva(aba)).toBe(false);
    });

  });

  describe('isSubAbaAtiva', () => {
    it('deve retornar true para isSubAbaAtiva quando url começa com a sub-rota', () => {
      const sub = { titulo: 'Sub', rota: '/rota/sub' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/rota/sub/extra');
      expect(component.isSubAbaAtiva(sub)).toBeTruthy();
    });

    it('deve retornar false para isSubAbaAtiva quando url não corresponde', () => {
      const sub = { titulo: 'Sub', rota: '/rota/sub' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/outra');
      expect(component.isSubAbaAtiva(sub)).toBeFalsy();
    });

    it('deve retornar false para isSubAbaAtiva quando sub.rota é undefined', () => {
      const sub = { titulo: 'Sub' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/qualquer');
      expect(component.isSubAbaAtiva(sub)).toBeFalsy();
    });

    it('deve retornar true para isSubAbaAtiva quando sub.rota === "/" e url é "/"', () => {
      const sub = { titulo: 'Sub', rota: '/' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/');
      expect(component.isSubAbaAtiva(sub)).toBe(true);
    });

    it('deve retornar true para isSubAbaAtiva quando sub.rota === "/" e url é vazio', () => {
      const sub = { titulo: 'Sub', rota: '/' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('');
      expect(component.isSubAbaAtiva(sub)).toBe(true);
    });
  });

  describe('isAbaLogin', () => {
    it('deve identificar aba de login pelo título', () => {
      const aba = { titulo: 'Login', rota: '/qualquer', icone: 'icon' };
      expect(component.isAbaLogin(aba)).toBeTruthy();
    });

    it('deve identificar aba de login pela rota', () => {
      const aba = { titulo: 'Entrar', rota: '/login', icone: 'icon' };
      expect(component.isAbaLogin(aba)).toBeTruthy();
    });

    it('não deve identificar aba de login se não for login', () => {
      const aba = { titulo: 'Home', rota: '/', icone: 'icon' };
      expect(component.isAbaLogin(aba)).toBeFalsy();
    });
  });

  describe('navegação e métodos privados', () => {
    let routerMock: any;
    beforeEach(() => {
      routerMock = {
        url: '/',
        navigate: jest.fn(),
        createUrlTree: jest.fn().mockReturnValue('urlTree'),
        serializeUrl: jest.fn().mockReturnValue('/rota'),
      };
      Object.defineProperty(component, 'router', { get: () => routerMock });
    });

    it('deve navegar para rota existente sem fragment', () => {
      jest.spyOn<any, any>(component as any, 'verificarRotaExiste').mockReturnValue(true);
      component.navegarPara('/rota');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/rota']);
    });

    it('deve navegar para rota existente com fragment', () => {
      jest.spyOn<any, any>(component as any, 'verificarRotaExiste').mockReturnValue(true);
      component.navegarPara('/rota', 'frag');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/rota'], { fragment: 'frag' });
    });

    it('não deve navegar para rota inexistente', () => {
      jest.spyOn<any, any>(component as any, 'verificarRotaExiste').mockReturnValue(false);
      component.navegarPara('/rota');
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('deve navegar para aba', () => {
      jest.spyOn(component, 'navegarPara');
      const aba = { titulo: 'Aba', rota: '/rota', icone: 'icon' };
      component.navegarParaAba(aba);
      expect(component.navegarPara).toHaveBeenCalledWith('/rota');
    });

    it('deve navegar para sub-rota com rota', () => {
      jest.spyOn(component, 'navegarPara');
      const sub = { titulo: 'Sub', rota: '/rota/sub' };
      component.navegarParaSubRota(sub);
      expect(component.navegarPara).toHaveBeenCalledWith('/rota/sub');
    });

    it('deve navegar para sub-rota com fragment', () => {
      jest.spyOn(component, 'navegarPara');
      const sub = { titulo: 'Sub', fragment: 'frag' };
      component.navegarParaSubRota(sub, '/rota');
      expect(component.navegarPara).toHaveBeenCalledWith('/rota', 'frag');
    });

    it('deve exibir warning se sub-rota não tem rota nem fragmento', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const sub = { titulo: 'Sub' };
      component.navegarParaSubRota(sub);
      expect(warnSpy).toHaveBeenCalledWith('MpcNavbar: Sub-rota sem rota ou fragmento válido');
      warnSpy.mockRestore();
    });

    it('deve navegar para home', () => {
      jest.spyOn(component, 'navegarPara');
      component.navegarParaHome();
      expect(component.navegarPara).toHaveBeenCalledWith('/');
    });

    it('deve navegar para login se abaLogin existir', () => {
      jest.spyOn(component, 'navegarPara');
      component.abaLogin = { titulo: 'Login', rota: '/login', icone: 'icon' };
      component.navegarParaLogin();
      expect(component.navegarPara).toHaveBeenCalledWith('/login');
    });

    it('não deve navegar para login se abaLogin não existir', () => {
      jest.spyOn(component, 'navegarPara');
      component.abaLogin = undefined as any;
      component.navegarParaLogin();
      expect(component.navegarPara).not.toHaveBeenCalled();
    });

    describe('verificarRotaExiste', () => {
      it('deve retornar true para rota /', () => {
        expect((component as any).verificarRotaExiste('/')).toBe(true);
      });
      it('deve retornar true para rota válida', () => {
        routerMock.createUrlTree = jest.fn().mockReturnValue('urlTree');
        routerMock.serializeUrl = jest.fn().mockReturnValue('/rota');
        expect((component as any).verificarRotaExiste('/rota')).toBe(true);
      });
      it('deve retornar false e logar erro para rota inválida', () => {
        routerMock.createUrlTree = jest.fn(() => { throw new Error('erro'); });
        const errorSpy = jest.spyOn(console, 'error').mockImplementation();
        expect((component as any).verificarRotaExiste('/rota')).toBe(false);
        expect(errorSpy).toHaveBeenCalled();
        errorSpy.mockRestore();
      });
    });
  });

});
