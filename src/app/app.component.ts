import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MpcLoaderComponent } from './shared/components/mpc-loader/mpc-loader.component';
import { MpcScrollTopButtonComponent } from "./shared/components/mpc-scroll-top-button/mpc-scroll-top-button.component";
import { MpcNavbarComponent, NavbarConfig } from "./shared/components/mpc-navbar/mpc-navbar.component";
import { MpcFooterComponent } from "./shared/components/mpc-footer/mpc-footer.component";
import { Rotas } from './shared/enums/rotas-enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcLoaderComponent, MpcScrollTopButtonComponent, MpcNavbarComponent, MpcFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  protected abas: NavbarConfig[] = [
    { titulo: 'Login', rota: Rotas.LOGIN, icone: 'bi bi-person-fill' },
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill' },
    {
      titulo: 'Componentes',
      rota: Rotas.COMPONENTES,
      icone: 'bi bi-code-slash',
      subRotas: [
        { titulo: 'Buttons', rota: Rotas.BUTTONS },
        { titulo: 'Cards', rota: Rotas.CARDS },
        { titulo: 'Modais', rota: Rotas.MODAIS },
        { titulo: 'Loaders', rota: Rotas.LOADERS },
        { titulo: 'Navbar', rota: Rotas.NAVBAR },
        { titulo: 'Footer', rota: Rotas.FOOTER },
        { titulo: 'Tabs', rota: Rotas.TABS },
        { titulo: 'ScrollTopButton', rota: Rotas.SCROLLTOP },
        { titulo: 'Paginação', rota: Rotas.PAGINACAO },
        { titulo: 'Inputs', rota: Rotas.INPUTS },
        { titulo: 'Page Header', rota: Rotas.PAGE_HEADER },
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
}

// TODO: Ajustar Tela de Login
// TODO: Tela de Login com guard e renderizar só o componente de login
// TODO: Tela de Cadastro
// TODO: Cor de componentes

