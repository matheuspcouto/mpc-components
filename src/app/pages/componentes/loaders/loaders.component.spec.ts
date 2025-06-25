import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadersComponent } from './loaders.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoadersComponent', () => {
  let component: LoadersComponent;
  let fixture: ComponentFixture<LoadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadersComponent],
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

    fixture = TestBed.createComponent(LoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o loading', () => {
    component.abrirLoading();
    expect(component['mpcLoaderService'].isLoading$).toBeTruthy();
  });
});
