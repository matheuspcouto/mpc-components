/**
 * @Service ErrorService
 * Este service é responsável por lidar com erros e construir objetos de erro personalizados.
 * Utiliza Signal para gerenciar o estado do erro e compartilhar com componentes.
 *
 * Exemplo de utilização:
 * private errorService = inject(ErrorService);
 * errorService.construirErro(erro);
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
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
   * Constrói um erro e atualiza o estado.
   * @param erro Objeto de erro
   */
  construirErro(erro: any): void {
    let erroProcessado: Erro;

    if (erro) {
      if (erro.error) {
        // Se o erro tem uma propriedade error (comum em erros HTTP)
        erroProcessado = {
          titulo: erro.titulo || ERRO_PADRAO.titulo,
          mensagem: erro.mensagem || `${erro.error.message || 'Erro desconhecido'} - (Código ${erro.error.status || 'N/A'})`,
          rotaRetorno: erro.rotaRetorno || ERRO_PADRAO.rotaRetorno,
          imagem: erro.imagem || ERRO_PADRAO.imagem,
        } as Erro;
      } else {
        // Se é um objeto de erro customizado
        erroProcessado = {
          titulo: erro.titulo || ERRO_PADRAO.titulo,
          mensagem: erro.mensagem || erro.message || ERRO_PADRAO.mensagem,
          rotaRetorno: erro.rotaRetorno || ERRO_PADRAO.rotaRetorno,
          imagem: erro.imagem || ERRO_PADRAO.imagem,
        } as Erro;
      }
    } else {
      erroProcessado = ERRO_PADRAO;
    }

    // Atualiza o estado do erro
    this._erro.set(erroProcessado);

    // Navega para a rota de erro
    this.router.navigate([Rotas.ERROR]);
  }

  /**
   * Limpa o estado do erro.
   */
  limparErro(): void {
    this._erro.set(null);
  }
}

