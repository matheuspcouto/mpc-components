import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo.guard';
import HomeComponent from './pages/home/home.component';
import { ButtonsComponent } from './pages/componentes/buttons/buttons.component';
import { NavbarComponent } from './pages/componentes/navbar/navbar.component';
import FormularioComponent from './pages/formulario/formulario.component';
import AguardeComponent from './pages/aguarde/aguarde.component';
import { CardsComponent } from './pages/componentes/cards/cards.component';
import { ModaisComponent } from './pages/componentes/modais/modais.component';
import { LoadersComponent } from './pages/componentes/loaders/loaders.component';
import { ScrollTopButtonComponent } from './pages/componentes/scroll-top-button/scroll-top-button.component';
import { TabsComponent } from './pages/componentes/tabs/tabs.component';
import { ComprovanteComponent } from './pages/componentes/comprovante/comprovante.component';

//TODO: verificar lazy loading com loadComponent e loadChildren
export const routes: Routes = [
  /*  Rotas para Home */
  { path: '', pathMatch: 'full', component: HomeComponent, title: 'My Components - Home', canActivate: [SiteAtivoGuard] },

  /*  Rotas para Componentes */
  {
    path: 'componentes',
    children: [
      { path: 'buttons', component: ButtonsComponent, title: 'My Components - MpcButtons', canActivate: [SiteAtivoGuard] },
      { path: 'cards', component: CardsComponent, title: 'My Components - MpcCards', canActivate: [SiteAtivoGuard] },
      { path: 'modais', component: ModaisComponent, title: 'My Components - MpcModais', canActivate: [SiteAtivoGuard] },
      { path: 'loaders', component: LoadersComponent, title: 'My Components - MpcLoaders', canActivate: [SiteAtivoGuard] },
      { path: 'navbar', component: NavbarComponent, title: 'My Components - MpcNavbar', canActivate: [SiteAtivoGuard] },
      { path: 'footer', component: NavbarComponent, title: 'My Components - MpcFooter', canActivate: [SiteAtivoGuard] },
      { path: 'scroll-top-button', component: ScrollTopButtonComponent, title: 'My Components - MpcScrollTop', canActivate: [SiteAtivoGuard] },
      { path: 'tabs', component: TabsComponent, title: 'My Components - MpcTabs', canActivate: [SiteAtivoGuard] },
      { path: 'comprovante', component: ComprovanteComponent, title: 'My Components - MpcComprovante', canActivate: [SiteAtivoGuard] },
    ]
  },

  /*  Rotas para Páginas */
  {
    path: 'paginas',
    children: [
      { path: 'formulario', component: FormularioComponent, title: 'My Components - Formulário', canActivate: [SiteAtivoGuard] },
      { path: 'aguarde', component: AguardeComponent, title: 'My Components - Aguarde' },
    ]
  },
];
