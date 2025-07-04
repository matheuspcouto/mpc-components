import { Component, Input } from '@angular/core';

/**
 * @Componente MpcCardEventoComponent
 * Este componente é responsável por exibir um card de evento com título, subtítulo, descrição, dia e mês.
 *
 * id {string}: (opcional) Id do card.
 * tabIndex {number}: (opcional) Índice de tabulação do card.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * titulo {string}: Título do evento.
 * subtitulo {string}: (opcional) Subtítulo do evento.
 * descricao {string}: (opcional) Descrição do evento.
 * dia {string}: Dia do evento.
 * mes {string}: Mês do evento.
 *
 * Exemplo de utilização:
 * <mpc-card-evento titulo="Título" subtitulo="Subtítulo" descricao="Descrição" dia="10" mes="Jun"></mpc-card-evento>
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 04/07/2025
 */
@Component({
  selector: 'mpc-card-evento',
  templateUrl: './mpc-card-evento.component.html',
  styleUrl: './mpc-card-evento.component.css'
})
export class MpcCardEventoComponent {
  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() descricao?: string;
  @Input() dia: string = '';
  @Input() mes: string = '';
} 