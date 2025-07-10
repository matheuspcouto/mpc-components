import { Component, inject } from '@angular/core';
import { MpcLoaderService } from '../../../../../projects/mpc-lib-angular/src/lib/components/mpc-loader/mpc-loader.service';
import { MpcButtonDirective } from '../../../../../projects/mpc-lib-angular/src/lib/directives/mpc-button/mpc-button.directive';

@Component({
  selector: 'app-loaders',
  imports: [MpcButtonDirective],
  templateUrl: './mpc-loader-doc.component.html',
  styleUrl: './mpc-loader-doc.component.css'
})
export class MpcLoaderDocComponent {

  private readonly mpcLoaderService = inject(MpcLoaderService);

  abrirLoading() {
    this.mpcLoaderService.show();
    setTimeout(() => this.mpcLoaderService.hide(), 5000);
  }

}
