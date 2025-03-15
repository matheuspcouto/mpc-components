import { Component } from '@angular/core';
import { MpcCardComponent } from '../../../shared/components/mpc-card/mpc-card.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';

@Component({
  selector: 'app-cards',
  imports: [ MpcCardComponent, MpcNavbarComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

}
