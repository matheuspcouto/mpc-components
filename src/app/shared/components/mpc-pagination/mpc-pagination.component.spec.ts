import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpcPaginationComponent } from './mpc-pagination.component';

describe('MpcPaginationComponent', () => {
  let component: MpcPaginationComponent;
  let fixture: ComponentFixture<MpcPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
