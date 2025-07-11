import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcTabsDocComponent } from './mpc-tabs-doc.component';

describe('MpcTabsDocComponent', () => {
  let component: MpcTabsDocComponent;
  let fixture: ComponentFixture<MpcTabsDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcTabsDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcTabsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve selecionar a aba corretamente', () => {
    const tab = { id: 'conteudoTab2', titulo: 'Tab 2' };
    component.selectTab(tab);
    expect(component.tabSelecionada).toBe(tab);
  });
});
