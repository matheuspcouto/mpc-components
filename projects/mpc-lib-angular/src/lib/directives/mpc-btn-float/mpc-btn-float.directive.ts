/**
 * @Diretiva MpcBtnFloatDirective
 * 
 * Esta diretiva transforma qualquer elemento em um botão flutuante para rolar a página ao topo,
 * permitindo personalização via propriedades e ícones customizáveis.
 * 
 * @Propriedades
 * @Input() icone {string} - Classes do ícone (ex: 'bi bi-arrow-up-short') (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Botão Flutuante Básico -->
 * <button mpcBtnFloat [icone]="'bi bi-arrow-up-short'"></button>
 * 
 * <!-- Botão Flutuante Customizado -->
 * <button mpcBtnFloat 
 *   [icone]="'bi bi-arrow-up'" 
 *   [style.background-color]="'black'" 
 *   [style.color]="'white'">
 * </button>
 * 
 * <!-- Botão Flutuante com Ícone Diferente -->
 * <button mpcBtnFloat [icone]="'bi bi-chevron-up'"></button>
 * ```
 * 
 * @Estilos CSS Aplicados
 * Esta diretiva aplica estilos CSS diretamente via JavaScript:
 * - visibility: hidden - Inicialmente oculto
 * - position: fixed - Posicionamento fixo
 * - right: 15px - Distância da direita
 * - bottom: 15px - Distância do fundo
 * - z-index: 998 - Camada de sobreposição
 * - width: 44px - Largura do botão
 * - height: 44px - Altura do botão
 * - border-radius: 50px - Formato circular
 * - border: 0 - Sem borda
 * - transition: all ease-in 0.4s - Transição suave
 * - display: flex - Layout flexível
 * - align-items: center - Alinhamento vertical centralizado
 * - justify-content: center - Alinhamento horizontal centralizado
 * - box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) - Sombra
 * - cursor: pointer - Cursor de ponteiro
 * - outline: none - Remove outline padrão
 * 
 * @author Matheus Pimentel Do Couto
 * @created 04/07/2025
 * @updated 10/07/2025
 */

import { Directive, Input, ElementRef, Renderer2, OnInit, inject } from '@angular/core';

// TODO: Talvez transformar em um component para facilitar a utilização
@Directive({
  selector: '[mpcBtnFloat]',
  standalone: true
})
export class MpcBtnFloatDirective implements OnInit {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Classes CSS do ícone a ser exibido (ex: 'bi bi-arrow-up-short') */
  @Input() icone: string = '';

  // ===== SERVIÇOS INJETADOS =====
  /** Referência ao elemento DOM */
  private readonly el = inject(ElementRef);
  /** Renderer para manipulação do DOM */
  private readonly renderer = inject(Renderer2);

  // ===== PROPRIEDADES PRIVADAS =====
  /** Mapa contendo todos os estilos CSS aplicados ao botão flutuante */
  private readonly MPC_BTN_FLOAT_STYLES = new Map<string, string>([
    ['visibility', 'hidden'],
    ['position', 'fixed'],
    ['right', '15px'],
    ['bottom', '15px'],
    ['z-index', '998'],
    ['width', '44px'],
    ['height', '44px'],
    ['border-radius', '50px'],
    ['border', '0'],
    ['transition', 'all ease-in 0.4s'],
    ['display', 'flex'],
    ['align-items', 'center'],
    ['justify-content', 'center'],
    ['box-shadow', '0 0 10px rgba(0, 0, 0, 0.2)'],
    ['cursor', 'pointer'],
    ['outline', 'none'],
  ]);

  // ===== MÉTODOS DO CICLO DE VIDA =====

  /**
   * Método executado quando a diretiva é inicializada.
   * Aplica os estilos padrão do botão flutuante, inclui o ícone e configura o listener de scroll.
   */
  ngOnInit() {
    this.MPC_BTN_FLOAT_STYLES.forEach((value, key) => this.renderer.setStyle(this.el.nativeElement, key, value));
    this.incluirIcone();
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Método responsável por criar e adicionar o ícone ao botão.
   */
  private incluirIcone(): void {
    // Limpa o conteúdo atual
    this.el.nativeElement.innerHTML = '';

    if (this.icone) {
      const iconElem = this.renderer.createElement('i');
      const classes = this.icone.split(' ');
      classes.forEach(cls => this.renderer.addClass(iconElem, cls));
      this.renderer.setStyle(iconElem, 'font-size', '24px');
      this.renderer.setStyle(iconElem, 'line-height', '0');
      this.renderer.appendChild(this.el.nativeElement, iconElem);
    }
  }
} 