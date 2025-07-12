# MPC Components

## 1. Título e Descrição do Projeto

**MPC Components** é um projeto Angular que reúne uma coleção de componentes reutilizáveis para aplicações web, incluindo inputs, botões, cards, modais, loaders, navegação, entre outros. O objetivo é facilitar o desenvolvimento de interfaces modernas, responsivas e padronizadas.

## 2. Libs Utilizadas

As principais bibliotecas utilizadas neste projeto (conforme `package.json`):

- **@angular/animations** ^19.2.0
- **@angular/common** ^19.2.0
- **@angular/compiler** ^19.2.0
- **@angular/core** ^19.2.0
- **@angular/forms** ^19.2.0
- **@angular/platform-browser** ^19.2.0
- **@angular/platform-browser-dynamic** ^19.2.0
- **@angular/platform-server** ^19.2.0
- **@angular/router** ^19.2.0
- **@angular/ssr** ^19.2.0
- **bootstrap** ^5.3.2
- **express** ^4.18.2
- **ngx-toastr** ^19.0.0
- **rxjs** ~7.8.0
- **tslib** ^2.3.0
- **zone.js** ~0.15.0

**DevDependencies:**
- **@angular-devkit/build-angular** ^19.2.0
- **@angular/cli** ^19.2.0
- **@angular/compiler-cli** ^19.2.0
- **@types/express** ^4.17.17
- **@types/jasmine** ~5.1.0
- **@types/jest** ^29.5.14
- **@types/node** ^18.18.0
- **jasmine-core** ~5.5.0
- **jest** ^29.7.0
- **jest-preset-angular** ^14.6.0
- **karma** ^6.4.4
- **karma-chrome-launcher** ^3.2.0
- **karma-jasmine** ^5.1.0
- **ng-packagr** ^19.2.0
- **nodemon** ^3.1.9
- **typescript** ~5.7.2

## 3. Clonar o Projeto

Clone este repositório usando o comando:

```bash
git clone <url-do-repositorio>
```

## 4. Montagem de Ambiente e Configuração

### Pré-requisitos
- **Node.js** (versão 20.18.3 ou superior): [Download Node.js](https://nodejs.org/)
- **Angular CLI** (versão 19.2.0 ou superior): [Documentação oficial](https://angular.dev/tools/cli)

Instale o Angular CLI globalmente (caso não tenha):
```bash
npm install -g @angular/cli@19.2.0
```

Instale as dependências do projeto:
```bash
npm install
```

## 5. Como Executar o Projeto

### Ambiente de Desenvolvimento
Para rodar o projeto localmente:
```bash
npm run dev
```
Acesse [http://localhost:4200](http://localhost:4200) no navegador.

### Outros Ambientes
```bash
# Ambiente local
npm run local

# Ambiente de produção
npm run production
```

### Build de Produção
Para gerar o build de produção:
```bash
npm run build
```
Os arquivos finais estarão em `dist/mpc-components`.

### Testes com Cobertura
Para rodar os testes unitários:
```bash
npm test
```
Os relatórios de cobertura estarão disponíveis em `coverage/`.

---

## 6. Estrutura do Projeto

```
mpc-components/
├── projects/mpc-lib-angular/     # Biblioteca de componentes
│   ├── src/lib/
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── pipes/               # Pipes customizados
│   │   └── styles/              # Estilos globais
├── src/app/                      # Aplicação principal
│   ├── pages/                   # Páginas da aplicação
│   ├── shared/                  # Componentes compartilhados
│   └── guards/                  # Guards de rota
└── mock/                        # Dados mock para desenvolvimento
```

## 7. Componentes Disponíveis

### Inputs
- `mpc-input-text` - Input de texto
- `mpc-input-email` - Input de email
- `mpc-input-senha` - Input de senha
- `mpc-input-telefone` - Input de telefone
- `mpc-input-cpfcnpj` - Input de CPF/CNPJ
- `mpc-input-date` - Input de data
- `mpc-input-number` - Input numérico
- `mpc-input-text-area` - Área de texto
- `mpc-input-select` - Select dropdown
- `mpc-input-radio` - Radio buttons
- `mpc-input-pesquisa` - Input de pesquisa
- `mpc-input-busca-cep` - Busca de CEP

### Cards
- `mpc-card` - Card básico
- `mpc-card-background-img` - Card com imagem de fundo
- `mpc-card-evento` - Card de evento
- `mpc-card-menu` - Card de menu

### Outros Componentes
- `mpc-button` - Botão customizado
- `mpc-btn-float` - Botão flutuante
- `mpc-modal` - Modal
- `mpc-loader` - Loader/Spinner
- `mpc-pagination` - Paginação
- `mpc-tabs` - Abas
- `mpc-form-progress-bar` - Barra de progresso de formulário
- `mpc-page-divider-img` - Divisor de página com imagem

### Pipes
- `cep` - Formatação de CEP
- `cpf-cnpj` - Formatação de CPF/CNPJ
- `email` - Validação de email
- `telefone` - Formatação de telefone

---

Para dúvidas, sugestões ou problemas, consulte a [documentação oficial do Angular](https://angular.dev/)

---

## Autor

Desenvolvido e mantido por **Matheus Pimentel do Couto**.

> **Github:** [matheuspcouto](https://github.com/matheuspcouto)
> **Linkedin:** [matheuspcouto](https://www.linkedin.com/in/matheuspcouto/)

Sinta-se à vontade para entrar em contato para dúvidas, sugestões ou contribuições!
