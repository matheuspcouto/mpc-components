import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcHeroSectionComponent } from './mpc-hero-section.component';

describe('MpcHeroSectionComponent', () => {
  let component: MpcHeroSectionComponent;
  let fixture: ComponentFixture<MpcHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcHeroSectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve receber os valores padrão', () => {
    expect(component.id).toBe('');
    expect(component.tabIndex).toBe(0);
    expect(component.ariaLabel).toBe('');
    expect(component.titulo).toBe('');
    expect(component.subtitulo).toBe('');
    expect(component.imagem).toBe('');
  });

  it('deve retornar a imagem de fundo correta', () => {
    component.imagem = 'imagem.jpg';
    const backgroundImage = component.getBackgroundImage();
    expect(backgroundImage).toBe('linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(imagem.jpg)');
  });
});
