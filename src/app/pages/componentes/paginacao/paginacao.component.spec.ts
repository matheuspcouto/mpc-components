import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PaginacaoComponent } from './paginacao.component';

describe('PaginacaoComponent', () => {
  let component: PaginacaoComponent;
  let fixture: ComponentFixture<PaginacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginacaoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              params: {},
              queryParams: {},
              data: {}
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
