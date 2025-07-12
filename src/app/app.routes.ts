import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo/site-ativo.guard';
import { InscricoesGuard } from './guards/inscricoes/inscricoes.guard';
import { SegmentoRotas } from './shared/enums/rotas-enum';

export const routes: Routes = [
  /*  Rotas para Home */
  {
    path: SegmentoRotas.HOME,
    pathMatch: 'full',
    loadComponent: () => import('./pages/templates/home/home.component').then(c => c.default),
    canActivate: [SiteAtivoGuard]
  },

  /*  Rotas para Error */
  {
    path: SegmentoRotas.ERROR,
    loadComponent: () => import('./shared/components/mpc-error/mpc-error.component').then(c => c.MpcErrorComponent),
    canActivate: [SiteAtivoGuard]
  },

  /*  Rotas para Componentes */
  {
    path: SegmentoRotas.COMPONENTES,
    children: [
      {
        path: SegmentoRotas.LIB_DOC,
        loadComponent: () => import('./pages/documentacao-geral/documentacao-geral.component').then(c => c.DocumentacaoGeralComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.CARDS,
        loadComponent: () => import('./pages/componentes/mpc-cards-doc/mpc-cards-doc.component').then(c => c.MpcCardsDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.MODAIS,
        loadComponent: () => import('./pages/componentes/mpc-modal-doc/mpc-modal-doc.component').then(c => c.MpcModalDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.LOADERS,
        loadComponent: () => import('./pages/componentes/mpc-loader-doc/mpc-loader-doc.component').then(c => c.MpcLoaderDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.TABS,
        loadComponent: () => import('./pages/componentes/mpc-tabs-doc/mpc-tabs-doc.component').then(c => c.MpcTabsDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.PAGINACAO,
        loadComponent: () => import('./pages/componentes/mpc-pagination-doc/mpc-pagination-doc.component').then(c => c.MpcPaginationDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.INPUTS,
        loadComponent: () => import('./pages/componentes/mpc-input-doc/mpc-inputs-doc.component').then(c => c.MpcInputsDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.PAGE_DIVIDER_IMG,
        loadComponent: () => import('./pages/componentes/mpc-page-divider-img-doc/mpc-page-divider-img-doc.component').then(c => c.MpcPageDividerImgDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.BTN_FLOAT,
        loadComponent: () => import('./pages/componentes/mpc-btn-float-doc/mpc-btn-float-doc.component').then(c => c.MpcBtnFloatDocComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.BUTTONS,
        loadComponent: () => import('./pages/componentes/mpc-button-doc/mpc-button-doc.component').then(c => c.MpcButtonDocComponent),
        canActivate: [SiteAtivoGuard]
      }
    ]
  },

  /* Rotas do Formulário */
  {
    path: SegmentoRotas.FORMULARIO,
    children: [
      {
        path: SegmentoRotas.DADOS_PESSOAIS,
        loadComponent: () => import('./pages/formulario/1 - dados-pessoais/dados-pessoais.component').then(c => c.default),
        canActivate: [SiteAtivoGuard, InscricoesGuard]
      },
      {
        path: SegmentoRotas.CONTATO,
        loadComponent: () => import('./pages/formulario/2 - contato/contato.component').then(c => c.default),
        canActivate: [SiteAtivoGuard, InscricoesGuard],
        data: { etapaMinima: 2, checagem: 'dadosPessoais' }
      },
      {
        path: SegmentoRotas.PAGAMENTO,
        loadComponent: () => import('./pages/formulario/3 - pagamento/pagamento.component').then(c => c.default),
        canActivate: [SiteAtivoGuard, InscricoesGuard],
        data: { etapaMinima: 3, checagem: 'dadosPessoaisEContato' }
      },
      {
        path: SegmentoRotas.CONFIRMACAO,
        loadComponent: () => import('./pages/formulario/4 - confirmacao/confirmacao.component').then(c => c.ConfirmacaoComponent),
        canActivate: [SiteAtivoGuard, InscricoesGuard],
        data: { etapaMinima: 4, checagem: 'inscricaoCompleta' }
      },
      {
        path: SegmentoRotas.DETALHES_INSCRICAO,
        loadComponent: () => import('./pages/formulario/detalhes-inscricao/detalhes-inscricao.component').then(c => c.DetalhesInscricaoComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.PESQUISA,
        loadComponent: () => import('./pages/formulario/pesquisa/pesquisa.component').then(c => c.PesquisaComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.INSCRICOES_ENCERRADAS,
        loadComponent: () => import('./pages/formulario/inscricoes-encerradas/inscricoes-encerradas.component').then(c => c.InscricoesEncerradasComponent),
        canActivate: [SiteAtivoGuard]
      },
    ]
  },

  /*  Rotas para Templates */
  {
    path: SegmentoRotas.TEMPLATES,
    children: [
      {
        path: SegmentoRotas.LOGIN,
        loadComponent: () => import('./pages/templates/login/login.component').then(c => c.default)
      },
      {
        path: SegmentoRotas.AGUARDE,
        loadComponent: () => import('./pages/aguarde/aguarde.component').then(c => c.default),
      },
      {
        path: SegmentoRotas.PAGINA_ERRO,
        loadComponent: () => import('./pages/templates/pagina-erro/pagina-erro.component').then(c => c.PaginaErroComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.NAVBAR,
        loadComponent: () => import('./pages/templates/navbar/navbar.component').then(c => c.NavbarComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: SegmentoRotas.FOOTER,
        loadComponent: () => import('./pages/templates/footer/footer.component').then(c => c.FooterComponent),
        canActivate: [SiteAtivoGuard]
      },
    ]
  },
];
