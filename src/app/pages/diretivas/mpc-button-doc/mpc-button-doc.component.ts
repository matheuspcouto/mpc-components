import { Component } from '@angular/core';
import { MpcButtonDirective } from '../../../shared/directives/mpc-button/mpc-button.directive';

@Component({
  selector: 'app-buttons',
  imports: [MpcButtonDirective],
  templateUrl: './mpc-button-doc.component.html',
  styleUrl: './mpc-button-doc.component.css'
})
export class MpcButtonDocComponent {
  alert(texto: string) {
    alert(texto);
  }
}
