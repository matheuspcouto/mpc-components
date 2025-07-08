import { Component } from '@angular/core';
import { MpcButtonDirective } from 'mpc-lib-angular';

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
