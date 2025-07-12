export enum SegmentoRotas {
  HOME = "",
  ERROR = "error",

  // Componentes
  COMPONENTES = "componentes",
  LIB_DOC = "documentacao-geral",
  CARDS = "mpc-cards-doc",
  MODAIS = "mpc-modal-doc",
  LOADERS = "mpc-loader-doc",
  NAVBAR = "navbar",
  FOOTER = "footer",
  TABS = "mpc-tabs-doc",
  PAGINACAO = "mpc-pagination-doc",
  INPUTS = "mpc-inputs-doc",
  PAGE_HEADER = "mpc-page-header-doc",
  PAGE_DIVIDER_IMG = "mpc-page-divider-img-doc",
  PIPES = "mpc-pipes-doc",

  // Diretivas
  DIRETIVAS = "diretivas",
  BTN_FLOAT = "mpc-btn-float-doc",
  BUTTONS = "mpc-button-doc",

  // Templates
  TEMPLATES = "templates",

  // Formulário
  FORMULARIO = "formulario",
  DADOS_PESSOAIS = "dados-pessoais",
  CONTATO = "contato",
  PAGAMENTO = "pagamento",
  CONFIRMACAO = "confirmacao",
  DETALHES_INSCRICAO = "detalhes-inscricao",
  PESQUISA = "pesquisa",
  INSCRICOES_ENCERRADAS = "inscricoes-encerradas",

  // Outras páginas
  AGUARDE = "aguarde",
  LOGIN = "login",
  PAGINA_ERRO = "pagina-erro"
}

export enum Rotas {
  HOME = `/${SegmentoRotas.HOME}`,
  ERROR = `/${SegmentoRotas.ERROR}`,

  // Componentes
  COMPONENTES = `/${SegmentoRotas.COMPONENTES}`,
  LIB_DOC = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.LIB_DOC}`,
  CARDS = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.CARDS}`,
  MODAIS = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.MODAIS}`,
  LOADERS = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.LOADERS}`,
  TABS = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.TABS}`,
  PAGINACAO = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.PAGINACAO}`,
  INPUTS = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.INPUTS}`,
  PAGE_HEADER = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.PAGE_HEADER}`,
  BTN_FLOAT = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.BTN_FLOAT}`,
  BUTTONS = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.BUTTONS}`,
  PAGE_DIVIDER_IMG = `/${SegmentoRotas.COMPONENTES}/${SegmentoRotas.PAGE_DIVIDER_IMG}`,

  // Formulário
  FORMULARIO = `/${SegmentoRotas.FORMULARIO}`,
  DADOS_PESSOAIS = `/${SegmentoRotas.FORMULARIO}/${SegmentoRotas.DADOS_PESSOAIS}`,
  CONTATO = `/${SegmentoRotas.FORMULARIO}/${SegmentoRotas.CONTATO}`,
  PAGAMENTO = `/${SegmentoRotas.FORMULARIO}/${SegmentoRotas.PAGAMENTO}`,
  CONFIRMACAO = `/${SegmentoRotas.FORMULARIO}/${SegmentoRotas.CONFIRMACAO}`,
  DETALHES_INSCRICAO = `/${SegmentoRotas.FORMULARIO}/${SegmentoRotas.DETALHES_INSCRICAO}`,
  PESQUISA = `/${SegmentoRotas.FORMULARIO}/${SegmentoRotas.PESQUISA}`,
  INSCRICOES_ENCERRADAS = `/${SegmentoRotas.FORMULARIO}/${SegmentoRotas.INSCRICOES_ENCERRADAS}`,

  // Templates
  TEMPLATES = `/${SegmentoRotas.TEMPLATES}`,
  AGUARDE = `/${SegmentoRotas.TEMPLATES}/${SegmentoRotas.AGUARDE}`,
  LOGIN = `/${SegmentoRotas.TEMPLATES}/${SegmentoRotas.LOGIN}`,
  PAGINA_ERRO = `/${SegmentoRotas.TEMPLATES}/${SegmentoRotas.PAGINA_ERRO}`,
  NAVBAR = `/${SegmentoRotas.TEMPLATES}/${SegmentoRotas.NAVBAR}`,
  FOOTER = `/${SegmentoRotas.TEMPLATES}/${SegmentoRotas.FOOTER}`,
}
