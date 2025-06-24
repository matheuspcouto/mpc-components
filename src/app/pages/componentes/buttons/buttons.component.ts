import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';

@Component({
  selector: 'app-buttons',
  imports: [MpcButtonComponent, MpcNavbarComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  alert(texto: string) {
    alert(texto);
  }
}
