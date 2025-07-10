import { Component } from '@angular/core';
import { MpcCardComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/cards/mpc-card/mpc-card.component';
import { MpcCardBackGroundImgComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/cards/mpc-card-background-img/mpc-card-background-img.component';
import { MpcCardEventoComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/cards/mpc-card-evento/mpc-card-evento.component';
import { MpcCardMenuComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/cards/mpc-card-menu/mpc-card-menu.component';

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
