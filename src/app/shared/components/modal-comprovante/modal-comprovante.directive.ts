import { Directive, InjectionToken, Input } from '@angular/core';

export interface ModalComprovanteConfig {
  titulo: string,
  dados: any,
  botao: () => void
}

export type Modal = (config: ModalComprovanteConfig) => Promise<boolean>;

export const MODAL = new InjectionToken<Modal>('ModalComprovanteConfig');

@Directive({ selector: '[modal]', exportAs: 'Modal' })
export class ModalDetalhesDirective {

  @Input('modal')
  config?: ModalComprovanteConfig;
}
