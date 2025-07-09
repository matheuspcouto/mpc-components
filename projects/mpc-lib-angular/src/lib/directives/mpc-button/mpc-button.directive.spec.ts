import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MpcButtonDirective } from './mpc-button.directive';

@Component({
  template: `
    <button 
      mpcButton
      [posicaoIcone]="posicaoIcone"
      [icone]="icone"
      [texto]="texto">
    </button>
  `,
  standalone: true,
  imports: [MpcButtonDirective]
})
class TestComponent {
  posicaoIcone: string = 'direita';
  icone: string = '';
  texto: string = '';
}

describe('MpcButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let buttonElement: DebugElement;
  let directive: MpcButtonDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.directive(MpcButtonDirective));
    directive = buttonElement?.injector.get(MpcButtonDirective);
  });

  function updateComponentProperties(posicaoIcone?: string, icone?: string, texto?: string) {
    if (posicaoIcone !== undefined) component.posicaoIcone = posicaoIcone;
    if (icone !== undefined) component.icone = icone;
    if (texto !== undefined) component.texto = texto;
    fixture.detectChanges();
  }

  function getTextContent(element: HTMLElement): string {
    let textContent = '';
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent || '';
      }
    }
    return textContent;
  }

  describe('Inicialização', () => {
    it('deve criar a diretiva com sucesso', () => {
      expect(buttonElement).toBeTruthy();
      expect(directive).toBeTruthy();
    });

    it('deve aplicar os estilos padrão do botão no ngOnInit', () => {
      const nativeElement = buttonElement.nativeElement;
      
      expect(nativeElement.style.display).toBe('flex');
      expect(nativeElement.style.position).toBe('relative');
      expect(nativeElement.style.paddingBlock).toBe('0.5rem');
      expect(nativeElement.style.paddingInline).toBe('1.25rem');
      expect(nativeElement.style.borderRadius).toBe('9999px');
      expect(nativeElement.style.alignItems).toBe('center');
      expect(nativeElement.style.justifyContent).toBe('center');
      expect(nativeElement.style.cursor).toBe('pointer');
      expect(nativeElement.style.outline).toBe('none');
      expect(nativeElement.style.overflow).toBe('hidden');
      expect(nativeElement.style.fontSize).toBe('15px');
      expect(nativeElement.style.fontWeight).toBe('700');
      expect(nativeElement.style.minWidth).toBe('30vh');
      expect(nativeElement.style.maxWidth).toBe('50vh');
      expect(nativeElement.style.textDecoration).toBe('none');
      expect(nativeElement.style.border).toBe('');
    });

    it('deve definir valores padrão para as propriedades de entrada', () => {
      expect(directive.posicaoIcone).toBe('direita');
      expect(directive.icone).toBe('');
      expect(directive.texto).toBe('');
    });
  });

  describe('Renderização de texto e ícone', () => {
    it('deve renderizar apenas o texto quando não há ícone', () => {
      updateComponentProperties(undefined, undefined, 'Botão Teste');

      const nativeElement = buttonElement.nativeElement;
      expect(getTextContent(nativeElement)).toBe('Botão Teste');
      expect(nativeElement.querySelector('i')).toBeNull();
    });

    it('deve renderizar apenas o ícone quando não há texto', () => {
      updateComponentProperties(undefined, 'bi bi-check', undefined);

      const nativeElement = buttonElement.nativeElement;
      const iconElement = nativeElement.querySelector('i');
      
      expect(iconElement).toBeTruthy();
      expect(iconElement.classList.contains('bi')).toBe(true);
      expect(iconElement.classList.contains('bi-check')).toBe(true);
      expect(iconElement.style.verticalAlign).toBe('middle');
      expect(getTextContent(nativeElement)).toBe('');
    });

    it('deve renderizar texto e ícone com múltiplas classes CSS', () => {
      updateComponentProperties('direita', 'bi bi-check-circle-fill', 'Salvar');

      const nativeElement = buttonElement.nativeElement;
      const iconElement = nativeElement.querySelector('i');
      
      expect(getTextContent(nativeElement)).toBe('Salvar');
      expect(iconElement.classList.contains('bi')).toBe(true);
      expect(iconElement.classList.contains('bi-check-circle-fill')).toBe(true);
      expect(iconElement.style.marginLeft).toBe('0.5rem');
    });

    it('deve lidar com valores vazios', () => {
      updateComponentProperties('direita', '', '');
      expect(getTextContent(buttonElement.nativeElement)).toBe('');
      expect(buttonElement.nativeElement.querySelector('i')).toBeNull();
      expect(buttonElement.nativeElement.innerHTML).toBe('');
    });
  });

  describe('Posicionamento do ícone', () => {
    it('deve posicionar o ícone à direita por padrão', () => {
      updateComponentProperties('direita', 'bi bi-check', 'Salvar');

      const nativeElement = buttonElement.nativeElement;
      const iconElement = nativeElement.querySelector('i');
      
      expect(getTextContent(nativeElement)).toBe('Salvar');
      expect(iconElement.style.marginLeft).toBe('0.5rem');
      expect(iconElement.style.marginRight).toBe('');
    });

    it('deve posicionar o ícone à esquerda', () => {
      updateComponentProperties('esquerda', 'bi bi-arrow-left', 'Voltar');

      const nativeElement = buttonElement.nativeElement;
      const iconElement = nativeElement.querySelector('i');
      
      expect(getTextContent(nativeElement)).toBe('Voltar');
      expect(iconElement.style.marginRight).toBe('0.5rem');
      expect(iconElement.style.marginLeft).toBe('');
    });

    it('deve usar comportamento padrão para posicaoIcone inválida', () => {
      updateComponentProperties('posicao_invalida', 'bi bi-check', 'Teste');

      const nativeElement = buttonElement.nativeElement;
      const iconElement = nativeElement.querySelector('i');
      
      expect(getTextContent(nativeElement)).toBe('Teste');
      expect(iconElement.style.marginLeft).toBe('0.5rem');
      expect(iconElement.style.marginRight).toBe('');
    });
  });

  describe('Mudanças dinâmicas (ngOnChanges)', () => {
    it('deve reagir a mudanças nas propriedades', () => {
      // Teste mudança de texto
      updateComponentProperties(undefined, undefined, 'Texto Inicial');
      expect(getTextContent(buttonElement.nativeElement)).toBe('Texto Inicial');

      updateComponentProperties(undefined, undefined, 'Texto Atualizado');
      expect(getTextContent(buttonElement.nativeElement)).toBe('Texto Atualizado');

      // Teste mudança de ícone
      updateComponentProperties(undefined, 'bi bi-check', undefined);
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-check')).toBe(true);

      updateComponentProperties(undefined, 'bi bi-x', undefined);
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-x')).toBe(true);

      // Teste mudança de posição
      updateComponentProperties('direita', 'bi bi-check', 'Teste');
      expect(buttonElement.nativeElement.querySelector('i').style.marginLeft).toBe('0.5rem');

      updateComponentProperties('esquerda', 'bi bi-check', 'Teste');
      expect(buttonElement.nativeElement.querySelector('i').style.marginRight).toBe('0.5rem');
    });

    it('deve limpar o conteúdo anterior ao aplicar mudanças', () => {
      updateComponentProperties('direita', 'bi bi-old', 'Texto Antigo');
      expect(getTextContent(buttonElement.nativeElement)).toBe('Texto Antigo');
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-old')).toBe(true);

      updateComponentProperties('direita', 'bi bi-new', 'Texto Novo');
      expect(getTextContent(buttonElement.nativeElement)).toBe('Texto Novo');
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-new')).toBe(true);
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-old')).toBe(false);
    });
  });

  describe('Casos extremos e edge cases', () => {
    it('deve lidar com espaços extras em classes e texto', () => {
      updateComponentProperties(undefined, '  bi  bi-check  ', '  Texto com espaços  ');

      const nativeElement = buttonElement.nativeElement;
      const iconElement = nativeElement.querySelector('i');
      
      expect(iconElement.classList.contains('bi')).toBe(true);
      expect(iconElement.classList.contains('bi-check')).toBe(true);
      expect(getTextContent(nativeElement)).toBe('  Texto com espaços  ');
    });
  });

  describe('Integração com o DOM', () => {
    it('deve manter a estrutura DOM correta após múltiplas mudanças', () => {
      // Primeira configuração
      updateComponentProperties('direita', 'bi bi-1', 'Primeiro');
      expect(getTextContent(buttonElement.nativeElement)).toBe('Primeiro');
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-1')).toBe(true);

      // Segunda configuração
      updateComponentProperties('esquerda', 'bi bi-2', 'Segundo');
      expect(getTextContent(buttonElement.nativeElement)).toBe('Segundo');
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-2')).toBe(true);
      expect(buttonElement.nativeElement.querySelector('i').classList.contains('bi-1')).toBe(false);

      // Terceira configuração - sem ícone
      updateComponentProperties('direita', '', 'Terceiro');
      expect(getTextContent(buttonElement.nativeElement)).toBe('Terceiro');
      expect(buttonElement.nativeElement.querySelector('i')).toBeNull();
    });
  });
}); 