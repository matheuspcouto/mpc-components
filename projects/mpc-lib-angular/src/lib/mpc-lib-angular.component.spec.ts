import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcLibAngularComponent } from './mpc-lib-angular.component';

describe('MpcLibAngularComponent', () => {
  let component: MpcLibAngularComponent;
  let fixture: ComponentFixture<MpcLibAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcLibAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcLibAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
