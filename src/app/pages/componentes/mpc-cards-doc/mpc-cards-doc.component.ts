import { Component } from '@angular/core';
import { MpcCardBackGroundImgComponent, MpcCardComponent, MpcCardEventoComponent, MpcCardMenuComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-cards',
  imports: [MpcCardComponent, MpcCardBackGroundImgComponent, MpcCardMenuComponent, MpcCardEventoComponent],
  templateUrl: './mpc-cards-doc.component.html',
  styleUrl: './mpc-cards-doc.component.css'
})
export class MpcCardsDocComponent {
  onMenuCardClick() {
    alert('Ação executada!');
  }
}
