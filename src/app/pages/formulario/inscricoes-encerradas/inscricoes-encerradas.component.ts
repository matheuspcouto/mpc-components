import { Component } from '@angular/core';
import { MpcNavbarComponent } from "../../../shared/components/mpc-navbar/mpc-navbar.component";
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'inscricoes-encerradas',
  imports: [MpcNavbarComponent, MpcFooterComponent],
  templateUrl: './inscricoes-encerradas.component.html',
  styleUrl: './inscricoes-encerradas.component.css'
})
export class InscricoesEncerradasComponent {}
