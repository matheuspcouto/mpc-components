/**
 * @Componente MpcCardEventoComponent
 * 
 * Este componente é responsável por exibir cards de eventos com design de timeline,
 * ideal para exibir informações de eventos com data, título, subtítulo e descrição.
 * O card possui um layout único com círculo de data e linha de timeline.
 * 
 * @Propriedades
 * Input id {string} - ID único do card para acessibilidade
 * Input tabIndex {number} - Índice de tabulação para navegação por teclado
 * Input ariaLabel {string} - Rótulo para leitores de tela
 * Input titulo {string} - Título principal do evento (obrigatório)
 * Input subtitulo {string} - Subtítulo do evento (opcional)
 * Input descricao {string} - Descrição do evento (opcional)
 * Input dia {string} - Dia do evento (obrigatório)
 * Input mes {string} - Mês do evento (obrigatório)
 * Input estilos {CardEventoEstilos} - Objeto com estilos personalizados (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Card de Evento Básico -->
 * <mpc-card-evento
 *   titulo="Culto de Adoração"
 *   subtitulo="Domingo"
 *   descricao="Venha nos conhecer e traga sua família"
 *   dia="15"
 *   mes="Jun">
 * </mpc-card-evento>
 * 
 * <!-- Card de Evento com Estilos Personalizados -->
 * <mpc-card-evento
 *   titulo="Evento Especial"
 *   subtitulo="Sábado"
 *   descricao="Um momento único de comunhão"
 *   dia="20"
 *   mes="Jul"
 *   [estilos]="{
 *     background: '#f8f9fa',
 *     textColor: '#212529',
 *     borderColor: '#007bff',
 *     eventoBackground: '#007bff',
 *     eventoColor: '#ffffff'
 *   }">
 * </mpc-card-evento>
 * ```
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 09/07/2025
 */

import { Component, Input } from '@angular/core';

export interface CardEventoEstilos {
  /** Cor de fundo do card */
  background?: string;
  /** Cor do texto do card */
  textColor?: string;
  /** Cor da borda e linha de timeline */
  borderColor?: string;
  /** Cor de fundo do círculo de data */
  eventoBackground?: string;
  /** Cor do texto do círculo de data */
  eventoColor?: string;
}

@Component({
  selector: 'mpc-card-evento',
  templateUrl: './mpc-card-evento.component.html',
  styleUrl: './mpc-card-evento.component.css'
})
export class MpcCardEventoComponent {

  // ===== PROPRIEDADES DE ACESSIBILIDADE =====
  /** ID único do card para acessibilidade */
  @Input() id?: string = '';
  /** Índice de tabulação para navegação por teclado */
  @Input() tabIndex?: number = 0;
  /** Rótulo para leitores de tela */
  @Input() ariaLabel?: string = '';

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do evento */
  @Input() titulo: string = '';
  /** Subtítulo do evento */
  @Input() subtitulo: string = '';
  /** Descrição do evento */
  @Input() descricao?: string;
  /** Dia do evento */
  @Input() dia: string = '';
  /** Mês do evento */
  @Input() mes: string = '';

  // ===== PROPRIEDADES DE ESTILO =====
  /** Objeto com estilos personalizados */
  @Input() estilos: CardEventoEstilos = {
    background: 'white',
    textColor: '#0E2749',
    borderColor: '#0E2749',
    eventoBackground: '#0E2749',
    eventoColor: 'white',
  };

  // ===== MÉTODOS PÚBLICOS =====

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
   * Verifica se o card possui dia.
   * @returns {boolean} true se houver dia
   */
  protected hasDia(): boolean {
    return Boolean(this.dia && this.dia.trim().length > 0);
  }

  /**
   * Verifica se o card possui mês.
   * @returns {boolean} true se houver mês
   */
  protected hasMes(): boolean {
    return Boolean(this.mes && this.mes.trim().length > 0);
  }

  /**
   * Verifica se o card possui data completa (dia e mês).
   * @returns {boolean} true se houver data completa
   */
  protected hasData(): boolean {
    return this.hasDia() && this.hasMes();
  }

  /**
   * Retorna o aria-label do card ou um fallback baseado no título.
   * @returns {string} aria-label do card
   */
  protected getAriaLabel(): string {
    return this.ariaLabel || this.titulo || 'Card de evento';
  }
} 