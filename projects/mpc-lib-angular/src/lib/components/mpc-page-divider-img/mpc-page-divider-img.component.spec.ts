import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcPageDividerImgComponent } from './mpc-page-divider-img.component';

describe('MpcPageDividerImgComponent', () => {
  let component: MpcPageDividerImgComponent;
  let fixture: ComponentFixture<MpcPageDividerImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPageDividerImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcPageDividerImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
