import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo.guard';
import { AguardeComponent } from './pages/aguarde/aguarde.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { HomeComponent } from './pages/home/home.component';
import { ComponentesComponent } from './pages/componentes/componentes.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [SiteAtivoGuard] },
  { path: 'componentes', component: ComponentesComponent, canActivate: [SiteAtivoGuard] },
  { path: 'paginas/formulario', component: FormularioComponent, canActivate: [SiteAtivoGuard] },
  { path: 'paginas/aguarde', component: AguardeComponent },
];
