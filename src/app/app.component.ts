import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MpcLoaderComponent } from './shared/components/mpc-loader/mpc-loader.component';
import { MpcScrollTopButtonComponent } from "./shared/components/mpc-scroll-top-button/mpc-scroll-top-button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcLoaderComponent, MpcScrollTopButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}


// TODO: Ajustar Tela de Login
// TODO: Tela de Cadastro
// TODO: Cor de componentes
// TODO: Limite de cobertura de testes
// TODO: Readme.md
// TODO: padronizar telas de exibição de componentes

