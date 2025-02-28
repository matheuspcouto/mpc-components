import { RenderMode, ServerRoute } from '@angular/ssr';

// TODO: Mapear rotas
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
