import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTelefoneComponent } from './mpc-input-telefone.component';

describe('MpcInputTelefoneComponent', () => {
  let component: MpcInputTelefoneComponent;
  let fixture: ComponentFixture<MpcInputTelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTelefoneComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir valor ao setar telefone', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '(11) 99999-9999' } });
    expect(component.valor.emit).toHaveBeenCalledWith('11999999999');
  });

  it('deve emitir erro ao valor vazio se required', () => {
    jest.spyOn(component.error, 'emit');
    component.required = true;
    component['setValue']({ target: { value: '' } });
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect((component as any)['campoTocado']).toBe(true);
  });
});
