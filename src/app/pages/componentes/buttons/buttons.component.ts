import { Component } from '@angular/core';
import { MpcButtonDirective } from '../../../shared/directives/mpc-button/mpc-button.directive';

@Component({
  selector: 'app-buttons',
  imports: [MpcButtonDirective],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  alert(texto: string) {
    alert(texto);
  }
}
