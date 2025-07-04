import { Component } from '@angular/core';
import { MpcButtonDirective } from '../../../shared/directives/mpc-button/mpc-button.directive';
import { MpcLoaderService } from '../../../shared/components/mpc-loader/mpc-loader.service';

@Component({
  selector: 'app-loaders',
  imports: [ MpcButtonDirective ],
  templateUrl: './mpc-loader-doc.component.html',
  styleUrl: './mpc-loader-doc.component.css'
})
export class MpcLoaderDocComponent {

  constructor(private mpcLoaderService: MpcLoaderService) { }

  abrirLoading() {
    this.mpcLoaderService.show();
    setTimeout(() => this.mpcLoaderService.hide(), 5000);
  }

}
