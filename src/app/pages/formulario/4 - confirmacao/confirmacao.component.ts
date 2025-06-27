import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InscricaoService } from '../service/inscricao.service';
import { Router } from '@angular/router';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { Inscricao } from '../model/inscricao.model';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';
import { ErrorService } from '../../../shared/error/error.service';

@Component({
  selector: 'app-confirmacao',
  imports: [MpcButtonComponent, MpcNavbarComponent, MpcModalComponent, MpcFooterComponent],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly errorService = inject(ErrorService);

  @ViewChild('modalSucesso', { static: true }) private modalSucesso!: MpcModalComponent;

  protected dadosInscricao = new Inscricao();

  ngOnInit(): void {
    const dados = this.inscricaoService.getDadosInscricao();

    this.dadosInscricao.inicializarDadosPessoais(dados);
    this.dadosInscricao.inicializarContato(dados);
    this.dadosInscricao.inicializarPagamento(dados);
  }

  protected formatarValor(valor: any): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  protected getSexo(): string {
    return this.dadosInscricao.sexo === 'M' ? 'Masculino' : 'Feminino';
  }

  protected inscrever(): void {
    this.inscricaoService.inscrever(this.dadosInscricao).subscribe({
      next: (response: Inscricao) => {
        this.inscricaoService.atualizarDadosInscricao(response, 5);
        this.abrirModalSucesso();
      },
      error: (error: any) => {
        this.errorService.construirErro(error)
      }
    });
  }

  protected voltar(): void {
    this.router.navigate([Rotas.PAGAMENTO]);
  }

  private abrirModalSucesso(): void {
    const modalSucesso: MpcModalConfig = {
      titulo: 'Inscrição realizada com sucesso',
      texto: 'Sua inscrição foi realizada com sucesso, você pode acessar o comprovante de inscrição clicando no botão abaixo.',
      tipoModal: TipoModal.SUCESSO,
      botao: () => { this.router.navigate([Rotas.COMPROVANTE]) },
      textoBotao: 'Abrir comprovante',
      segundoBotao: () => { this.modalSucesso?.fecharModal(); },
      textoSegundoBotao: 'Fechar',
    }

    this.modalSucesso?.abrirModal(modalSucesso);
  }
}
