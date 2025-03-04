import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./pages/home/home.component'), title: 'My Components - Página Inicial', canActivate: [SiteAtivoGuard] },
  { path: 'componentes', loadComponent: () => import('./pages/componentes/componentes.component'), title: 'My Components - Componentes', canActivate: [SiteAtivoGuard] },
  { path: 'paginas/formulario', loadComponent: () => import('./pages/formulario/formulario.component'), title: 'My Components - Formulário', canActivate: [SiteAtivoGuard] },
  { path: 'paginas/aguarde', loadComponent: () => import('./pages/aguarde/aguarde.component'), title: 'My Components - Aguarde'},

];
