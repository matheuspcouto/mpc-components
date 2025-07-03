import { Component } from '@angular/core';
import { MpcCardComponent } from '../../../shared/components/Cards/mpc-card/mpc-card.component';
import { MpcCardBackGroundImgComponent } from '../../../shared/components/Cards/mpc-card-background-img/mpc-card-background-img.component';
import { MpcCardMenuComponent } from '../../../shared/components/Cards/mpc-card-menu/mpc-card-menu.component';
import { MpcCardEventoComponent } from '../../../shared/components/Cards/mpc-card-evento/mpc-card-evento.component';

@Component({
  selector: 'app-cards',
  imports: [MpcCardComponent, MpcCardBackGroundImgComponent, MpcCardMenuComponent, MpcCardEventoComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  onMenuCardClick() {
    alert('Ação executada!');
  }
}
