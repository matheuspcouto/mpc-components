import { Component } from '@angular/core';
import { MpcButtonDirective, MpcCardMenuComponent } from 'mpc-lib-angular';
import { MpcPageDividerImgComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/mpc-page-divider-img/mpc-page-divider-img.component';

@Component({
  selector: 'app-home',
  imports: [MpcCardMenuComponent, MpcButtonDirective, MpcPageDividerImgComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

  irParaRepositorio() {
    window.open('https://github.com/matheuspcouto/mpc-components', '_blank');
  }
}
