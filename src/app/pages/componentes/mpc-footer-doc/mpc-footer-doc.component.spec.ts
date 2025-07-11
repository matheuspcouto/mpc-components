import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcFooterDocComponent } from './mpc-footer-doc.component';

describe('MpcFooterDocComponent', () => {
  let component: MpcFooterDocComponent;
  let fixture: ComponentFixture<MpcFooterDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcFooterDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcFooterDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
