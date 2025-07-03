import { Component, Input } from '@angular/core';

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