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
  @Input() corBotao: string = 'btn-primary';
  @Input() tabIndex: number = 0;
  @Input() disabled?: boolean = false;
  @Input() posicaoIcone?: string = PosicoesIcone.ESQUERDA;
  @Input() icone: string = '';
}
