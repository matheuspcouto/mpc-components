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
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, inject, InjectionToken, Input, OnInit } from '@angular/core';

const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});

@Component({
  selector: 'mpc-scroll-top-button',
  imports: [],
  templateUrl: './mpc-scroll-top-button.component.html',
  styleUrl: './mpc-scroll-top-button.component.css'
})
export class MpcScrollTopButtonComponent implements OnInit {

  @Input() icone: string = '';

  private window = inject(WINDOW);

  ngOnInit(): void {
    this.window.addEventListener('scroll', () => {
      const scrollPosition = this.window.scrollY;
      const btnScrollTop = document.getElementById('scrollTop');

      if (btnScrollTop) {
        btnScrollTop.style.visibility = scrollPosition > 300 ? 'visible' : 'hidden';
      }
    });
  }

  scrollToTop(): void {
    this.window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
