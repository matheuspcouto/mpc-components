import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo/site-ativo.guard';
import { InscricoesGuard } from './guards/inscricoes/inscricoes.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { SegmentoRotas } from './shared/enums/rotas-enum';
import { FormularioGuard } from './guards/formulario/formulario.guard';

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
    canActivate: [AuthGuard, SiteAtivoGuard],
    children: [
      {
        path: SegmentoRotas.LIB_DOC,
        loadComponent: () => import('./pages/documentacao-geral/documentacao-geral.component').then(c => c.DocumentacaoGeralComponent),
      },
      {
        path: SegmentoRotas.CARDS,
        loadComponent: () => import('./pages/componentes/mpc-cards-doc/mpc-cards-doc.component').then(c => c.MpcCardsDocComponent),
      },
      {
        path: SegmentoRotas.MODAIS,
        loadComponent: () => import('./pages/componentes/mpc-modal-doc/mpc-modal-doc.component').then(c => c.MpcModalDocComponent),
      },
      {
        path: SegmentoRotas.LOADERS,
        loadComponent: () => import('./pages/componentes/mpc-loader-doc/mpc-loader-doc.component').then(c => c.MpcLoaderDocComponent),
      },
      {
        path: SegmentoRotas.TABS,
        loadComponent: () => import('./pages/componentes/mpc-tabs-doc/mpc-tabs-doc.component').then(c => c.MpcTabsDocComponent),
      },
      {
        path: SegmentoRotas.PAGINACAO,
        loadComponent: () => import('./pages/componentes/mpc-pagination-doc/mpc-pagination-doc.component').then(c => c.MpcPaginationDocComponent),
      },
      {
        path: SegmentoRotas.INPUTS,
        loadComponent: () => import('./pages/componentes/mpc-input-doc/mpc-inputs-doc.component').then(c => c.MpcInputsDocComponent),
      },
      {
        path: SegmentoRotas.BTN_FLOAT,
        loadComponent: () => import('./pages/componentes/mpc-btn-float-doc/mpc-btn-float-doc.component').then(c => c.MpcBtnFloatDocComponent),
      },
      {
        path: SegmentoRotas.BUTTONS,
        loadComponent: () => import('./pages/componentes/mpc-button-doc/mpc-button-doc.component').then(c => c.MpcButtonDocComponent),
      }
    ]
  },

  /* Rotas do Formulário */
  {
    path: SegmentoRotas.FORMULARIO,
    canActivate: [AuthGuard, SiteAtivoGuard, InscricoesGuard],
    children: [
      {
        path: SegmentoRotas.DADOS_PESSOAIS,
        loadComponent: () => import('./pages/formulario/1 - dados-pessoais/dados-pessoais.component').then(c => c.default),
        canActivate: [FormularioGuard]
      },
      {
        path: SegmentoRotas.CONTATO,
        loadComponent: () => import('./pages/formulario/2 - contato/contato.component').then(c => c.default),
        canActivate: [FormularioGuard],
        data: { etapaMinima: 2, checagem: 'dadosPessoais' }
      },
      {
        path: SegmentoRotas.PAGAMENTO,
        loadComponent: () => import('./pages/formulario/3 - pagamento/pagamento.component').then(c => c.default),
        canActivate: [FormularioGuard],
        data: { etapaMinima: 3, checagem: 'dadosPessoaisEContato' }
      },
      {
        path: SegmentoRotas.CONFIRMACAO,
        loadComponent: () => import('./pages/formulario/4 - confirmacao/confirmacao.component').then(c => c.ConfirmacaoComponent),
        canActivate: [FormularioGuard],
        data: { etapaMinima: 4, checagem: 'inscricaoCompleta' }
      },
      {
        path: SegmentoRotas.DETALHES_INSCRICAO,
        loadComponent: () => import('./pages/formulario/detalhes-inscricao/detalhes-inscricao.component').then(c => c.DetalhesInscricaoComponent),
        canActivate: [FormularioGuard]
      },
      {
        path: SegmentoRotas.PESQUISA,
        loadComponent: () => import('./pages/formulario/pesquisa/pesquisa.component').then(c => c.PesquisaComponent),
        canActivate: [FormularioGuard]
      },
      {
        path: SegmentoRotas.INSCRICOES_ENCERRADAS,
        loadComponent: () => import('./pages/formulario/inscricoes-encerradas/inscricoes-encerradas.component').then(c => c.InscricoesEncerradasComponent),
        canActivate: [FormularioGuard]
      },
    ]
  },

  /*  Rotas para Templates */
  {
    path: SegmentoRotas.TEMPLATES,
    canActivate: [AuthGuard, SiteAtivoGuard],
    children: [
      {
        path: SegmentoRotas.LOGIN,
        loadComponent: () => import('./pages/templates/login/login.component').then(c => c.default)
      },
      {
        path: SegmentoRotas.AGUARDE,
        loadComponent: () => import('./pages/templates/aguarde/aguarde.component').then(c => c.default),
      },
      {
        path: SegmentoRotas.PAGINA_ERRO,
        loadComponent: () => import('./pages/templates/pagina-erro/pagina-erro.component').then(c => c.PaginaErroComponent),
      },
      {
        path: SegmentoRotas.NAVBAR,
        loadComponent: () => import('./pages/templates/navbar/navbar.component').then(c => c.NavbarComponent),
      },
      {
        path: SegmentoRotas.FOOTER,
        loadComponent: () => import('./pages/templates/footer/footer.component').then(c => c.FooterComponent),
      },
    ]
  },
];
