import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'componentes', renderMode: RenderMode.Server },
  { path: 'paginas/formulario', renderMode: RenderMode.Client },
  { path: 'paginas/aguarde', renderMode: RenderMode.Prerender },
];
