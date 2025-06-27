import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from './home.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Rotas } from '../../shared/enums/rotas-enum';
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

  it('deve redirecionar para documentação quando irParaDocumentacao for chamado', () => {
    // Arrange
    const rotaEsperada = [Rotas.DOCS];
    
    // Act
    component.irParaDocumentacao();
    
    // Assert
    expect(router.navigate).toHaveBeenCalledWith(rotaEsperada);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  it('deve ter o router injetado corretamente', () => {
    // Assert
    expect(component).toBeTruthy();
    expect(router).toBeDefined();
  });
});
