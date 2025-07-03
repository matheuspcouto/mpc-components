import { Component } from '@angular/core';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';

@Component({
  selector: 'app-buttons',
  imports: [MpcButtonComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  alert(texto: string) {
    alert(texto);
  }
}
