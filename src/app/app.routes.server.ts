import { RenderMode, ServerRoute } from '@angular/ssr';
import { SegmentoRotas } from './shared/enums/rotas-enum';

export const serverRoutes: ServerRoute[] = [
  { path: `${SegmentoRotas.PAGINAS}/${SegmentoRotas.FORMULARIO}`, renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];
