import { MpcPageDividerImgDocComponent } from './mpc-page-divider-img-doc.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MpcPageDividerImgDocComponent', () => {
  let component: MpcPageDividerImgDocComponent;
  let fixture: ComponentFixture<MpcPageDividerImgDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPageDividerImgDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcPageDividerImgDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 