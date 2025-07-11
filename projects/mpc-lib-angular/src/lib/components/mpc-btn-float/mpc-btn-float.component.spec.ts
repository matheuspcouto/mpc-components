import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcBtnFloatComponent } from './mpc-btn-float.component';

describe('MpcBtnFloatComponent', () => {
  let component: MpcBtnFloatComponent;
  let fixture: ComponentFixture<MpcBtnFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcBtnFloatComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcBtnFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve desabilitar o botão quando disabled for true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });
}); 