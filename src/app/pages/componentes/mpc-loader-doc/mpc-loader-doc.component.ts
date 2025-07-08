import { Component, inject } from '@angular/core';
import { MpcButtonDirective, MpcLoaderService } from 'mpc-lib-angular';

@Component({
  selector: 'app-loaders',
  imports: [ MpcButtonDirective ],
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
