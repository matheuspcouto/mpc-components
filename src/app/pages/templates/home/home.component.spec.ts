import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from './home.component';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método de navegação ao executar irParaDocumentacao', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate').mockImplementation();
    component.irParaDocumentacao();
    expect(spy).toHaveBeenCalledWith([Rotas.LIB_DOC]);
    spy.mockRestore();
  });
});
