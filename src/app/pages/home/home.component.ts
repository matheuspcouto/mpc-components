import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcCardMenuComponent } from "../../shared/components/Cards/mpc-card-menu/mpc-card-menu.component";

@Component({
  selector: 'app-home',
  imports: [MpcNavbarComponent, MpcCardMenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent { }
