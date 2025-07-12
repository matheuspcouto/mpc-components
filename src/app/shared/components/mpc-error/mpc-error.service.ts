/**
 * @Serviço MpcErrorService
 * 
 * Responsável por lidar com erros e construir objetos de erro personalizados.
 * Utiliza Signal para gerenciar o estado do erro e compartilhar com componentes.
 *
 * @Propriedades
 * @property {Signal<MpcErro|null>} erro Signal somente leitura para acesso externo
 *
 * @Exemplo
 *   const errorService = inject(MpcErrorService);
 *   errorService.construirErro(erro);
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */

import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Rotas } from "../../enums/rotas-enum";
import { MpcErro } from "./mpc-error.component";

/**
 * Objeto padrão de erro utilizado pelo serviço.
 * @type {MpcErro}
 */
export const ERRO_PADRAO: MpcErro = {
  titulo: "Ops, algo deu errado!",
  mensagem: "Não foi possível realizar a operação, tente novamente e caso o problema persista, entre em contato com o suporte.",
  rotaRetorno: Rotas.HOME,
  imagem: "assets/img/modal/error.png", // Imagem padrão de erro
};

@Injectable({ providedIn: "root" })
export class MpcErrorService {
  /**
   * Instância do Router para navegação programática.
   */
  private readonly router = inject(Router);

  /**
   * Signal interna para gerenciar o estado do erro.
   * @type {Signal<MpcErro|null>}
   */
  private readonly _erro = signal<MpcErro | null>(null);

  /**
   * Signal pública somente leitura para componentes acessarem o erro.
   * @type {Signal<MpcErro|null>}
   */
  public readonly erro = this._erro.asReadonly();

  /**
   * Constrói um erro e atualiza o estado.
   * @param {any} erro Objeto de erro ou erro HTTP
   * @returns {void}
   * @example
   *   errorService.construirErro({ mensagem: 'Erro customizado' });
   */
  construirErro(erro: any): void {
    let erroProcessado: MpcErro;

    if (erro) {
      if (erro.error) {
        // Se o erro tem uma propriedade error (comum em erros HTTP)
        erroProcessado = {
          titulo: erro.titulo || ERRO_PADRAO.titulo,
          mensagem: erro.mensagem || `${erro.error.message || 'Erro desconhecido'} - (Código ${erro.error.status || 'N/A'})`,
          rotaRetorno: erro.rotaRetorno || ERRO_PADRAO.rotaRetorno,
          imagem: erro.imagem || ERRO_PADRAO.imagem,
        } as MpcErro;
      } else {
        // Se é um objeto de erro customizado
        erroProcessado = {
          titulo: erro.titulo || ERRO_PADRAO.titulo,
          mensagem: erro.mensagem || erro.message || ERRO_PADRAO.mensagem,
          rotaRetorno: erro.rotaRetorno || ERRO_PADRAO.rotaRetorno,
          imagem: erro.imagem || ERRO_PADRAO.imagem,
        } as MpcErro;
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
   * @returns {void}
   * @example
   *   errorService.limparErro();
   */
  limparErro(): void {
    this._erro.set(null);
  }
}