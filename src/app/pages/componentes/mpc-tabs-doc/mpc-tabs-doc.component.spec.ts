import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcTabsDocComponent } from './mpc-tabs-doc.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MpcTabsDocComponent', () => {
  let component: MpcTabsDocComponent;
  let fixture: ComponentFixture<MpcTabsDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcTabsDocComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcTabsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
