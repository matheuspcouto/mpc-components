import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcPageHeaderHomeComponent } from './mpc-page-header-home.component';

describe('MpcPageHeaderHomeComponent', () => {
  let component: MpcPageHeaderHomeComponent;
  let fixture: ComponentFixture<MpcPageHeaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MpcPageHeaderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcPageHeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar o background correto quando imagemFundo está definida e não vazia', () => {
    component.imagemFundo = '/assets/img/teste.jpg';
    // @ts-expect-error método protegido
    const bg = component.getBackgroundImage();
    expect(bg).toBe('linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/img/teste.jpg)');
  });

  it('deve retornar o background padrão quando imagemFundo está undefined', () => {
    component.imagemFundo = undefined;
    // @ts-expect-error método protegido
    const bg = component.getBackgroundImage();
    expect(bg).toBe('linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/img/no-image.jpg)');
  });

  it('deve retornar o background padrão quando imagemFundo é string vazia', () => {
    component.imagemFundo = '';
    // @ts-expect-error método protegido
    const bg = component.getBackgroundImage();
    expect(bg).toBe('linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/img/no-image.jpg)');
  });
}); 