import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcCardComponent } from '../../../shared/components/Cards/mpc-card/mpc-card.component';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-cards',
  imports: [MpcCardComponent, MpcNavbarComponent, MpcFooterComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {}
