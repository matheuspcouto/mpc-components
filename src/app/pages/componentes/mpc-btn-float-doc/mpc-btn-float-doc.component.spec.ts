import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcBtnFloatDocComponent } from './mpc-btn-float-doc.component';

describe('MpcBtnFloatDocComponent', () => {
  let component: MpcBtnFloatDocComponent;
  let fixture: ComponentFixture<MpcBtnFloatDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcBtnFloatDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcBtnFloatDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve rolar para o topo ao chamar scrollToTop', () => {
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation();
    component.scrollToTop();
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollSpy.mockRestore();
  });
}); 