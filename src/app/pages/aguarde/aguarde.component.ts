import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFooterComponent } from '../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-aguarde',
  imports: [MpcNavbarComponent, MpcFooterComponent],
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export default class AguardeComponent { }
