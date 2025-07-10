/**
 * @Diretiva MpcButtonDirective
 * 
 * Esta diretiva transforma qualquer elemento em um botão estilizado, permitindo
 * a inclusão de ícones (esquerda/direita) e personalização via propriedades.
 * 
 * @Propriedades
 * @Input() posicaoIcone {'esquerda' | 'direita'} - Posição do ícone no botão (opcional, padrão: 'direita')
 * @Input() icone {string} - Classes do ícone (ex: 'bi bi-check') (opcional)
 * @Input() texto {string} - Texto a ser exibido no botão (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Botão Básico -->
 * <button mpcButton texto="Salvar"></button>
 * 
 * <!-- Botão com Ícone à Direita -->
 * <button mpcButton 
 *   [icone]="'bi bi-check'" 
 *   [posicaoIcone]="'direita'" 
 *   texto="Salvar">
 * </button>
 * 
 * <!-- Botão com Ícone à Esquerda -->
 * <button mpcButton 
 *   [icone]="'bi bi-arrow-left'" 
 *   [posicaoIcone]="'esquerda'" 
 *   texto="Voltar">
 * </button>
 * 
 * <!-- Botão Apenas com Ícone -->
 * <button mpcButton [icone]="'bi bi-plus'"></button>
 * ```
 * 
 * @Enums
 * PosicoesIcone: Enum para posições do ícone
 * - ESQUERDA: Ícone posicionado à esquerda do texto
 * - DIREITA: Ícone posicionado à direita do texto
 * 
 * @Estilos CSS Aplicados
 * Esta diretiva aplica estilos CSS diretamente via JavaScript:
 * - display: flex - Layout flexível
 * - position: relative - Posicionamento relativo
 * - padding-block: 0.5rem - Padding vertical
 * - padding-inline: 1.25rem - Padding horizontal
 * - border-radius: 9999px - Bordas arredondadas
 * - align-items: center - Alinhamento vertical centralizado
 * - justify-content: center - Alinhamento horizontal centralizado
 * - cursor: pointer - Cursor de ponteiro
 * - outline: none - Remove outline padrão
 * - overflow: hidden - Esconde overflow
 * - font-size: 15px - Tamanho da fonte
 * - font-weight: 700 - Peso da fonte
 * - min-width: 30vh - Largura mínima
 * - max-width: 50vh - Largura máxima
 * - text-decoration: none - Remove decoração de texto
 * - border: none - Remove borda
 * 
 * @author Matheus Pimentel Do Couto
 * @created 04/07/2025
 * @updated 10/07/2025
 */

import { Directive, Input, ElementRef, Renderer2, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';

/**
 * Enum que define as posições possíveis para o ícone no botão
 */
enum PosicoesIcone {
  /** Ícone posicionado à esquerda do texto */
  ESQUERDA = 'esquerda',
  /** Ícone posicionado à direita do texto */
  DIREITA = 'direita',
}

// TODO: Talvez transformar em um component para facilitar a utilização
@Directive({
  selector: '[mpcButton]',
  standalone: true
})
export class MpcButtonDirective implements OnInit, OnChanges {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Define a posição do ícone no botão */
  @Input() posicaoIcone: string = PosicoesIcone.DIREITA;
  /** Classes CSS do ícone a ser exibido (ex: 'bi bi-check') */
  @Input() icone: string = '';
  /** Texto a ser exibido no botão */
  @Input() texto: string = '';

  // ===== SERVIÇOS INJETADOS =====
  /** Referência ao elemento DOM */
  private readonly el = inject(ElementRef);
  /** Renderer para manipulação do DOM */
  private readonly renderer = inject(Renderer2);

  // ===== PROPRIEDADES PRIVADAS =====
  /** Mapa contendo todos os estilos CSS aplicados ao botão */
  private readonly MPC_BTN_STYLES = new Map<string, string>([
    ['display', 'flex'],
    ['position', 'relative'],
    ['padding-block', '0.5rem'],
    ['padding-inline', '1.25rem'],
    ['border-radius', '9999px'],
    ['align-items', 'center'],
    ['justify-content', 'center'],
    ['cursor', 'pointer'],
    ['outline', 'none'],
    ['overflow', 'hidden'],
    ['font-size', '15px'],
    ['font-weight', '700'],
    ['min-width', '30vh'],
    ['max-width', '50vh'],
    ['text-decoration', 'none'],
    ['border', 'none'],
  ]);

  // ===== MÉTODOS DO CICLO DE VIDA =====

  /**
   * Método executado quando a diretiva é inicializada.
   * Aplica os estilos padrão do botão e inclui o ícone inicial.
   */
  ngOnInit() {
    this.MPC_BTN_STYLES.forEach((value, key) => this.renderer.setStyle(this.el.nativeElement, key, value));
    this.incluirIcone();
  }

  /**
   * Método executado quando as propriedades de entrada (@Input) são alteradas.
   * Reaplica a lógica de inclusão do ícone quando necessário.
   * @param changes Objeto contendo as mudanças nas propriedades
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.incluirIcone();
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Método responsável por criar e posicionar o ícone e texto no botão.
   * Limpa o conteúdo atual do elemento e recria a estrutura com ícone e texto
   * na posição especificada pela propriedade posicaoIcone.
   */
  private incluirIcone(): void {
    // Limpa o conteúdo atual
    this.el.nativeElement.innerHTML = '';

    let iconElem: HTMLElement | null = null;
    if (this.icone !== undefined && this.icone !== null && this.icone.trim() !== '') {
      iconElem = this.renderer.createElement('i');
      const classes = this.icone.trim().split(' ').filter(cls => cls.length > 0);
      classes.forEach(cls => this.renderer.addClass(iconElem, cls));
      this.renderer.setStyle(iconElem, 'vertical-align', 'middle');
    }
    
    let textElem: any = null;
    if (this.texto !== undefined && this.texto !== null) {
      textElem = this.renderer.createText(this.texto);
    }

    // Adiciona na ordem correta
    if (this.posicaoIcone === PosicoesIcone.ESQUERDA) {
      if (iconElem) {
        this.renderer.appendChild(this.el.nativeElement, iconElem);
        this.renderer.setStyle(iconElem, 'margin-right', '0.5rem');
      }
      if (textElem) {
        this.renderer.appendChild(this.el.nativeElement, textElem);
      }
    } else {
      if (textElem) {
        this.renderer.appendChild(this.el.nativeElement, textElem);
      }
      if (iconElem) {
        this.renderer.appendChild(this.el.nativeElement, iconElem);
        this.renderer.setStyle(iconElem, 'margin-left', '0.5rem');
      }
    }
  }
} 