import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardComponent } from './mpc-card.component';

describe('MpcCardComponent', () => {
  let component: MpcCardComponent;
  let fixture: ComponentFixture<MpcCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter valores padrão', () => {
    expect(component.id).toBeUndefined();
    expect(component.tabIndex).toBeUndefined();
    expect(component.ariaLabel).toBeUndefined();
    expect(component.titulo).toBe('');
    expect(component.subtitulo).toBe('');
    expect(component.descricaoUm).toBe('');
    expect(component.descricaoDois).toBe('');
    expect(component.imagem).toBe('');
    expect(component.layout).toBe('vertical');
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

  it('deve retornar o layout vertical correto', () => {
    component.layout = 'vertical';
    expect(component['isVertical']).toBeTruthy();
  });

  it('deve retornar o layout horizontal correto', () => {
    component.layout = 'horizontal';
    expect(component['isHorizontal']).toBeTruthy();
  });

  it('deve retornar false para hasDescricaoDois quando descricaoDois for string vazia', () => {
    component.descricaoDois = '';
    expect((component as any).hasDescricaoDois()).toBeFalsy();
  });

  it('deve retornar false para hasDescricaoDois quando descricaoDois for apenas espaços', () => {
    component.descricaoDois = '   ';
    expect((component as any).hasDescricaoDois()).toBeFalsy();
  });

  it('deve retornar true para hasDescricaoDois quando descricaoDois for preenchido', () => {
    component.descricaoDois = 'Descrição extra';
    expect((component as any).hasDescricaoDois()).toBeTruthy();
  });
});
