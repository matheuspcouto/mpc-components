import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from './home.component';

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

  it('deve chamar window.open ao executar irParaLib', () => {
    const spy = jest.spyOn(window, 'open').mockImplementation();
    component.irParaLib();
    expect(spy).toHaveBeenCalledWith('https://www.npmjs.com/package/mpc-lib-angular?activeTab=readme', '_blank');
    spy.mockRestore();
  });
});
