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

interface NavbarConfig {
  titulo: string,
  rota: string,
  icone: string,
  ativo: boolean,
  focado: boolean,
  subMenus?: NavbarConfig[]
}

@Component({
  selector: 'navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  abas: NavbarConfig[] = [
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill', ativo: true, focado: false },
    { titulo: 'Documentação', rota: Rotas.DOCS, icone: 'bi bi-book-fill', ativo: true, focado: false },
    { titulo: 'Formulário', rota: Rotas.FORMULARIO, icone: 'bi bi-send-fill', ativo: true, focado: false },
    {
      titulo: 'Componentes',
      rota: Rotas.COMPONENTES,
      icone: 'bi bi-file-code-fill',
      ativo: true,
      focado: false,
      subMenus: [
        { titulo: 'Modais', rota: Rotas.MODAIS, icone: 'bi bi-house-fill', ativo: true, focado: false },
        { titulo: 'Loader', rota: Rotas.LOADER, icone: 'bi bi-house-fill', ativo: true, focado: false },
        { titulo: 'Notificações', rota: Rotas.NOTIFICACOES, icone: 'bi bi-house-fill', ativo: true, focado: false },
        { titulo: 'Cards', rota: Rotas.CARDS, icone: 'bi bi-house-fill', ativo: true, focado: false },
      ]
    },
    {
      titulo: 'Páginas',
      rota: Rotas.PAGINAS,
      icone: 'bi bi-file-earmark-fill',
      ativo: true,
      focado: false,
      subMenus: [
        { titulo: 'Aguarde', rota: Rotas.AGUARDE, icone: 'bi bi-alarm-fill', ativo: true, focado: false },
        { titulo: 'Login', rota: Rotas.LOGIN, icone: 'bi bi-house-fill', ativo: false, focado: false },
      ]
    },
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
