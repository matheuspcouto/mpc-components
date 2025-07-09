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

    it('deve retornar true para isAbaAtiva quando subRotas contém rota undefined', () => {
      const aba = {
        titulo: 'Test',
        rota: '/test',
        icone: 'icon',
        subRotas: [
          { titulo: 'Sub' }
        ]
      };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/test/sub');
      expect(component.isAbaAtiva(aba)).toBeTruthy();
    });

    it('deve retornar true para isAbaAtiva quando rota é home e url é "/"', () => {
      const aba = { titulo: 'Home', rota: '/', icone: 'home' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/');
      expect(component.isAbaAtiva(aba)).toBeTruthy();
    });

    it('deve retornar true para isAbaAtiva quando rota é home e url é vazio', () => {
      const aba = { titulo: 'Home', rota: '/', icone: 'home' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('');
      expect(component.isAbaAtiva(aba)).toBeTruthy();
    });

    it('deve retornar true para isAbaAtiva quando url começa com a rota', () => {
      const aba = { titulo: 'Teste', rota: '/rota', icone: 'icon' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/rota/alguma-coisa');
      expect(component.isAbaAtiva(aba)).toBeTruthy();
    });

    it('deve retornar false para isAbaAtiva quando url não corresponde', () => {
      const aba = { titulo: 'Teste', rota: '/rota', icone: 'icon' };
      jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/outra');
      expect(component.isAbaAtiva(aba)).toBeFalsy();
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

});
