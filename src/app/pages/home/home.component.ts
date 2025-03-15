import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { PageHeaderHomeComponent } from './page-header-home/page-header-home.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MpcNavbarComponent, PageHeaderHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent { }
