/**
 * @Componente MpcCardEventoComponent
 * 
 * Este componente é responsável por exibir cards de eventos com timeline,
 * incluindo data, título, subtítulo e descrição em um layout visual atrativo.
 * 
 * @Propriedades
 * @Input() id {string} - ID do card (obrigatório)
 * @Input() tabIndex {number} - Índice do card (opcional)
 * @Input() ariaLabel {string} - Label do card (opcional)
 * @Input() data {string} - Data do evento (obrigatório, formato: YYYY-MM-DD)
 * @Input() titulo {string} - Título do evento (obrigatório)
 * @Input() subtitulo {string} - Subtítulo do evento (opcional)
 * @Input() descricao {string} - Descrição do evento (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Card de Evento Básico -->
 * <mpc-card-evento
 *   data="2024-12-25"
 *   titulo="Natal"
 *   subtitulo="Celebração"
 *   descricao="Celebração do nascimento de Jesus Cristo"
 *   id="card-natal"
 *   [tabIndex]="0"
 *   ariaLabel="Card do evento de Natal" />
 * 
 * <!-- Card de Evento com Ação -->
 * <mpc-card-evento
 *   data="2024-12-31"
 *   titulo="Ano Novo"
 *   subtitulo="Réveillon"
 *   descricao="Celebração da virada do ano"
 *   (acao)="onEventoClick()"
 *   id="card-ano-novo"
 *   [tabIndex]="0"
 *   ariaLabel="Card do evento de Ano Novo" />
 * ```
 * 
 * @Variáveis CSS
 * --mpc-color-border-timeline-card-evento: Cor da borda da timeline (padrão: var(--mpc-color-primary))
 * --mpc-color-bg-timeline-card-evento: Cor de fundo da timeline (padrão: var(--mpc-color-primary))
 * --mpc-color-bg-data-card-evento: Cor de fundo da data (padrão: var(--mpc-color-primary))
 * --mpc-color-text-data-card-evento: Cor do texto da data (padrão: white)
 * --mpc-font-text-data-card-evento: Fonte do texto da data (padrão: var(--mpc-font-title))
 * --mpc-color-bg-card-evento: Cor de fundo do card (padrão: white)
 * --mpc-color-title-card-evento: Cor do título do card (padrão: var(--mpc-color-primary))
 * --mpc-color-subtitle-card-evento: Cor do subtítulo do card (padrão: var(--mpc-color-primary))
 * --mpc-color-description-card-evento: Cor da descrição do card (padrão: var(--mpc-color-tertiary))
 * --mpc-font-title-card-evento: Fonte do título do card (padrão: var(--mpc-font-subtitle))
 * --mpc-font-subtitle-card-evento: Fonte do subtítulo do card (padrão: var(--mpc-font-subtitle))
 * --mpc-font-description-card-evento: Fonte da descrição do card (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, Input } from '@angular/core';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

@Component({
  selector: 'mpc-card-evento',
  templateUrl: './mpc-card-evento.component.html',
  styleUrl: './mpc-card-evento.component.css'
})
export class MpcCardEventoComponent extends AccessibilityInputs {

  // ===== PROPRIEDADES PÚBLICAS =====
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

  // ===== MÉTODOS PROTEGIDOS =====

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