import { Component } from '@angular/core';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcLoaderService } from '../../../shared/components/mpc-loader/mpc-loader.service';

@Component({
  selector: 'app-loaders',
  imports: [ MpcButtonComponent ],
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
