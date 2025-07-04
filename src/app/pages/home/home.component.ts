import { Component } from '@angular/core';
import { MpcCardMenuComponent } from "../../shared/components/Cards/mpc-card-menu/mpc-card-menu.component";
import { MpcButtonComponent } from '../../shared/components/mpc-button/mpc-button.component';

@Component({
  selector: 'app-home',
  imports: [MpcCardMenuComponent, MpcButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

  irParaRepositorio() {
    window.open('https://github.com/matheuspcouto/mpc-components', '_blank');
  }
}
