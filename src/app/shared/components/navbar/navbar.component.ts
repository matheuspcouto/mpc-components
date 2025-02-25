import { Component, inject, InjectionToken } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Rotas } from '../../enums/rotas-enum';
import { SiteAtivoGuard } from '../../../guards/site-ativo.guard';
import { CommonModule } from '@angular/common';

const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});

@Component({
  selector: 'navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  abas: any = [
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill', ativo: true, focado: false },
    { titulo: 'Formulário', rota: Rotas.FORMULARIO, icone: 'bi bi-send-fill', ativo: true, focado: false },
    { titulo: 'Aguarde', rota: Rotas.AGUARDE, icone: 'bi bi-search', ativo: true, focado: false },
  ];
  showNavbar = true;
  isClicado = false;
  anoAtual = new Date().getFullYear();
  window = inject(WINDOW);

  constructor() {
    this.showNavbar = new SiteAtivoGuard(new Router()).siteAtivo;
    this.abas.forEach((item: any) => { if (item.rota === this.window.location.pathname) item.focado = true });
  }

  // Função para alternar o estado de 'focado' do item clicado
  setAbaAtiva(index: number): void {
    // Resetar 'focado' em todos os itens
    this.abas.forEach((item: any) => {
      item.focado = false;
    });

    // Ativar o item clicado
    this.abas[index].focado = true;
  }

}
