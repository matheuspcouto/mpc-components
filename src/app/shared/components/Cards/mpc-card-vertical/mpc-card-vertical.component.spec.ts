import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardVerticalComponent } from './mpc-card-vertical.component';

describe('MpcCardVerticalComponent', () => {
  let component: MpcCardVerticalComponent;
  let fixture: ComponentFixture<MpcCardVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcCardVerticalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcCardVerticalComponent);
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
    expect(component.tamanhoCard).toBe('MD');
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

  it('deve retornar o tamanho do card correto', () => {
    component.tamanhoCard = 'XS';
    expect(component.getTamanhoCard()).toBe('card-xs');
    component.tamanhoCard = 'SM';
    expect(component.getTamanhoCard()).toBe('card-sm');
    component.tamanhoCard = 'MD';
    expect(component.getTamanhoCard()).toBe('card-md');
    component.tamanhoCard = 'LG';
    expect(component.getTamanhoCard()).toBe('card-lg');
    component.tamanhoCard = 'XL';
    expect(component.getTamanhoCard()).toBe('card-xl');
    component.tamanhoCard = 'XXL';
    expect(component.getTamanhoCard()).toBe('card-xxl');
  });

  it('deve retornar o tamanho do card padrão quando o tamanho fornecido não é válido', () => {
    component.tamanhoCard = 'invalido';
    expect(component.getTamanhoCard()).toBe('card-md');
  });
});
