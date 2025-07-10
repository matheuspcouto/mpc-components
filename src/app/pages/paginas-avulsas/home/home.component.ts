import { Component } from '@angular/core';
import { MpcPageDividerImgComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/mpc-page-divider-img/mpc-page-divider-img.component';
import { MpcCardMenuComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/cards/mpc-card-menu/mpc-card-menu.component';
import { MpcButtonDirective } from '../../../../../projects/mpc-lib-angular/src/lib/directives/mpc-button/mpc-button.directive';

@Component({
  selector: 'app-home',
  imports: [MpcCardMenuComponent, MpcButtonDirective, MpcPageDividerImgComponent, MpcButtonDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

  irParaLib() {
    window.open('https://www.npmjs.com/package/mpc-lib-angular?activeTab=readme', '_blank');
  }
}
