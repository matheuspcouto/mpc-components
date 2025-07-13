/**
 * @Componente MpcCardBackGroundImgComponent
 * 
 * Este componente é responsável por exibir cards com imagem de fundo e gradiente escuro,
 * ideal para destacar informações importantes com visual impactante. O card possui
 * título, subtítulo e descrição sobrepostos à imagem de fundo.
 * 
 * @Propriedades
 * @Input() id {string} - ID do card (obrigatório)
 * @Input() tabIndex {number} - Índice do card (opcional)
 * @Input() ariaLabel {string} - Label do card (opcional)
 * @Input() titulo {string} - Título principal do card (obrigatório)
 * @Input() subtitulo {string} - Subtítulo do card (opcional)
 * @Input() descricao {string} - Descrição do card (opcional)
 * @Input() imagemFundo {string} - Imagem de fundo do card (obrigatorio)
 * 
 * @Variáveis CSS
 * --mpc-color-text-card-bg-img: white;
 * --mpc-color-bar-card-bg-img: var(--mpc-color-primary);
 * --mpc-font-title-card-bg-img: var(--mpc-font-title);
 * --mpc-font-subtitle-card-bg-img: var(--mpc-font-subtitle);
 * --mpc-font-description-card-bg-img: var(--mpc-font-default);
 * 
 * @Exemplo
 * ```html
 * <!-- Card com Imagem de Fundo customizada -->
 * <mpc-card-background-img
 *   titulo="Programação"
 *   subtitulo="Horários dos Cultos"
 *   descricao="Confira nossa programação semanal"
 *   id="card-programacao"
 *   [tabIndex]="0"
 *   imagemFundo="/assets/img/exemplo.jpg"
 *   ariaLabel="Card de programação semanal" />
 *
 * <!-- Card com Imagem de Fundo padrão -->
 * <mpc-card-background-img
 *   titulo="Sem imagem customizada"
 *   descricao="Usa a imagem padrão do componente"
 *   id="card-sem-img"
 * />
 * ``` 
 * 
 * @detalhe
 * Se a propriedade <code>imagemFundo</code> for informada, ela será usada como imagem de fundo com gradiente escuro.
 * Caso contrário, será usada a imagem padrão definida no CSS (<code>--mpc-img-card-bg</code>).
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';
@Component({
  selector: 'mpc-card-background-img',
  imports: [],
  templateUrl: './mpc-card-background-img.component.html',
  styleUrl: './mpc-card-background-img.component.css'
})
export class MpcCardBackGroundImgComponent extends AccessibilityInputs {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do card */
  @Input() titulo: string = '';
  /** Subtítulo do card */
  @Input() subtitulo: string = '';
  /** Descrição do card */
  @Input() descricao: string = '';
  /** Imagem de fundo do card */
  @Input() imagemFundo?: string;
  /** Evento de clique do card */
  @Output() acao = new EventEmitter<void>();

  // ===== MÉTODOS PÚBLICOS =====
  /**
   * Emite um evento de clique.
   */
  protected onClick(): void {
    this.acao.emit();
  }

  /**
   * Verifica se o card possui título.
   * @returns {boolean} true se houver título
   */
  protected hasTitulo(): boolean {
    return Boolean(this.titulo && this.titulo.trim().length > 0);
  }

  /**
   * Verifica se o card possui subtítulo.
   * @returns {boolean} true se houver subtítulo
   */
  protected hasSubtitulo(): boolean {
    return Boolean(this.subtitulo && this.subtitulo.trim().length > 0);
  }

  /**
   * Verifica se o card possui descrição.
   * @returns {boolean} true se houver descrição
   */
  protected hasDescricao(): boolean {
    return Boolean(this.descricao && this.descricao.trim().length > 0);
  }

  /**
   * Retorna o aria-label do card ou um fallback baseado no título.
   * @returns {string} aria-label do card
   */
  protected getAriaLabel(): string {
    return this.ariaLabel || this.titulo;
  }

  /**
   * Verifica se o card possui ação de clique.
   * @returns {boolean} true se houver ação
   */
  protected hasAcao(): boolean {
    return Boolean(this.acao.observed);
  }

  /**
 * Retorna o cursor apropriado baseado na presença de ação.
 * @returns {string} cursor CSS
 */
  protected getCursor(): string {
    return this.hasAcao() ? 'pointer' : 'default';
  }

  /**
   * Retorna a imagem de fundo escurecida com gradiente.
   * @returns {string} background-image CSS
   */
  protected getBackgroundImage(): string {
    return this.imagemFundo && this.imagemFundo.length > 0
      ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${this.imagemFundo})`
      : "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/img/no-image.jpg)";
  }
}
