# MPC Components

## 1. Título e Descrição do Projeto

**MPC Components** é um projeto Angular que reúne uma coleção de componentes reutilizáveis para aplicações web, incluindo inputs, botões, cards, modais, loaders, navegação, entre outros. O objetivo é facilitar o desenvolvimento de interfaces modernas, responsivas e padronizadas.

## 2. Libs Utilizadas

As principais bibliotecas utilizadas neste projeto (conforme `package.json`):

- **@angular/animations** ^19.1.0
- **@angular/common** ^19.1.0
- **@angular/compiler** ^19.1.0
- **@angular/core** ^19.1.0
- **@angular/forms** ^19.1.0
- **@angular/platform-browser** ^19.1.0
- **@angular/platform-browser-dynamic** ^19.1.0
- **@angular/platform-server** ^19.1.0
- **@angular/router** ^19.1.0
- **@angular/ssr** ^19.1.6
- **bootstrap** ^5.3.2
- **express** ^4.18.2
- **jquery** ^3.7.1
- **ngx-toastr** ^19.0.0
- **rxjs** ~7.8.0
- **tslib** ^2.3.0
- **zone.js** ~0.15.0

**DevDependencies:**
- **@angular-devkit/build-angular** ^19.1.6
- **@angular/cli** ^19.1.6
- **@angular/compiler-cli** ^19.1.0
- **@types/express** ^4.17.17
- **@types/jasmine** ~5.1.0
- **@types/jest** ^29.5.14
- **@types/node** ^18.18.0
- **jasmine-core** ~5.5.0
- **jest** ^29.7.0
- **jest-preset-angular** ^14.6.0
- **nodemon** ^3.1.9
- **typescript** ~5.7.2

## 3. Clonar o Projeto

Clone este repositório usando o comando:

```bash
git clone <url-do-repositorio>
```

## 4. Montagem de Ambiente e Configuração

### Pré-requisitos
- **Node.js** (versão 20.18.3): [Download Node.js 20.18.3](https://nodejs.org/dist/v20.18.3/node-v20.18.3-x64.msi)
- **Angular CLI** (versão 19.1.8): [Documentação oficial](https://angular.dev/tools/cli)

Instale o Angular CLI globalmente (caso não tenha):
```bash
npm install -g @angular/cli@19.1.8
```

Instale as dependências do projeto:
```bash
npm install
```

#### Configuração de Ambiente
- O arquivo de ambiente padrão está em `src/environments/environment.ts`.
- Por padrão, a API é esperada em `http://localhost:3000` (veja a variável `apiUrl`).
- Para ambientes de produção, configure o arquivo `environment.prod.ts` conforme necessário.

## 5. Como Executar o Projeto

### Ambiente de Desenvolvimento
Para rodar o projeto localmente:
```bash
ng serve
```
Acesse [http://localhost:4200](http://localhost:4200) no navegador.

### Build de Produção
Para gerar o build de produção:
```bash
ng build --configuration=production
```
Os arquivos finais estarão em `dist/mpc-components`.

### Testes
Para rodar os testes unitários:
```bash
npm test
```

---

Caso tenha dúvidas, consulte a documentação oficial do Angular ou abra uma issue neste repositório.
