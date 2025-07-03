import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MpcCardMenuComponent } from "../../shared/components/Cards/mpc-card-menu/mpc-card-menu.component";
import { MpcButtonComponent } from '../../shared/components/mpc-button/mpc-button.component';

@Component({
  selector: 'app-home',
  imports: [MpcCardMenuComponent, MpcButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {
  private readonly router = inject(Router);

  irParaRepositorio() {
    window.open('https://github.com/matheuspcouto/mpc-components', '_blank');
  }
}
