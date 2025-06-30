import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTextAreaComponent } from './mpc-input-text-area.component';

describe('MpcInputTextAreaComponent', () => {
  let component: MpcInputTextAreaComponent;
  let fixture: ComponentFixture<MpcInputTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTextAreaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir a contagem de caracteres corretamente', () => {
    component.value = 'abc';
    fixture.detectChanges();
    expect(component.qtdCaracteres).toBe(3);
  });

  it('deve emitir valor ao digitar', () => {
    const spyEmit = jest.spyOn(component.valor, 'emit');
    const event = { target: { value: 'teste' } };
    (component as any).setValue(event);
    expect(spyEmit).toHaveBeenCalledWith('teste');
  });

  it('deve exibir mensagem de erro se valor for menor que min', () => {
    component.label = 'Descrição';
    component.min = '5';
    component.value = 'abc';
    (component as any)['campoTocado'] = true;
    (component as any).onFocus();
    expect((component as any).errorMessage).toBeDefined();
  });

  it('deve chamar onFocus', () => {
    const spyOnFocus = jest.spyOn(component as any, 'onFocus');
    component['onFocus']();
    expect(spyOnFocus).toHaveBeenCalled();
  });
}); 