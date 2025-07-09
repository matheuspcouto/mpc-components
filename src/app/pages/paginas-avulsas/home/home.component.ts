import { Component } from '@angular/core';
import { MpcButtonDirective, MpcCardMenuComponent } from 'mpc-lib-angular';

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
