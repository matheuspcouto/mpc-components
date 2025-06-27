/**
 * @Service ErrorService
 * Este service é responsável por lidar com erros e construir objetos de erro personalizados.
 * Utiliza Signal para gerenciar o estado do erro e compartilhar com componentes.
 *
 * Exemplo de utilização:
 * private errorService = inject(ErrorService);
 * errorService.construirErro(erro, rotaRetorno);
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 27/06/2025
 */

import { inject, Injectable, signal } from "@angular/core";
import { Rotas } from "../enums/rotas-enum";
import { Erro } from "./error.interface";
import { Router } from "@angular/router";

export const ERRO_PADRAO: Erro = {
  titulo: "Ops, algo deu errado!",
  mensagem: "Não foi possível realizar a operação, tente novamente e caso o problema persista, entre em contato com o suporte.",
  rotaRetorno: Rotas.HOME,
  imagem: "assets/img/modal/error.png", // Imagem padrão de erro
};

@Injectable({ providedIn: "root" })
export class ErrorService {
  private readonly router = inject(Router);

  // Signal para gerenciar o estado do erro
  private readonly _erro = signal<Erro | null>(null);

  // Signal público para componentes acessarem o erro
  public readonly erro = this._erro.asReadonly();

  /**
   * Constrói um erro e atualiza o estado
   */
  construirErro(e: any, rotaRetorno: string, imagem?: string): void {
    let erro: Erro;

    if (e && e.error) {
      erro = {
        titulo: ERRO_PADRAO.titulo,
        mensagem: `${e.error.message} - (Código ${e.error.status})`,
        rotaRetorno: rotaRetorno || ERRO_PADRAO.rotaRetorno,
        imagem: imagem || ERRO_PADRAO.imagem,
      } as Erro;
    } else {
      erro = {
        ...ERRO_PADRAO,
        rotaRetorno: rotaRetorno || ERRO_PADRAO.rotaRetorno,
        imagem: imagem || ERRO_PADRAO.imagem,
      } as Erro;
    }

    // Atualiza o estado do erro
    this._erro.set(erro);

    // Navega para a rota de erro
    this.router.navigate([Rotas.ERROR]);
  }

  /**
   * Limpa o estado do erro
   */
  limparErro(): void {
    this._erro.set(null);
  }
}

