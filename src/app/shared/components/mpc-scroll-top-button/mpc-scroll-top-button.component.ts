/**
 * @Componente MpcScrollTopButtonComponent
 * Este componente é responsável por exibir um botão que ao ser clicado faz a rolagem da página para o topo.
 *
 * icone {string}: Ícone do botão.
 *
 * Exemplo de utilização:
 * <mpc-scroll-top-button icone="bi bi-arrow-up-short"></mpc-scroll-top-button>
 *
 * @author Matheus Pimentel Do Couto
 * @created 01/07/2025
 * @updated 01/07/2025
 */

import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'mpc-scroll-top-button',
  imports: [],
  templateUrl: './mpc-scroll-top-button.component.html',
  styleUrl: './mpc-scroll-top-button.component.css'
})
export class MpcScrollTopButtonComponent implements OnInit {

  @Input() icone: string = '';

  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const btnScrollTop = document.getElementById('scrollTop');

        if (btnScrollTop) {
          btnScrollTop.style.visibility = scrollPosition > 300 ? 'visible' : 'hidden';
        }
      });
    }

  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
