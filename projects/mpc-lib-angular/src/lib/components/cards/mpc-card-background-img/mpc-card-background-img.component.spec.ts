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
      expect(component.id).toBeUndefined();
      expect(component.tabIndex).toBeUndefined();
      expect(component.ariaLabel).toBeUndefined();
      expect(component.titulo).toBe('');
      expect(component.subtitulo).toBe('');
      expect(component.descricao).toBe('');
    });

    it('deve aceitar valores customizados para as propriedades', () => {
      component.id = 'card-teste';
      component.tabIndex = 1;
      component.ariaLabel = 'Card de teste';
      component.titulo = 'Título Teste';
      component.subtitulo = 'Subtítulo Teste';
      component.descricao = 'Descrição Teste';

      expect(component.id).toBe('card-teste');
      expect(component.tabIndex).toBe(1);
      expect(component.ariaLabel).toBe('Card de teste');
      expect(component.titulo).toBe('Título Teste');
      expect(component.subtitulo).toBe('Subtítulo Teste');
      expect(component.descricao).toBe('Descrição Teste');
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

  describe('Ação', () => {
    it('deve emitir evento ao chamar onClick', () => {
      const spy = jest.spyOn(component.acao, 'emit');
      (component as any).onClick();
      expect(spy).toHaveBeenCalled();
    });
  });
});
