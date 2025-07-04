import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcBtnFloatDocComponent } from './mpc-btn-float-doc.component';

describe('MpcBtnFloatDocComponent', () => {
  let component: MpcBtnFloatDocComponent;
  let fixture: ComponentFixture<MpcBtnFloatDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcBtnFloatDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcBtnFloatDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 