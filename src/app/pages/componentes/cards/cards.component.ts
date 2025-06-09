import { Component } from '@angular/core';
import { MpcCardVerticalComponent } from '../../../shared/components/Cards/mpc-card-vertical/mpc-card-vertical.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcCardHorizontalComponent } from "../../../shared/components/Cards/mpc-card-horizontal/mpc-card-horizontal.component";

@Component({
  selector: 'app-cards',
  imports: [MpcCardVerticalComponent, MpcNavbarComponent, MpcCardHorizontalComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

}
