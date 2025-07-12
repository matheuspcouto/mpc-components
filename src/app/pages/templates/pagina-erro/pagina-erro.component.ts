/**
 * @Componente PaginaErroComponent
 *
 * Este componente exibe uma página de erro customizada, permitindo simular diferentes tipos de erros para testes e demonstração.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-pagina-erro></app-pagina-erro>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */

import { Component, inject } from '@angular/core';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcButtonComponent } from 'mpc-lib-angular';
import { MpcSectionComponent } from "../../../shared/components/mpc-section/mpc-section.component";

@Component({
  selector: 'app-pagina-erro',
  standalone: true,
  imports: [MpcButtonComponent, MpcSectionComponent],
  templateUrl: './pagina-erro.component.html',
  styleUrl: './pagina-erro.component.css'
})
export class PaginaErroComponent {
  private mpcErrorService = inject(MpcErrorService);

  /**
   * Simula um erro detalhado de conexão com o servidor.
   */
  simularErroDetalhado(): void {
    const erroSimulado = {
      error: {
        message: 'Erro de conexão com o servidor',
        status: 500
      },
      titulo: 'Erro de Conexão',
      rotaRetorno: Rotas.PAGINA_ERRO
    };
    this.mpcErrorService.construirErro(erroSimulado);
  }

  /**
   * Simula um erro genérico para testes.
   */
  simularErroGenerico(): void {
    const erroSimulado = {
      titulo: "Ops, algo deu errado!",
      mensagem: "Não foi possível realizar a operação, tente novamente e caso o problema persista, entre em contato com o suporte.",
      rotaRetorno: Rotas.PAGINA_ERRO
    };
    this.mpcErrorService.construirErro(erroSimulado);
  }

  /**
   * Simula um erro de validação de dados.
   */
  simularErroValidacao(): void {
    const erroValidacao = {
      error: {
        message: 'Dados inválidos fornecidos',
        status: 400
      },
      titulo: 'Erro de Validação',
      rotaRetorno: Rotas.PAGINA_ERRO
    };
    this.mpcErrorService.construirErro(erroValidacao);
  }

  /**
   * Simula um erro com imagem personalizada.
   */
  simularErroComImagem(): void {
    const erroSimulado = {
      error: {
        message: 'Erro com imagem personalizada',
        status: 404
      },
      titulo: 'Erro Personalizado',
      rotaRetorno: Rotas.PAGINA_ERRO,
      imagem: 'assets/img/modal/atencao.png'
    };
    this.mpcErrorService.construirErro(erroSimulado);
  }
} 