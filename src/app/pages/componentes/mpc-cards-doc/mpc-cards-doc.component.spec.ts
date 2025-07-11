import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcCardsDocComponent } from './mpc-cards-doc.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MpcCardDocComponent', () => {
  let component: MpcCardsDocComponent;
  let fixture: ComponentFixture<MpcCardsDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcCardsDocComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcCardsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar alert ao executar onMenuCardClick', () => {
    window.alert = jest.fn(); // Mock do alert
    const alertSpy = jest.spyOn(window, 'alert');
    component.onMenuCardClick();
    expect(alertSpy).toHaveBeenCalledWith('Ação executada!');
  });

  it('deve renderizar card background com imagemFundo customizada', () => {
    const fixture = TestBed.createComponent(MpcCardsDocComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Busca por um card com imagemFundo customizada
    const card = compiled.querySelector('mpc-card-background-img[imagemFundo="/assets/img/home/mountain.jpg"]');
    expect(card).toBeTruthy();
  });
});
