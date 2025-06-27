import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcCardMenuComponent } from "../../shared/components/Cards/mpc-card-menu/mpc-card-menu.component";
import { MpcFooterComponent } from '../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-home',
  imports: [MpcNavbarComponent, MpcCardMenuComponent, MpcFooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent { }
