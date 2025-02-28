import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MpcNavbarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
