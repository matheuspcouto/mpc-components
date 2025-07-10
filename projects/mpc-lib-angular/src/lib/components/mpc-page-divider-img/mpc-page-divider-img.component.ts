/**
 * @Componente MpcPageDividerImgComponent
 * 
 * Este componente é responsável por exibir seções divisórias de página com imagem de fundo,
 * ideal para criar separações visuais impactantes entre seções de conteúdo.
 * O componente possui design responsivo com efeito parallax em desktop.
 * 
 * @Propriedades
 * Input titulo {string} - Título principal da seção (obrigatório, padrão: 'Mpc Components')
 * Input subtitulo {string} - Subtítulo da seção (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Divisor de Página Básico -->
 * <mpc-page-divider-img
 *   titulo="Mpc Components"
 *   subtitulo="Biblioteca de Componentes" />
 * ```
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2024
 * @updated 09/07/2024
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-page-divider-img',
  imports: [],
  templateUrl: './mpc-page-divider-img.component.html',
  styleUrl: './mpc-page-divider-img.component.css'
})
export class MpcPageDividerImgComponent {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal da seção */
  @Input() titulo: string = 'Mpc Components';
  /** Subtítulo da seção */
  @Input() subtitulo?: string;

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Verifica se a seção possui título.
   * @returns {boolean} true se houver título
   */
  protected hasTitulo(): boolean {
    return Boolean(this.titulo && this.titulo.trim().length > 0);
  }

  /**
   * Verifica se a seção possui subtítulo.
   * @returns {boolean} true se houver subtítulo
   */
  protected hasSubtitulo(): boolean {
    return Boolean(this.subtitulo && this.subtitulo.trim().length > 0);
  }
}
