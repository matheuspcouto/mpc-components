import { Component } from '@angular/core';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcLoaderService } from '../../../shared/components/mpc-loader/mpc-loader.service';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-loaders',
  imports: [ MpcButtonComponent, MpcNavbarComponent, MpcFooterComponent ],
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
