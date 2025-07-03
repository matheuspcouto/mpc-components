import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';
import { MpcScrollTopButtonComponent } from '../../../shared/components/mpc-scroll-top-button/mpc-scroll-top-button.component';

@Component({
  selector: 'app-scroll-top-button',
  imports: [ MpcNavbarComponent, MpcFooterComponent, MpcScrollTopButtonComponent],
  templateUrl: './scroll-top-button.component.html',
  styleUrl: './scroll-top-button.component.css'
})
export class ScrollTopButtonComponent {

}
