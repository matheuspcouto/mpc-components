import { Component } from '@angular/core';
import { MpcCardMenuComponent } from '../../../shared/components/Cards/mpc-card-menu/mpc-card-menu.component';
import { MpcButtonDirective } from '../../../shared/directives/mpc-button/mpc-button.directive';

@Component({
  selector: 'app-home',
  imports: [MpcCardMenuComponent, MpcButtonDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

  irParaRepositorio() {
    window.open('https://github.com/matheuspcouto/mpc-components', '_blank');
  }
}
