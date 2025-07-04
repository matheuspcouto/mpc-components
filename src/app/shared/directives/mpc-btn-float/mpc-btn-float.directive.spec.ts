import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcBtnFloatDirective } from './mpc-btn-float.directive';
import { Component } from '@angular/core';

@Component({
  template: '<button mpcBtnFloat icone="bi bi-arrow-up-short"></button>',
  standalone: true,
  imports: [MpcBtnFloatDirective]
})
class TestComponent { }

@Component({
  template: '<button mpcBtnFloat></button>',
  standalone: true,
  imports: [MpcBtnFloatDirective]
})
class TestComponentSemIcone { }

@Component({
  template: '<button mpcBtnFloat icone="bi bi-arrow-up-short custom-class"></button>',
  standalone: true,
  imports: [MpcBtnFloatDirective]
})
class TestComponentMultiplasClasses { }

describe('MpcBtnFloatDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve aplicar estilos de botão flutuante', () => {
    const button = fixture.nativeElement.querySelector('button');
    const computedStyle = window.getComputedStyle(button);

    expect(computedStyle.position).toBe('fixed');
    expect(computedStyle.right).toBe('15px');
    expect(computedStyle.bottom).toBe('15px');
    expect(computedStyle.zIndex).toBe('998');
    expect(computedStyle.width).toBe('44px');
    expect(computedStyle.height).toBe('44px');
    expect(computedStyle.borderRadius).toBe('50px');
    expect(computedStyle.display).toBe('flex');
    expect(computedStyle.alignItems).toBe('center');
    expect(computedStyle.justifyContent).toBe('center');
    expect(computedStyle.transition).toBe('all ease-in 0.4s');
    expect(computedStyle.boxShadow).toBe('0 0 10px rgba(0, 0, 0, 0.2)');
    expect(computedStyle.cursor).toBe('pointer');
  });

    it('deve aplicar estilos de fonte ao ícone', () => {
    const icon = fixture.nativeElement.querySelector('i');
    const computedStyle = window.getComputedStyle(icon);
    
    expect(computedStyle.fontSize).toBe('24px');
    expect(computedStyle.lineHeight).toBe('0');
  });

  it('deve estar oculto inicialmente', () => {
    const button = fixture.nativeElement.querySelector('button');
    const computedStyle = window.getComputedStyle(button);
    expect(computedStyle.visibility).toBe('hidden');
  });

  it('deve incluir ícone com classes corretas', () => {
    const icon = fixture.nativeElement.querySelector('i');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('bi')).toBe(true);
    expect(icon.classList.contains('bi-arrow-up-short')).toBe(true);
  });

  it('deve lidar com entrada de ícone vazia', () => {
    const fixtureSemIcone = TestBed.createComponent(TestComponentSemIcone);
    fixtureSemIcone.detectChanges();
    
    const button = fixtureSemIcone.nativeElement.querySelector('button');
    const icon = button.querySelector('i');
    expect(icon).toBeFalsy();
  });

  it('deve lidar com ícone com múltiplas classes', () => {
    const fixtureMultiplasClasses = TestBed.createComponent(TestComponentMultiplasClasses);
    fixtureMultiplasClasses.detectChanges();
    
    const icon = fixtureMultiplasClasses.nativeElement.querySelector('i');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('bi')).toBe(true);
    expect(icon.classList.contains('bi-arrow-up-short')).toBe(true);
    expect(icon.classList.contains('custom-class')).toBe(true);
  });

  it('deve limpar o conteúdo anterior ao adicionar ícone', () => {
    const button = fixture.nativeElement.querySelector('button');
    const icon = button.querySelector('i');
    
    // Verifica se há apenas um elemento filho (o ícone)
    expect(button.children.length).toBe(1);
    expect(icon).toBeTruthy();
  });
}); 