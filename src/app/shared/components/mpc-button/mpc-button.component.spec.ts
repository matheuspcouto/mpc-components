
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcButtonComponent } from './mpc-button.component';

describe('MpcButtonComponent', () => {
  let component: MpcButtonComponent;
  let fixture: ComponentFixture<MpcButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcButtonComponent);
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
    expect(component.texto).toBe('');
    expect(component.cores).toEqual({});
    expect(component.disabled).toBe(false);
    expect(component.posicaoIcone).toBe('direita');
    expect(component.icone).toBe('');
  });

  it('deve retornar o estilo das cores', () => {
    component.cores = { backgroundColor: 'red', color: 'white' };
    expect(component.estiloCores).toEqual({ 'background-color': 'red', 'border-color': 'red', 'color': 'white' });
  });

  it('deve retornar o estilo das cores quando cores não forem informadas', () => {
    component.cores = undefined;
    expect(component.estiloCores).toEqual({});
  });

});
