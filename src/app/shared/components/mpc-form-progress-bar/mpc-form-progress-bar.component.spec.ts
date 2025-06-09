
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcFormProgressBarComponent } from './mpc-form-progress-bar.component';

describe('MpcFormProgressBarComponent', () => {
  let component: MpcFormProgressBarComponent;
  let fixture: ComponentFixture<MpcFormProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcFormProgressBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcFormProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});
