
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcTabsComponent } from './mpc-tabs.component';

describe('MpcTabsComponent', () => {
  let component: MpcTabsComponent;
  let fixture: ComponentFixture<MpcTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcTabsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar a tab selecionada com a primeira tab', () => {
    component.tabs = [
      { id: 'tab1', titulo: 'Tab 1' },
      { id: 'tab2', titulo: 'Tab 2' },
      { id: 'tab3', titulo: 'Tab 3' },
    ];
    component.ngOnInit();
    expect(component['tabSelecionada']).toEqual(component.tabs[0]);
  });

  it('deve emitir o evento tabSelected ao selecionar uma tab', () => {
    const tabSelecionada = { id: 'tab1', titulo: 'Tab 1' };
    jest.spyOn(component.tabSelected, 'emit');
    component.selecionarTab(tabSelecionada);
    expect(component.tabSelected.emit).toHaveBeenCalledWith(tabSelecionada);
  });
});
