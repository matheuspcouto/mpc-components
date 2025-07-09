import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MpcFooterComponent } from "./shared/components/mpc-footer/mpc-footer.component";
import { Rotas } from './shared/enums/rotas-enum';
import { isPlatformBrowser } from '@angular/common';
import { MpcLoaderComponent, MpcNavbarComponent, NavbarConfig, MpcBtnFloatDirective } from 'mpc-lib-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcLoaderComponent, MpcNavbarComponent, MpcFooterComponent, MpcBtnFloatDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  protected abas: NavbarConfig[] = [
    { titulo: 'Login', rota: Rotas.LOGIN, icone: 'bi bi-person-fill' },
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill' },
    {
      titulo: 'Componentes',
      rota: Rotas.COMPONENTES,
      icone: 'bi bi-code-slash',
      subRotas: [
        { titulo: 'mpc-cards', rota: Rotas.CARDS },
        { titulo: 'mpc-modal', rota: Rotas.MODAIS },
        { titulo: 'mpc-loader', rota: Rotas.LOADERS },
        { titulo: 'mpc-navbar', rota: Rotas.NAVBAR },
        { titulo: 'mpc-footer', rota: Rotas.FOOTER },
        { titulo: 'mpc-tabs', rota: Rotas.TABS },
        { titulo: 'mpc-pagination', rota: Rotas.PAGINACAO },
        { titulo: 'mpc-inputs', rota: Rotas.INPUTS },
        { titulo: 'mpc-page-header', rota: Rotas.PAGE_HEADER },
      ]
    },
    {
      titulo: 'Diretivas',
      rota: Rotas.DIRETIVAS,
      icone: 'bi bi-code-slash',
      subRotas: [
        { titulo: 'mpc-button', rota: Rotas.BUTTONS },
        { titulo: 'mpc-btn-float', rota: Rotas.BTN_FLOAT },
      ]
    },
    {
      titulo: 'Formulário',
      rota: Rotas.FORMULARIO,
      icone: 'bi bi-file-earmark-text-fill',
      subRotas: [
        { titulo: 'Realizar Inscrição (Fluxo)', rota: Rotas.DADOS_PESSOAIS },
        { titulo: 'Pesquisar Inscrição', rota: Rotas.PESQUISA },
        { titulo: 'Inscrições Encerradas', rota: Rotas.INSCRICOES_ENCERRADAS },
      ]
    },
    {
      titulo: 'Páginas Avulsas',
      rota: Rotas.PAGINAS,
      icone: 'bi bi-filetype-html',
      subRotas: [
        { titulo: 'Aguarde', rota: Rotas.AGUARDE },
        /* { titulo: 'Login', rota: Rotas.LOGIN }, */
        { titulo: 'Erro', rota: Rotas.PAGINA_ERRO },
      ]
    },
  ];

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

  protected scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}

// TODO: Ajustar Tela de Login
// TODO: Tela de Login com guard e renderizar só o componente de login
// TODO: Tela de Cadastro
// TODO: Adiiconar Page Divider a lib
// TODO: Adicionar Pagina de Pipes

