import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcSectionComponent } from './mpc-section.component';

describe('MpcSectionComponent', () => {
  let component: MpcSectionComponent;
  let fixture: ComponentFixture<MpcSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MpcSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 