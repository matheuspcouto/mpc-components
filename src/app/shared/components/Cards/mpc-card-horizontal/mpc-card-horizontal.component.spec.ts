import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardHorizontalComponent } from './mpc-card-horizontal.component';

describe('MpcCardHorizontalComponent', () => {
  let component: MpcCardHorizontalComponent;
  let fixture: ComponentFixture<MpcCardHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcCardHorizontalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcCardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter valores padrão', () => {
    expect(component.id).toBe('');
    expect(component.tabIndex).toBe(0);
    expect(component.ariaLabel).toBe('');
    expect(component.titulo).toBe('');
    expect(component.subtitulo).toBe('');
    expect(component.descricao).toBe('');
    expect(component.imagem).toBe('');
    expect(component.links).toEqual([]);
  });

  it('deve renderizar a imagem com src e alt corretos quando fornecida', () => {
    component.imagem = 'imagem-teste.jpg';
    component.links = [{ url: 'https://www.example.com', icone: 'bi bi-link' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.src).toContain('imagem-teste.jpg');
  });

  it('deve retornar imagem padrão quando nenhuma imagem é fornecida', () => {
    component.imagem = '';
    expect(component.getImagemCard()).toBe('no-image.jpg');
  });

  it('deve retornar a imagem fornecida quando a imagem está definida', () => {
    component.imagem = 'imagem-personalizada.jpg';
    expect(component.getImagemCard()).toBe('imagem-personalizada.jpg');
  });
});
