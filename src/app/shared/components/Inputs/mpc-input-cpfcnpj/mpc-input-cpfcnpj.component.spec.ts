import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputCpfcnpjComponent } from './mpc-input-cpfcnpj.component';

describe('MpcInputCpfcnpjComponent', () => {
  let component: MpcInputCpfcnpjComponent;
  let fixture: ComponentFixture<MpcInputCpfcnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputCpfcnpjComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputCpfcnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir valor ao setar CPF', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '12345678909' } });
    expect(component.valor.emit).toHaveBeenCalledWith('12345678909');
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
