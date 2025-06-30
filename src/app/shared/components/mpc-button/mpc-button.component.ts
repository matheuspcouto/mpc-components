/**
 * @Componente MpcButtonComponent
 * Este componente é responsável por exibir um botão com texto e/ou ícone.
 *
 * texto {string}: Texto do botão.
 * corBotao {string}: Cor do botão (classe CSS Bootstrap ou similar).
 * corFundo {string}: Cor personalizada para o fundo do botão (hex, rgb, rgba, nome da cor).
 * corTexto {string}: Cor personalizada para o texto do botão (hex, rgb, rgba, nome da cor).
 * disabled {boolean}: (opcional) Indica se o botão está desabilitado.
 * posicaoIcone {string}: (opcional) Posição do ícone em relação ao texto. Valores possíveis: 'esquerda' ou 'direita'.
 * icone {string}: (opcional) Ícone do botão.
 *
 * Exemplo de utilização:
 * <mpc-button id="botao" texto="Clique aqui" corBotao="btn-primary" corFundo="#ff5733" corTexto="#ffffff" tabIndex="0" disabled="false" posicaoIcone="esquerda" icone="bi bi-code-slash"></mpc-button>
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 24/06/2025
 */

import { Component, Input } from '@angular/core';

enum PosicoesIcone {
  ESQUERDA = 'esquerda',
  DIREITA = 'direita',
}

@Component({
  selector: 'mpc-button',
  imports: [],
  templateUrl: './mpc-button.component.html',
  styleUrl: './mpc-button.component.css'
})
export class MpcButtonComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() texto: string = '';
  @Input() corFundo: string = '';
  @Input() corTexto: string = '';
  @Input() disabled: boolean = false;
  @Input() posicaoIcone: string = PosicoesIcone.DIREITA;
  @Input() icone: string = '';
}
