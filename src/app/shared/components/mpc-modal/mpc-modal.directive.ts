import { Directive, InjectionToken, Input } from '@angular/core';

export interface MpcModalConfig {
  titulo: string,
  texto: string,
  textoBotao: string,
  imagem?: string,
  tipoModal?: any,
  botao?: () => void,
  textoSegundoBotao?: string,
  segundoBotao?: () => void
}

export type Modal = (config: MpcModalConfig) => Promise<boolean>;

export const MODAL = new InjectionToken<Modal>('MpcModalConfig');

@Directive({ selector: '[modal]', exportAs: 'Modal' })
export class MpcModalDirective {

  @Input('modal')
  config?: MpcModalConfig;
}
