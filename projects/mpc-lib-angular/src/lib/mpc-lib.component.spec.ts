import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcLibComponent } from './mpc-lib.component';

describe('MpcLibComponent', () => {
  let component: MpcLibComponent;
  let fixture: ComponentFixture<MpcLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
