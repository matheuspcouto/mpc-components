import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcPageHeaderComponent } from '../../../shared/components/mpc-page-header/mpc-page-header.component';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-page-header',
  imports: [MpcPageHeaderComponent, MpcNavbarComponent, MpcFooterComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {} 