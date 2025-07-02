/**
 * @Componente McpCardMenuComponent
 * Este componente é responsável por exibir um card com título, descrição, ícone e ação de clique.
 *
 * titulo {string}: Título do card.
 * descricao {string}: (opcional) Descrição do card.
 * icone {string}: Ícone do card.
 * acao {Function}: (opcional) Ação de clique do card.
 *
 * Exemplo de utilização:
 * <mpc-card-menu icone="bi bi-telephone" titulo="Telefone" descricao="(63) 9 9201-4337"></mpc-card-menu>
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 24/06/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mpc-card-menu',
  imports: [],
  templateUrl: './mpc-card-menu.component.html',
  styleUrl: './mpc-card-menu.component.css'
})
export class MpcCardMenuComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() descricao?: string;
  @Input() icone: string = '';

  @Output() acao = new EventEmitter<void>();

  protected clique(): void {
    this.acao.emit();
  }
}
