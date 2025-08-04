/**
 * @Componente MpcCardEventoComponent
 *
 * Este componente exibe um card de evento com timeline vertical, destacando o dia e o mês do evento em um círculo, e permitindo a inclusão de título, subtítulo e descrição via content projection.
 *
 * @Propriedades
 * @Input() dia {string} - Dia do evento (opcional, ex: '25')
 * @Input() mes {string} - Mês do evento (opcional, ex: 'Dez')
 *
 * @Exemplo de uso
 * ```html
 * <mpc-card-evento [dia]="'25'" [mes]="'Dez'">
 * div card-body>
 *   <span>Ceia de Natal</span>
 *   <span>Domingo, 19h</span>
 *   <span>Participe conosco deste momento especial!</span>
 * </div>
 * </mpc-card-evento>
 * ```
 *
 * @Variáveis CSS disponíveis
 * --mpc-color-border-timeline-card-evento: Cor da linha vertical da timeline (padrão: var(--mpc-color-primary))
 * --mpc-color-bg-timeline-card-evento: Cor do círculo da timeline (padrão: var(--mpc-color-primary))
 * --mpc-color-bg-data-card-evento: Cor de fundo do círculo da data (padrão: var(--mpc-color-primary))
 * --mpc-color-text-data-card-evento: Cor do texto do dia/mês (padrão: white)
 * --mpc-font-text-data-card-evento: Fonte do texto do dia/mês (padrão: var(--mpc-font-title))
 * --mpc-color-bg-card-evento: Cor de fundo do card (padrão: white)
 *
 * @Observação
 * - O componente não possui inputs para título, subtítulo ou descrição: utilize content projection com as tags [titulo], [subtitulo] e [descricao].
 * - Para customização visual, sobrescreva as variáveis CSS no escopo desejado.
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-card-evento',
  templateUrl: './mpc-card-evento.component.html',
  styleUrls: ['./mpc-card-evento.component.scss']
})
export class MpcCardEventoComponent {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Dia do evento */
  @Input() dia: string = '';
  /** Mês do evento */
  @Input() mes: string = '';
  /** ID único do card para acessibilidade */
  @Input() id: string = '';
  /** Índice de tabulação para navegação por teclado */
  @Input() tabIndex: number = 0;
  /** Rótulo para leitores de tela */
  @Input() ariaLabel: string = '';

  // ===== MÉTODOS PROTEGIDOS =====
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
} 