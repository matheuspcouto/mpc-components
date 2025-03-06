/**
 * @Componente MpcButtonComponent
 * Este componente é responsável por exibir um botão com texto e/ou ícone.
 *
 * id {string}: (opcional) ID do botão.
 * texto {string}: Texto do botão.
 * corBotao {string}: Cor do botão.
 * disabled {boolean}: (opcional) Indica se o botão está desabilitado.
 * posicaoIcone {string}: (opcional) Posição do ícone em relação ao texto. Valores possíveis: 'esquerda' ou 'direita'.
 * icone {string}: (opcional) Ícone do botão.
 * tabIndex {number}: (opcional) Índice de tabulação do botão.
 * ariaLabel {string}: (opcional) Rótulo de acessibilidade do botão.
 *
 * Exemplo de utilização:
 * <mpc-button id="botao" texto="Clique aqui" corBotao="btn-primary" tabIndex="0" disabled="false" posicaoIcone="esquerda" icone="bi bi-code-slash"></mpc-button>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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

  @Input() id?: string = '';
  @Input() texto: string = '';
  @Input() corBotao: string = 'btn-primary';
  @Input() disabled?: boolean = false;
  @Input() posicaoIcone?: string = PosicoesIcone.ESQUERDA;
  @Input() icone?: string = '';
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string = '';
}
