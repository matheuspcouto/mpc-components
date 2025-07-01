import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcScrollTopButtonComponent } from './mpc-scroll-top-button.component';

describe('MpcScrollTopButtonComponent', () => {
  let component: MpcScrollTopButtonComponent;
  let fixture: ComponentFixture<MpcScrollTopButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcScrollTopButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcScrollTopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve fazer scroll para o topo com comportamento suave quando scrollToTop for chamado', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => { });

    component.scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    scrollToSpy.mockRestore();
  });

  it('deve alterar a visibilidade do botão conforme o scrollY', () => {
    document.body.innerHTML = `<button id="scrollTop" style="visibility: hidden"></button>`;
    const btnScrollTop = document.getElementById('scrollTop');
    expect(btnScrollTop).not.toBeNull();

    // Espiona addEventListener para capturar o handler
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    component.ngOnInit();
    const scrollHandler = addEventListenerSpy.mock.calls.find(call => call[0] === 'scroll')?.[1] as Function;
    expect(scrollHandler).toBeDefined();

    // Simula scroll > 300
    Object.defineProperty(window, 'scrollY', { value: 350, configurable: true });
    scrollHandler();
    expect(btnScrollTop!.style.visibility).toBe('visible');

    // Simula scroll <= 300
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    scrollHandler();
    expect(btnScrollTop!.style.visibility).toBe('hidden');

    addEventListenerSpy.mockRestore();
  });

});
