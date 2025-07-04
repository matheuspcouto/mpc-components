/**
 * @Componente MpcButtonComponent
 * Este componente é responsável por exibir um botão com texto e/ou ícone.
 *
 * texto {string}: Texto do botão.
 * corBotao {string}: Cor do botão (classe CSS Bootstrap ou similar).
 * cores {object}: Objeto com as cores do botão. Exemplo: { backgroundColor: '#ff5733', color: '#ffffff' }
 * disabled {boolean}: (opcional) Indica se o botão está desabilitado.
 * posicaoIcone {string}: (opcional) Posição do ícone em relação ao texto. Valores possíveis: 'esquerda' ou 'direita'.
 * icone {string}: (opcional) Ícone do botão.
 *
 * Exemplo de utilização:
 * <mpc-button id="botao" texto="Clique aqui" corBotao="btn-primary" [cores]="{ backgroundColor: '#ff5733', color: '#ffffff' }" tabIndex="0" disabled="false" posicaoIcone="esquerda" icone="bi bi-code-slash"></mpc-button>
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 04/07/2025
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

enum PosicoesIcone {
  ESQUERDA = 'esquerda',
  DIREITA = 'direita',
}

@Component({
  selector: 'mpc-button',
  imports: [CommonModule],
  templateUrl: './mpc-button.component.html',
  styleUrl: './mpc-button.component.css'
})
export class MpcButtonComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() texto: string = '';
  @Input() cores?: { backgroundColor?: string, color?: string } = {};
  @Input() disabled: boolean = false;
  @Input() posicaoIcone: string = PosicoesIcone.DIREITA;
  @Input() icone: string = '';

  get estiloCores() {
    if (!this.cores) return {};
    return {
      'background-color': this.cores.backgroundColor || '',
      'border-color': this.cores.backgroundColor || '',
      'color': this.cores.color || ''
    };
  }
}
