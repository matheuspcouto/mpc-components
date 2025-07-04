/**
 * @Componente ConfirmacaoComponent
 * Este componente é responsável por exibir e gerenciar a etapa de confirmação do formulário.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
 */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InscricaoService } from '../service/inscricao.service';
import { Router } from '@angular/router';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { Inscricao } from '../model/inscricao.model';
import { ErrorService } from '../../../shared/error/error.service';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-confirmacao',
  imports: [MpcButtonComponent, MpcModalComponent, MpcFormProgressBarComponent],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly errorService = inject(ErrorService);

  @ViewChild('modalSucesso', { static: true }) private modalSucesso!: MpcModalComponent;

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
   */
  protected formatarValor(valor: any): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Retorna o sexo formatado.
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
            this.inscricaoService.atualizarDadosInscricao(response, 5);
            this.abrirModalSucesso();
          },
          error: (error: any) => { throw error }
        });

    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

  /**
   * Volta para a etapa de pagamento.
   */
  protected etapaAnterior(): void {
    try {
      this.router.navigate([Rotas.PAGAMENTO]);
    } catch (error) {
      this.errorService.construirErro(error);
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
