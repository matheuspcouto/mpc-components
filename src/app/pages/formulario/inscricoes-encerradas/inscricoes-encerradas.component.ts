import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MpcNavbarComponent } from "../../../shared/components/mpc-navbar/mpc-navbar.component";

@Component({
  selector: 'inscricoes-encerradas',
  imports: [CommonModule, MpcNavbarComponent],
  templateUrl: './inscricoes-encerradas.component.html',
  styleUrl: './inscricoes-encerradas.component.css'
})
export class InscricoesEncerradasComponent {

}
