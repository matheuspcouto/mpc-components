/**
 * @Service ErrorService
 * Este service é responsável por lidar com erros e construir objetos de erro personalizados.
 *
 * Exemplo de utilização:
 * private errorService = inject(ErrorService);
 * errorService.construirErro(erro, rotaRetorno);
 *
 * @author Matheus Pimentel Do Couto
 * @created 16/06/2025
 * @updated 16/06/2025
 */

import { Injectable } from "@angular/core";
import { Rotas } from "../enums/rotas-enum";
import { Erro } from "./error.interface";

export const ERRO_PADRAO: Erro = {
  titulo: "Ops, algo deu errado!",
  mensagem: "Não foi possível realizar a operação, tente novamente e caso o problema persista, entre em contato com o suporte.",
  rotaRetorno: Rotas.HOME,
};

@Injectable({ providedIn: "root" })
export class ErrorService {

  construirErro(e: any, rotaRetorno: string) {
    if (e && e.error) {

      return {
        titulo: ERRO_PADRAO.titulo,
        mensagem: `${e.error.message} - (Código ${e.error.status})`,
        rotaRetorno: rotaRetorno || ERRO_PADRAO.rotaRetorno,
      } as Erro;
    }

    return ERRO_PADRAO;
  }
}

