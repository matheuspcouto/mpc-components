import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardComponent, CardLinks } from './mpc-card.component';

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  window.dispatchEvent(new Event('resize'));
}

describe('MpcCardComponent', () => {
  let component: MpcCardComponent;
  let fixture: ComponentFixture<MpcCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks?.();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter valores padrão', () => {
    expect(component.imagem).toBe('');
    expect(component.layout).toBe('vertical');
    expect(component.links).toEqual([]);
  });

  describe('getImagemCard', () => {
    it('deve retornar a imagem fornecida', () => {
      component.imagem = 'imagem-teste.jpg';
      expect((component as any).getImagemCard()).toBe('imagem-teste.jpg');
    });
    it('deve retornar a imagem padrão se não houver imagem', () => {
      component.imagem = '';
      expect((component as any).getImagemCard()).toBe('no-image.jpg');
    });
  });

  describe('hasLinks', () => {
    it('deve retornar false se não houver links', () => {
      component.links = [];
      expect((component as any).hasLinks()).toBe(false);
    });
    it('deve retornar true se houver links', () => {
      component.links = [{ url: 'https://site.com', icone: 'bi bi-link' }];
      expect((component as any).hasLinks()).toBe(true);
    });
  });

  describe('isVertical', () => {
    it('deve retornar true se layout for vertical', () => {
      component.layout = 'vertical';
      expect((component as any).isVertical()).toBe(true);
    });
    it('deve retornar false se layout for horizontal', () => {
      component.layout = 'horizontal';
      expect((component as any).isVertical()).toBe(false);
    });
    it('deve retornar true se layout for dinamico e tela < 992', () => {
      component.layout = 'dinamico';
      setWindowWidth(800);
      expect((component as any).isVertical()).toBe(true);
    });
    it('deve retornar false se layout for dinamico e tela >= 992', () => {
      component.layout = 'dinamico';
      setWindowWidth(1200);
      expect((component as any).isVertical()).toBe(false);
    });
  });

  describe('isHorizontal', () => {
    it('deve retornar true se layout for horizontal', () => {
      component.layout = 'horizontal';
      expect((component as any).isHorizontal()).toBe(true);
    });
    it('deve retornar false se layout for vertical', () => {
      component.layout = 'vertical';
      expect((component as any).isHorizontal()).toBe(false);
    });
    it('deve retornar true se layout for dinamico e tela >= 992', () => {
      component.layout = 'dinamico';
      setWindowWidth(1200);
      expect((component as any).isHorizontal()).toBe(true);
    });
    it('deve retornar false se layout for dinamico e tela < 992', () => {
      component.layout = 'dinamico';
      setWindowWidth(800);
      expect((component as any).isHorizontal()).toBe(false);
    });
  });

  describe('template', () => {
    it('deve renderizar a imagem correta', () => {
      component.imagem = 'imagem-teste.jpg';
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img.src).toContain('imagem-teste.jpg');
    });
    it('deve renderizar a imagem padrão se não houver imagem', () => {
      component.imagem = '';
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img.src).toContain('no-image.jpg');
    });
    it('não deve renderizar links se links estiver vazio', () => {
      component.links = [];
      fixture.detectChanges();
      const links = fixture.nativeElement.querySelectorAll('a');
      expect(links.length).toBe(0);
    });
    it('deve renderizar todos os links com ícones', () => {
      component.links = [
        { url: 'https://site1.com', icone: 'bi bi-facebook' },
        { url: 'https://site2.com', icone: 'bi bi-twitter' }
      ];
      fixture.detectChanges();
      const links = fixture.nativeElement.querySelectorAll('a');
      expect(links.length).toBe(2);
      expect(links[0].href).toContain('https://site1.com');
      expect(links[1].href).toContain('https://site2.com');
      expect(links[0].querySelector('i').className).toContain('bi bi-facebook');
      expect(links[1].querySelector('i').className).toContain('bi bi-twitter');
    });
    it('deve adicionar atributo aria-label nos links', () => {
      component.links = [
        { url: 'https://site1.com', icone: 'bi bi-facebook' }
      ];
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.getAttribute('aria-label')).toContain('Link para https://site1.com');
    });
    it('deve renderizar layout horizontal quando apropriado', () => {
      component.layout = 'horizontal';
      fixture.detectChanges();
      const root = fixture.nativeElement.querySelector('div');
      expect(root.className).toContain('card-horizontal');
    });
    it('deve renderizar layout vertical quando apropriado', () => {
      component.layout = 'vertical';
      fixture.detectChanges();
      const root = fixture.nativeElement.querySelector('div');
      expect(root.className).toContain('card-vertical');
    });
    it('deve renderizar layout dinâmico corretamente para tela grande', () => {
      component.layout = 'dinamico';
      setWindowWidth(1200);
      fixture.detectChanges();
      const root = fixture.nativeElement.querySelector('div');
      expect(root.className).toContain('card-horizontal');
    });
    it('deve renderizar layout dinâmico corretamente para tela pequena', () => {
      component.layout = 'dinamico';
      setWindowWidth(800);
      fixture.detectChanges();
      const root = fixture.nativeElement.querySelector('div');
      expect(root.className).toContain('card-vertical');
    });
  });
});
