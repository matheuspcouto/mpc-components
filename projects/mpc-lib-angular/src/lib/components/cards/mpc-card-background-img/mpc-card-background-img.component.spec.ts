import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardBackGroundImgComponent } from './mpc-card-background-img.component';

describe('MpcCardBackGroundImgComponent', () => {
  let component: MpcCardBackGroundImgComponent;
  let fixture: ComponentFixture<MpcCardBackGroundImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcCardBackGroundImgComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcCardBackGroundImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Propriedades de entrada', () => {
    it('deve inicializar com valores padrão', () => {
      expect(component.id).toBe('');
      expect(component.tabIndex).toBe(0);
      expect(component.ariaLabel).toBe('');
      expect(component.titulo).toBe('');
      expect(component.subtitulo).toBe('');
      expect(component.descricao).toBe('');
      expect(component.imagemFundo).toBe('');
    });

    it('deve aceitar valores customizados para as propriedades', () => {
      component.id = 'card-teste';
      component.tabIndex = 1;
      component.ariaLabel = 'Card de teste';
      component.titulo = 'Título Teste';
      component.subtitulo = 'Subtítulo Teste';
      component.descricao = 'Descrição Teste';
      component.imagemFundo = 'assets/img/teste.jpg';

      expect(component.id).toBe('card-teste');
      expect(component.tabIndex).toBe(1);
      expect(component.ariaLabel).toBe('Card de teste');
      expect(component.titulo).toBe('Título Teste');
      expect(component.subtitulo).toBe('Subtítulo Teste');
      expect(component.descricao).toBe('Descrição Teste');
      expect(component.imagemFundo).toBe('assets/img/teste.jpg');
    });
  });

  describe('getBackgroundImage', () => {
    it('deve retornar string com gradiente e URL da imagem', () => {
      component.imagemFundo = 'assets/img/teste.jpg';

      const resultado = component['getBackgroundImage']();

      expect(resultado).toBe('linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(assets/img/teste.jpg)');
    });

    it('deve retornar string com gradiente mesmo com imagem vazia', () => {
      component.imagemFundo = '';

      const resultado = component['getBackgroundImage']();

      expect(resultado).toBe('linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url()');
    });

    it('deve funcionar com URLs completas', () => {
      component.imagemFundo = 'https://exemplo.com/imagem.jpg';

      const resultado = component['getBackgroundImage']();

      expect(resultado).toBe('linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://exemplo.com/imagem.jpg)');
    });
  });

  describe('AriaLabel', () => {
    it('deve retornar o valor da propriedade ariaLabel', () => {
      component.ariaLabel = 'Card de teste';
      expect(component['getAriaLabel']()).toBe('Card de teste');
    });

    it('deve retornar o valor da propriedade ariaLabel se não for definido', () => {
      component.titulo = 'Título Teste';
      expect(component['getAriaLabel']()).toBe('Título Teste');
    });
  });
});
