import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcCardComponent } from '../../../shared/components/Cards/mpc-card/mpc-card.component';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';
import { MpcCardBackGroundImgComponent } from '../../../shared/components/Cards/mpc-card-background-img/mpc-card-background-img.component';
import { MpcCardMenuComponent } from '../../../shared/components/Cards/mpc-card-menu/mpc-card-menu.component';

@Component({
  selector: 'app-cards',
  imports: [MpcCardComponent, MpcCardBackGroundImgComponent, MpcCardMenuComponent, MpcNavbarComponent, MpcFooterComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  onMenuCardClick() {
    alert('Ação executada!');
  }
}
