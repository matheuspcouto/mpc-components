/**
 * @Componente MpcCardBackGroundImgComponent
 * 
 * Este componente é responsável por exibir cards com imagem de fundo e gradiente escuro,
 * ideal para destacar informações importantes com visual impactante. O card possui
 * título, subtítulo e descrição sobrepostos à imagem de fundo.
 * 
 * @Propriedades
 * Input id {string} - ID único do card para acessibilidade
 * Input tabIndex {number} - Índice de tabulação para navegação por teclado
 * Input ariaLabel {string} - Rótulo para leitores de tela
 * Input titulo {string} - Título principal do card (obrigatório)
 * Input subtitulo {string} - Subtítulo do card (opcional)
 * Input descricao {string} - Descrição do card (opcional)
 * Input imagemFundo {string} - URL da imagem de fundo (obrigatório)
 * Input textColor {string} - Cor do texto (opcional)
 * Input barColor {string} - Cor da barra do título (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Card Básico -->
 * <mpc-card-background-img
 *   titulo="Culto de Adoração"
 *   subtitulo="Domingo às 17H & 19:30H"
 *   descricao="Venha nos conhecer e traga sua família para prestar culto conosco!"
 *   imagemFundo="/assets/img/home/culto-adoracao.jpg">
 * </mpc-card-background-img>
 * 
 * <!-- Card com Cores Personalizadas -->
 * <mpc-card-background-img
 *   titulo="Evento Especial"
 *   subtitulo="Sábado às 20H"
 *   descricao="Um momento único de comunhão e adoração"
 *   imagemFundo="/assets/img/evento.jpg"
 *   textColor="#ffffff"
 *   barColor="#ff6b35">
 * </mpc-card-background-img>
 * 
 * <!-- Card com Acessibilidade -->
 * <mpc-card-background-img
 *   titulo="Programação"
 *   subtitulo="Horários dos Cultos"
 *   descricao="Confira nossa programação semanal"
 *   imagemFundo="/assets/img/programacao.jpg"
 *   id="card-programacao"
 *   [tabIndex]="0"
 *   ariaLabel="Card de programação semanal">
 * </mpc-card-background-img>
 * ```
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 09/07/2025
 */

import { Component, Input } from '@angular/core';

export interface CardBackgroundEstilos {
  /** Cor do texto do card */
  textColor?: string;
  /** Cor da barra do título */
  barColor?: string;
}

@Component({
  selector: 'mpc-card-background-img',
  imports: [],
  templateUrl: './mpc-card-background-img.component.html',
  styleUrl: './mpc-card-background-img.component.css'
})
export class MpcCardBackGroundImgComponent {

  // ===== PROPRIEDADES DE ACESSIBILIDADE =====
  /** ID único do card para acessibilidade */
  @Input() id?: string = '';
  /** Índice de tabulação para navegação por teclado */
  @Input() tabIndex?: number = 0;
  /** Rótulo para leitores de tela */
  @Input() ariaLabel?: string = '';

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do card */
  @Input() titulo: string = '';
  /** Subtítulo do card */
  @Input() subtitulo: string = '';
  /** Descrição do card */
  @Input() descricao: string = '';
  /** URL da imagem de fundo */
  @Input() imagemFundo: string = '';

  // ===== PROPRIEDADES DE ESTILO =====
  /** Objeto com estilos personalizados */
  @Input() estilos: CardBackgroundEstilos = {
    textColor: 'white',
    barColor: 'white',
  };

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Retorna o estilo de background-image com gradiente escuro sobre a imagem de fundo.
   * @returns {string} CSS para background-image
   */
  protected getBackgroundImage(): string {
    return `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${this.imagemFundo})`;
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
   * Verifica se o card possui imagem de fundo.
   * @returns {boolean} true se houver imagem de fundo
   */
  protected hasImagemFundo(): boolean {
    return Boolean(this.imagemFundo && this.imagemFundo.trim().length > 0);
  }

  /**
   * Retorna o aria-label do card ou um fallback baseado no título.
   * @returns {string} aria-label do card
   */
  protected getAriaLabel(): string {
    return this.ariaLabel || this.titulo;
  }
}
