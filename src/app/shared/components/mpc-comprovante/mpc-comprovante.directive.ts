import { Directive, InjectionToken, Input } from '@angular/core';

export interface MpcComprovanteConfig {
  titulo: string,
  dados: {
    dadosInscricao: {
      codigoInscricao: string,
      dataInscricao: string,
      status?: string,
    },
    dadosPessoais:  { label: string, valor: string }[]
    dadosPagamento: {
      formaPagamento: string,
      valor: number,
      statusPagamento?: string,
      dataPagamento?: string,
    }
  }
}

export type Modal = (config: MpcComprovanteConfig) => Promise<boolean>;

export const MODAL = new InjectionToken<Modal>('MpcComprovanteConfig');

@Directive({ selector: '[modal]', exportAs: 'Modal' })
export class MpcComprovanteDirective {

  @Input('modal')
  config?: MpcComprovanteConfig;
}
