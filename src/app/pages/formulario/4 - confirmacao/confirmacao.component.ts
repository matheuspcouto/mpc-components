/**
 * @Componente ConfirmacaoComponent
 *
 * Este componente é responsável por exibir e gerenciar a etapa de confirmação do formulário de inscrição,
 * mostrando um resumo dos dados preenchidos e permitindo a finalização da inscrição.
 *
 * @Propriedades
 * @ViewChild modalSucesso {MpcModalComponent} - Referência ao modal de sucesso
 * @protected dadosInscricao {Inscricao} - Dados da inscrição a serem exibidos
 *
 * @Exemplo
 * ```html
 * <app-confirmacao></app-confirmacao>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InscricaoService } from '../service/inscricao.service';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { Inscricao } from '../model/inscricao.model';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { take } from 'rxjs';
import { MpcButtonComponent, MpcFormProgressBarComponent, MpcModalComponent, MpcModalConfig, TipoModal } from 'mpc-lib-angular';
import { MpcSectionComponent } from '../../../shared/components/mpc-section/mpc-section.component';

@Component({
  selector: 'app-confirmacao',
  imports: [MpcModalComponent, MpcFormProgressBarComponent, MpcButtonComponent, MpcSectionComponent],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent implements OnInit {

  // Injeções
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly mpcErrorService = inject(MpcErrorService);

  /**
   * Referência ao modal de sucesso.
   */
  @ViewChild('modalSucesso', { static: true }) private modalSucesso!: MpcModalComponent;
  
  /**
   * Dados da inscrição a serem exibidos.
   */
  protected dadosInscricao = new Inscricao();

  /**
   * Inicializa os dados da inscrição para exibição.
   */
  ngOnInit(): void {
    const dados = this.inscricaoService.getDadosInscricao();
    this.dadosInscricao.inicializarDadosPessoais(dados);
    this.dadosInscricao.inicializarContato(dados);
    this.dadosInscricao.inicializarPagamento(dados);
  }

  /**
   * Formata o valor para o padrão monetário brasileiro.
   * @param valor Valor a ser formatado
   * @returns {string} Valor formatado
   */
  protected formatarValor(valor: any): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Retorna o sexo formatado.
   * @returns {string} Sexo formatado
   */
  protected getSexo(): string {
    return this.dadosInscricao.sexo === 'M' ? 'Masculino' : 'Feminino';
  }

  /**
   * Realiza a inscrição e exibe modal de sucesso.
   */
  protected inscrever(): void {
    try {
      this.inscricaoService.inscrever(this.dadosInscricao)
        .pipe(take(1))
        .subscribe({
          next: (response: Inscricao) => {
            this.inscricaoService.atualizarDadosInscricao({ novosDados: response, proximaEtapa: 5 });
            this.abrirModalSucesso();
          },
          error: (error: any) => { throw error }
        });
    } catch (error) {
      this.mpcErrorService.construirErro(error);
    }
  }

  /**
   * Volta para a etapa de pagamento.
   */
  protected etapaAnterior(): void {
    try {
      this.router.navigate([Rotas.PAGAMENTO]);
    } catch (error) {
      this.mpcErrorService.construirErro(error);
    }
  }

  /**
   * Abre o modal de sucesso após inscrição.
   */
  private abrirModalSucesso(): void {
    const modalSucesso: MpcModalConfig = {
      titulo: 'Inscrição realizada com sucesso',
      texto: 'Sua inscrição foi realizada com sucesso, você pode acessar os detalhes da inscrição clicando no botão abaixo.',
      tipoModal: TipoModal.SUCESSO,
      botao: () => { this.router.navigate([Rotas.DETALHES_INSCRICAO]) },
      textoBotao: 'Abrir detalhes',
      segundoBotao: () => { this.modalSucesso?.fecharModal(); },
      textoSegundoBotao: 'Fechar',
    }
    this.modalSucesso?.abrirModal(modalSucesso);
  }
}
