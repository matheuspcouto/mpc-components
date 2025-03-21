import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo.guard';
import HomeComponent from './pages/home/home.component';
import { ButtonsComponent } from './pages/componentes/buttons/buttons.component';
import { NavbarComponent } from './pages/componentes/navbar/navbar.component';
import FormularioComponent from './pages/formulario/1 - dados-pessoais/dados-pessoais.component';
import AguardeComponent from './pages/aguarde/aguarde.component';
import { CardsComponent } from './pages/componentes/cards/cards.component';
import { ModaisComponent } from './pages/componentes/modais/modais.component';
import { LoadersComponent } from './pages/componentes/loaders/loaders.component';
import { ScrollTopButtonComponent } from './pages/componentes/scroll-top-button/scroll-top-button.component';
import { TabsComponent } from './pages/componentes/tabs/tabs.component';
import { ComprovanteComponent } from './pages/componentes/comprovante/comprovante.component';
import { FooterComponent } from './pages/componentes/footer/footer.component';
import DadosPessoaisComponent from './pages/formulario/1 - dados-pessoais/dados-pessoais.component';
import ContatoComponent from './pages/formulario/2 - contato/contato.component';
import PagamentoComponent from './pages/formulario/3 - pagamento/pagamento.component';
import { ConfirmacaoComponent } from './pages/formulario/4 - confirmacao/confirmacao.component';

//TODO: verificar lazy loading com loadComponent e loadChildren
export const routes: Routes = [
  /*  Rotas para Home */
  { path: '', pathMatch: 'full', component: HomeComponent, title: 'Mpc Components - Home', canActivate: [SiteAtivoGuard] },

  /*  Rotas para Componentes */
  {
    path: 'componentes',
    children: [
      { path: 'buttons', component: ButtonsComponent, title: 'Mpc Components - MpcButtons', canActivate: [SiteAtivoGuard] },
      { path: 'cards', component: CardsComponent, title: 'Mpc Components - MpcCards', canActivate: [SiteAtivoGuard] },
      { path: 'modais', component: ModaisComponent, title: 'Mpc Components - MpcModais', canActivate: [SiteAtivoGuard] },
      { path: 'loaders', component: LoadersComponent, title: 'Mpc Components - MpcLoaders', canActivate: [SiteAtivoGuard] },
      { path: 'navbar', component: NavbarComponent, title: 'Mpc Components - MpcNavbar', canActivate: [SiteAtivoGuard] },
      { path: 'footer', component: FooterComponent, title: 'Mpc Components - MpcFooter', canActivate: [SiteAtivoGuard] },
      { path: 'scroll-top-button', component: ScrollTopButtonComponent, title: 'Mpc Components - MpcScrollTop', canActivate: [SiteAtivoGuard] },
      { path: 'tabs', component: TabsComponent, title: 'Mpc Components - MpcTabs', canActivate: [SiteAtivoGuard] },
      { path: 'comprovante', component: ComprovanteComponent, title: 'Mpc Components - MpcComprovante', canActivate: [SiteAtivoGuard] },
    ]
  },

  /*  Rotas para Páginas */
  {
    path: 'paginas',
    children: [
      {
        path: 'formulario',
        children: [
          { path: 'dados-pessoais', component: DadosPessoaisComponent, title: 'Mpc Components - Formulário' },
          { path: 'contato', component: ContatoComponent, title: 'Mpc Components - Formulário' },
          { path: 'pagamento', component: PagamentoComponent, title: 'Mpc Components - Formulário' },
          { path: 'confirmacao', component: ConfirmacaoComponent, title: 'Mpc Components - Formulário' },
        ]
      },
      { path: 'aguarde', component: AguardeComponent, title: 'Mpc Components - Aguarde' },
    ]
  },
];
