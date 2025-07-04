import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from './home.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
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

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter o router injetado corretamente', () => {
    // Assert
    expect(component).toBeTruthy();
    expect(router).toBeDefined();
  });

  it('deve chamar window.open ao executar irParaRepositorio', () => {
    const spy = jest.spyOn(window, 'open').mockImplementation();
    component.irParaRepositorio();
    expect(spy).toHaveBeenCalledWith('https://github.com/matheuspcouto/mpc-components', '_blank');
    spy.mockRestore();
  });
});
