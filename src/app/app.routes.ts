import { InscricoesEncerradasComponent } from './pages/formulario/inscricoes-encerradas/inscricoes-encerradas.component';
import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo.guard';
import HomeComponent from './pages/home/home.component';
import { ButtonsComponent } from './pages/componentes/buttons/buttons.component';
import { NavbarComponent } from './pages/componentes/navbar/navbar.component';
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
import { InscricoesGuard } from './guards/inscricoes.guard';

//TODO: verificar lazy loading com loadComponent e loadChildren
export const routes: Routes = [
  /*  Rotas para Home */
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [SiteAtivoGuard] },

  /*  Rotas para Componentes */
  {
    path: 'componentes',
    children: [
      { path: 'buttons', component: ButtonsComponent, canActivate: [SiteAtivoGuard] },
      { path: 'cards', component: CardsComponent, canActivate: [SiteAtivoGuard] },
      { path: 'modais', component: ModaisComponent, canActivate: [SiteAtivoGuard] },
      { path: 'loaders', component: LoadersComponent, canActivate: [SiteAtivoGuard] },
      { path: 'navbar', component: NavbarComponent, canActivate: [SiteAtivoGuard] },
      { path: 'footer', component: FooterComponent, canActivate: [SiteAtivoGuard] },
      { path: 'scroll-top-button', component: ScrollTopButtonComponent, canActivate: [SiteAtivoGuard] },
      { path: 'tabs', component: TabsComponent, canActivate: [SiteAtivoGuard] },
      { path: 'comprovante', component: ComprovanteComponent, canActivate: [SiteAtivoGuard] },
    ]
  },

  /*  Rotas para Páginas */
  {
    path: 'paginas',
    children: [
      {
        path: 'formulario',
        children: [
          { path: 'dados-pessoais', component: DadosPessoaisComponent, canActivate: [SiteAtivoGuard, InscricoesGuard] },
          { path: 'contato', component: ContatoComponent, canActivate: [SiteAtivoGuard, InscricoesGuard] },
          { path: 'pagamento', component: PagamentoComponent, canActivate: [SiteAtivoGuard, InscricoesGuard] },
          { path: 'confirmacao', component: ConfirmacaoComponent, canActivate: [SiteAtivoGuard, InscricoesGuard] },
          { path: 'inscricoes-encerradas', component: InscricoesEncerradasComponent, canActivate: [SiteAtivoGuard] },
        ]
      },
      { path: 'aguarde', component: AguardeComponent, title: 'Mpc Components - Aguarde' },
    ]
  },
];
