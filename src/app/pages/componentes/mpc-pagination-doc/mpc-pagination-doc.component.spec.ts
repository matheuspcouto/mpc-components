import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MpcPaginationDocComponent } from './mpc-pagination-doc.component';

describe('MpcPaginationDocComponent', () => {
  let component: MpcPaginationDocComponent;
  let fixture: ComponentFixture<MpcPaginationDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPaginationDocComponent],
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

    fixture = TestBed.createComponent(MpcPaginationDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir indices iniciais da listagem', () => {
    const event = { indiceInicial: 0, indiceFinal: 10 };
    component.definirIndiceLista(event);
    expect(component.indiceInicial).toBe(0);
    expect(component.indiceFinal).toBe(10);
  });
});
