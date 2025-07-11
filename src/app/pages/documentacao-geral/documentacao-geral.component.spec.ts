import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentacaoGeralComponent } from './documentacao-geral.component';

describe('DocumentacaoGeralComponent', () => {
  let component: DocumentacaoGeralComponent;
  let fixture: ComponentFixture<DocumentacaoGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentacaoGeralComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(DocumentacaoGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 