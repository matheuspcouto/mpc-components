import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo/site-ativo.guard';
import { InscricoesGuard } from './guards/inscricoes/inscricoes.guard';

export const routes: Routes = [
  /*  Rotas para Home */
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/paginas-avulsas/home/home.component').then(c => c.default),
    canActivate: [SiteAtivoGuard]
  },

  /*  Rotas para Error */
  {
    path: 'error',
    loadComponent: () => import('./shared/error/error.component').then(c => c.ErrorComponent),
    canActivate: [SiteAtivoGuard]
  },

  /*  Rotas para Componentes */
  {
    path: 'componentes',
    children: [
      {
        path: 'mpc-cards-doc',
        loadComponent: () => import('./pages/componentes/mpc-cards-doc/mpc-cards-doc.component').then(c => c.MpcCardsDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-modal-doc',
        loadComponent: () => import('./pages/componentes/mpc-modal-doc/mpc-modal-doc.component').then(c => c.MpcModalDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-loader-doc',
        loadComponent: () => import('./pages/componentes/mpc-loader-doc/mpc-loader-doc.component').then(c => c.MpcLoaderDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-navbar-doc',
        loadComponent: () => import('./pages/componentes/mpc-navbar-doc/mpc-navbar-doc.component').then(c => c.MpcNavbarDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-footer-doc',
        loadComponent: () => import('./pages/componentes/mpc-footer-doc/mpc-footer-doc.component').then(c => c.MpcFooterDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-tabs-doc',
        loadComponent: () => import('./pages/componentes/mpc-tabs-doc/mpc-tabs-doc.component').then(c => c.MpcTabsDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-pagination-doc',
        loadComponent: () => import('./pages/componentes/mpc-pagination-doc/mpc-pagination-doc.component').then(c => c.MpcPaginationDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-inputs-doc',
        loadComponent: () => import('./pages/componentes/mpc-input-doc/mpc-inputs-doc.component').then(c => c.MpcInputsDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-page-header-doc',
        loadComponent: () => import('./pages/componentes/mpc-page-header-doc/mpc-page-header-doc.component').then(c => c.MpcPageHeaderDocComponent),
        canActivate: [SiteAtivoGuard]
      },
    ]
  },

  /*  Rotas para Diretivas */
  {
    path: 'diretivas',
    children: [
      {
        path: 'mpc-btn-float-doc',
        loadComponent: () => import('./pages/diretivas/mpc-btn-float-doc/mpc-btn-float-doc.component').then(c => c.MpcBtnFloatDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'mpc-button-doc',
        loadComponent: () => import('./pages/diretivas/mpc-button-doc/mpc-button-doc.component').then(c => c.MpcButtonDocComponent),
        canActivate: [SiteAtivoGuard]
      },
    ]
  },

  /*  Rotas para Páginas */
  {
    path: 'paginas',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/paginas-avulsas/login/login.component').then(c => c.default)
      },
      {
        path: 'formulario',
        children: [
          {
            path: 'dados-pessoais',
            loadComponent: () => import('./pages/formulario/1 - dados-pessoais/dados-pessoais.component').then(c => c.default),
            canActivate: [SiteAtivoGuard, InscricoesGuard]
          },
          {
            path: 'contato',
            loadComponent: () => import('./pages/formulario/2 - contato/contato.component').then(c => c.default),
            canActivate: [SiteAtivoGuard, InscricoesGuard],
            data: { etapaMinima: 2, checagem: 'dadosPessoais' }
          },
          {
            path: 'pagamento',
            loadComponent: () => import('./pages/formulario/3 - pagamento/pagamento.component').then(c => c.default),
            canActivate: [SiteAtivoGuard, InscricoesGuard],
            data: { etapaMinima: 3, checagem: 'dadosPessoaisEContato' }
          },
          {
            path: 'confirmacao',
            loadComponent: () => import('./pages/formulario/4 - confirmacao/confirmacao.component').then(c => c.ConfirmacaoComponent),
            canActivate: [SiteAtivoGuard, InscricoesGuard],
            data: { etapaMinima: 4, checagem: 'inscricaoCompleta' }
          },
          {
            path: 'detalhes-inscricao',
            loadComponent: () => import('./pages/formulario/detalhes-inscricao/detalhes-inscricao.component').then(c => c.DetalhesInscricaoComponent),
            canActivate: [SiteAtivoGuard]
          },
          {
            path: 'pesquisa',
            loadComponent: () => import('./pages/formulario/pesquisa/pesquisa.component').then(c => c.PesquisaComponent),
            canActivate: [SiteAtivoGuard]
          },
          {
            path: 'inscricoes-encerradas',
            loadComponent: () => import('./pages/formulario/inscricoes-encerradas/inscricoes-encerradas.component').then(c => c.InscricoesEncerradasComponent),
            canActivate: [SiteAtivoGuard]
          },
        ]
      },
      {
        path: 'aguarde',
        loadComponent: () => import('./pages/aguarde/aguarde.component').then(c => c.default),
      },
      {
        path: 'pagina-erro',
        loadComponent: () => import('./pages/paginas-avulsas/pagina-erro/pagina-erro.component').then(c => c.PaginaErroComponent),
        canActivate: [SiteAtivoGuard]
      }
    ]
  },
];
