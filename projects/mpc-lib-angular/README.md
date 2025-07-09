# MPC Library Angular

Biblioteca de componentes Angular com sistema de design customizável.

## Instalação

```bash
npm install mpc-lib-angular
```

## Configuração dos Estilos

### 1. Importar os Estilos da Biblioteca

No seu arquivo `angular.json`, adicione os estilos da biblioteca:

```json
{
  "styles": [
    "node_modules/mpc-lib-angular/lib/styles/mpc-lib.css",
    "src/styles.css"
  ]
}
```

Ou no seu `styles.css`:

```css
@import '~mpc-lib-angular/lib/styles/mpc-lib.css';
```

### 2. Variáveis CSS Disponíveis

A biblioteca define as seguintes variáveis CSS que podem ser sobrescritas:

#### Fontes
```css
--mpc-font-title: 'Potential', sans-serif;
--mpc-font-default: "Poppins", sans-serif;
--mpc-font-secondary: "Inter", sans-serif;
```

#### Cores
```css
--mpc-color-primary: #0E2749;
--mpc-color-secondary: #149DDD;
--mpc-color-tertiary: gray;
```

## Como Sobrescrever Variáveis CSS

### Opção 1: Sobrescrever no :root (Recomendado)

No seu arquivo `styles.css`:

```css
:root {
  /* Sobrescrever cores da biblioteca */
  --mpc-color-primary: #your-custom-color;
  --mpc-color-secondary: #your-custom-secondary;
  --mpc-color-tertiary: #your-custom-color;
  
  /* Sobrescrever fontes */
  --mpc-font-default: "Your Custom Font", sans-serif;
  --mpc-font-title: 'AAA', sans-serif;
  --mpc-font-secondary: "BBB", sans-serif;
  --
}
```

### Opção 2: Sobrescrever em um Container Específico

```css
.my-custom-theme {
  --mpc-color-primary: #your-custom-color;
  --mpc-color-secondary: #your-custom-secondary;
  --mpc-color-tertiary: #your-custom-color;
}
```

### Opção 3: Usando CSS Custom Properties com Fallbacks

```css
:root {
  --mpc-color-primary: var(--your-custom-primary, #0E2749);
  --mpc-color-secondary: var(--your-custom-secondary, #149DDD);
}
```

## Classes Utilitárias

A biblioteca também fornece classes utilitárias:

### Cores
- `.mpc-text-primary`
- `.mpc-text-secondary`
- `.mpc-text-tertiary`
- `.mpc-bg-primary`
- `.mpc-bg-secondary`
- `.mpc-bg-tertiary`

## Exemplo de Uso

```html
<div class="mpc-bg-primary">
  <h1 class="mpc-text-primary">Título</h1>
  <p class="mpc-text-secondary">Descrição</p>
</div>
```

## Autor

Desenvolvido e mantido por **Matheus Pimentel do Couto**.

> **Github:** [matheuspcouto](https://github.com/matheuspcouto)
> **Linkedin:** [matheuspcouto](https://www.linkedin.com/in/matheuspcouto/)

Sinta-se à vontade para entrar em contato para dúvidas, sugestões ou contribuições!