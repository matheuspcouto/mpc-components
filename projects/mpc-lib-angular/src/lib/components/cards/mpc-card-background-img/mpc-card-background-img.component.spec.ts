import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardBackGroundImgComponent } from './mpc-card-background-img.component';

describe('MpcCardBackGroundImgComponent', () => {
  let component: MpcCardBackGroundImgComponent;
  let fixture: ComponentFixture<MpcCardBackGroundImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcCardBackGroundImgComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcCardBackGroundImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
