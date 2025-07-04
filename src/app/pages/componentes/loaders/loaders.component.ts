import { Component } from '@angular/core';
import { MpcButtonDirective } from '../../../shared/directives/mpc-button/mpc-button.directive';
import { MpcLoaderService } from '../../../shared/components/mpc-loader/mpc-loader.service';

@Component({
  selector: 'app-loaders',
  imports: [ MpcButtonDirective ],
  templateUrl: './loaders.component.html',
  styleUrl: './loaders.component.css'
})
export class LoadersComponent {

  constructor(private mpcLoaderService: MpcLoaderService) { }

  abrirLoading() {
    this.mpcLoaderService.show();
    setTimeout(() => this.mpcLoaderService.hide(), 5000);
  }

}
