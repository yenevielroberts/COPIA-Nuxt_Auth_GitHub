# COPIA-Nuxt_Auth_GitHub

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Apuntes clase
Puedo acceder a una página restrigida con el middleware.

- Primero abro la web, voy a network, busco el archivo. 

- Halgo click sobre el archivo y sale este código y copio en la url lo que sale en negrita: 

import { createHotContext as __vite__createHotContext } from "**/_nuxt**/@vite/client";import.meta.hot = __vite__createHotContext("**/pages/admin.vue?macro=true**");const __nuxt_page_meta = { middleware: ["auth"] }
export default __nuxt_page_meta
// Vite
if (import.meta.hot) {
  import.meta.hot.accept(mod => {
    Object.assign(__nuxt_page_meta, mod)
  })
}
// webpack
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept((err) => {
    if (err) { window.location = window.location.href }
  })
}

![alt text](image.png)

- Compio esto en la barra de navegación: http://localhost:3000/_nuxt/pages/admin.vue?macro=true

- Hago la busqueda y la respuesta es el archivo privado

## Drizzle 
- Dependecias

- npm install drizzle-orm @libsql/client
- npm install -D drizzle-kit


npx drizzle-kit push creación física 
npx drizzle-kit studio ->interficie de la base de datos

como actualizar node 
presentación: 01_vue_creacioProjecte

"@nuxt/ui": "^3.0.2" Libreria para hacer componentes con otros componentes ya creados 

[Nuxt UI documentation](https://ui.nuxt.com/docs/getting-started)

