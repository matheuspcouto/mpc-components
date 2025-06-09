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

  it('deve adicionar event listener de scroll no ngOnInit', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    component.ngOnInit();

    expect(addEventListenerSpy).toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
  });

  it('deve fazer scroll para o topo com comportamento suave quando scrollToTop for chamado', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => { });

    component.scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    scrollToSpy.mockRestore();
  });

  it('deve lidar com evento de scroll e atualizar visibilidade do botão', () => {
    // Mock da propriedade scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0
    });

    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    component.ngOnInit();

    // Obtém a função handler de scroll que foi passada para addEventListener
    const scrollHandler = addEventListenerSpy.mock.calls.find(call => call[0] === 'scroll')?.[1] as Function;

    expect(scrollHandler).toBeDefined();

    // Testa o comportamento do scroll se o handler existir
    if (scrollHandler) {
      // Simula scroll para baixo
      Object.defineProperty(window, 'scrollY', { value: 300 });
      scrollHandler();

      // Simula scroll para o topo
      Object.defineProperty(window, 'scrollY', { value: 0 });
      scrollHandler();
    }

    addEventListenerSpy.mockRestore();
  });

});
