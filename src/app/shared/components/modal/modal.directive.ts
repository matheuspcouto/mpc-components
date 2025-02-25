import { Directive, InjectionToken, Input } from '@angular/core';

export interface ModalConfig {
  titulo: string,
  texto: string,
  textoBotao: string,
  imagem?: string,
  tipoModal?: any,
  botao?: () => void,
  textoSegundoBotao?: string,
  segundoBotao?: () => void
}

export type Modal = (config: ModalConfig) => Promise<boolean>;

export const MODAL = new InjectionToken<Modal>('ModalConfig');

@Directive({ selector: '[modal]', exportAs: 'Modal' })
export class ModalDetalhesDirective {

  @Input('modal')
  config?: ModalConfig;
}
