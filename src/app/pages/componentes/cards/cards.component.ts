import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcCardComponent } from '../../../shared/components/Cards/mpc-card/mpc-card.component';

@Component({
  selector: 'app-cards',
  imports: [MpcCardComponent, MpcNavbarComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {}
