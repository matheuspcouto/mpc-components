
/**
 * @Componente AppComponent
 *
 * Este componente é o componente raiz da aplicação, responsável por exibir a barra de navegação, 
 * rodapé, botão flutuante e loader global. Também controla o comportamento
 * de rolagem da página e a visibilidade do botão de voltar ao topo.
 *

 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MpcFooterComponent } from "./shared/components/mpc-footer/mpc-footer.component";
import { isPlatformBrowser } from '@angular/common';
import { MpcBtnFloatComponent, MpcLoaderComponent } from 'mpc-lib-angular';
import { MpcNavbarComponent } from './shared/components/mpc-navbar/mpc-navbar.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcLoaderComponent, MpcNavbarComponent, MpcFooterComponent, MpcBtnFloatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  /**
   * Identificador da plataforma (browser/server) para controle de funcionalidades específicas.
   */
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Inicializa o componente e adiciona listener para controlar a visibilidade do botão de scroll para o topo.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const btnScrollTop = document.getElementById('btn-scroll-top');

        if (btnScrollTop) {
          btnScrollTop.style.visibility = scrollPosition > 300 ? 'visible' : 'hidden';
        }
      });
    }

    console.log(`Server running on: '${environment.env}' mode.`);
  }

  /**
   * Realiza a rolagem suave para o topo da página.
   */
  protected scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}

// TODO: Ajustar Tela de Login
// TODO: Tela de Login com guard e renderizar só o componente de login
// TODO: Tela de Cadastro
// TODO: Corrigir documentação (um de cada vez)
// TODO: Exemplos de arquivos de config/yml em templates ou aba configs