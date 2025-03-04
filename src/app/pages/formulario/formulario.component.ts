import { MpcComprovanteConfig } from './../../shared/components/mpc-comprovante/mpc-comprovante.directive';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../shared/enums/rotas-enum';
import { FluxoErro } from '../../shared/fluxo-erro';
import { CommonModule } from '@angular/common';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { PrimeiraEtapaComponent } from "./primeira-etapa/primeira-etapa.component";
import { SegundaEtapaComponent } from './segunda-etapa/segunda-etapa.component';
import { TerceiraEtapaComponent } from './terceira-etapa/terceira-etapa.component';
import { MpcComprovanteComponent } from '../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { InscricaoService } from '../../services/inscricao.service';

// TODO: Remover sessionStorage, trocar por Signals ?
// TODO: Otimizar fluxo e verificar campos form

@Component({
  selector: 'app-formulario',
  imports: [
    MpcNavbarComponent,
    CommonModule,
    MpcModalComponent,
    MpcComprovanteComponent,
    PrimeiraEtapaComponent,
    SegundaEtapaComponent,
    TerceiraEtapaComponent
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export default class FormularioComponent implements OnInit {

  @ViewChild('modalErro', { static: true }) modalErro!: MpcModalComponent;
  @ViewChild('modalSucesso', { static: true }) modalSucesso!: MpcModalComponent;
  @ViewChild('comprovante', { static: true }) comprovante!: MpcComprovanteComponent;
  dadosComprovante: MpcComprovanteConfig = {} as MpcComprovanteConfig;

  etapa: number = 1;
  dadosInscricao: any = {};
  qtdVagasHomens = 30;
  qtdVagasMulheres = 30;
  inscricoesHomensEncerradas = false;
  inscricoesMulheresEncerradas = false;

  constructor(
    private inscricaoService: InscricaoService,
    private fluxoErro: FluxoErro,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.listarInscricoesHomens();
    //this.listarInscricoesMulheres();
  }

  getDadosPrimeiraEtapa(dados: any) {
    if (dados.dados) this.dadosInscricao = { ...this.dadosInscricao, ...dados.dados };
    if (dados.proximaEtapa) this.etapa = dados.proximaEtapa;
    sessionStorage.setItem('dadosInscricao', JSON.stringify(this.dadosInscricao));
  }

  getDadosSegundaEtapa(dados: any) {
    if (dados.dados) this.dadosInscricao = { ...this.dadosInscricao, ...dados.dados };
    if (dados.proximaEtapa) this.etapa = dados.proximaEtapa;
    sessionStorage.setItem('dadosInscricao', JSON.stringify(this.dadosInscricao));
  }

  getDadosTerceiraEtapa(dados: any) {
    if (dados.dados) this.dadosInscricao = { ...this.dadosInscricao, ...dados.dados };
    if (dados.proximaEtapa) this.etapa = dados.proximaEtapa;
    sessionStorage.setItem('dadosInscricao', JSON.stringify(this.dadosInscricao));

    if (this.etapa === 3) {
      this.enviarInscricao();
    }
  }

  getIconeEtapa(etapa: number, passo: number) {
    let icon = `bi bi-${passo}-circle-fill`;
    if (etapa === passo) icon = 'bi bi-three-dots';
    if (etapa > passo) icon = 'bi bi-check-circle-fill completed';
    return icon;
  }

  listarInscricoesHomens() {
    try {
      this.inscricaoService.listarInscricoes('M').subscribe({
        next: (response: any) => {
          this.inscricoesHomensEncerradas = response.length >= this.qtdVagasHomens;
        },
        error: (e: HttpErrorResponse) => {
          if (e.status === 404) { return }
          let erro = this.fluxoErro.construirErro(e, Rotas.HOME);
          this.handleError(erro);
        },
      });
    } catch (error) {
      error = this.fluxoErro.construirErro(error, Rotas.HOME);
      this.handleError(error);
    };
  }

  listarInscricoesMulheres() {
    try {
      this.inscricaoService.listarInscricoes('F').subscribe({
        next: (response: any) => {
          this.inscricoesMulheresEncerradas = response.length >= this.qtdVagasMulheres;
        },
        error: (e: HttpErrorResponse) => {
          if (e.status === 404) { return }
          let erro = this.fluxoErro.construirErro(e, Rotas.HOME);
          this.handleError(erro);
        },
      });
    } catch (error) {
      error = this.fluxoErro.construirErro(error, Rotas.HOME);
      this.handleError(error);
    }
  }

  enviarInscricao() {
    try {
      if (!this.dadosInscricao) return;

      const request = {
        nome: this.dadosInscricao.nome.toString().trim() + ' ' + this.dadosInscricao.sobrenome.toString().trim(),
        celula: this.dadosInscricao.celula === "Nenhuma" ? undefined : this.dadosInscricao.celula,
        endereco: this.dadosInscricao.endereco,
        dataNasc: this.formatarData(this.dadosInscricao.dataNasc),
        telefone: this.formatarTelefone(this.dadosInscricao.telefone),
        estadoCivil: this.dadosInscricao.estadoCivil,
        remediosControlados: this.dadosInscricao.remediosControlados ? this.dadosInscricao.remediosControlados : undefined,
        alergias: this.dadosInscricao.alergias ? this.dadosInscricao.alergias : undefined,
        contatos: this.formatarContatos(),
        formaPagamento: this.dadosInscricao.formaPagamento,
        valor: 160
      }

      let sexo = this.dadosInscricao.sexo === 'Masculino' ? 'M' : 'F';

      this.inscricaoService.inscrever(request, sexo).subscribe({
        next: (response: any) => {

          sessionStorage.removeItem('dadosInscricao');

          const MODAL = {
            tipoModal: TipoModal.SUCESSO,
            titulo: 'Inscrição realizada com sucesso !',
            texto: 'Caso deseje ver o comprovante, clique abaixo.',
            textoBotao: 'Ver comprovante',
            botao: () => { this.modalSucesso.fecharModal(); this.abrirComprovante(response, sexo); },
            textoSegundoBotao: 'Voltar para Home',
            segundoBotao: () => { this.router.navigate([Rotas.HOME]); this.modalSucesso.fecharModal(); }
          }

          this.modalSucesso.abrirModal();
        },
        error: (e: HttpErrorResponse) => {
          const erro = this.fluxoErro.construirErro(e, Rotas.HOME);
          this.handleError(erro);
        },
      });
    } catch (error) {
      error = this.fluxoErro.construirErro(error, Rotas.HOME);
      this.handleError(error);
    }
  }

  formatarData(data: string): string {
    const partes = data.split('-');
    if (partes.length === 3) {
      const ano = partes[0];
      const mes = partes[1];
      const dia = partes[2];
      return `${dia}/${mes}/${ano}`;
    }
    return data;
  }

  formatarTelefone(telefone: string): string {
    // Remover caracteres não numéricos
    const numeroLimpo = telefone.replace(/\D/g, '');

    // Verificar se o número possui DDD
    if (numeroLimpo.length === 11) {
      // Formatar telefone com DDD
      return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeroLimpo.length === 10) {
      // Formatar telefone sem DDD
      return numeroLimpo.replace(/(\d{5})(\d{4})/, '$1-$2');
    } else {
      // Retornar a string original se não for um número válido
      return telefone;
    }
  }

  formatarContatos() {
    const contatos = [
      { nome: this.dadosInscricao.nomeContatoUm, parentesco: this.dadosInscricao.parentescoUm, telefone: this.dadosInscricao.telefoneContatoUm },
      { nome: this.dadosInscricao.nomeContatoDois, parentesco: this.dadosInscricao.parentescoDois, telefone: this.dadosInscricao.telefoneContatoDois },
      { nome: this.dadosInscricao.nomeContatoTres, parentesco: this.dadosInscricao.parentescoTres, telefone: this.dadosInscricao.telefoneContatoTres },
      { nome: this.dadosInscricao.nomeContatoQuatro, parentesco: this.dadosInscricao.parentescoQuatro, telefone: this.dadosInscricao.telefoneContatoQuatro }
    ];

    var contatosFormatados = `${contatos[0].nome} (${contatos[0].parentesco}) - ${this.formatarTelefone(contatos[0].telefone)}`;
    contatosFormatados += ` / ${contatos[1].nome} (${contatos[1].parentesco}) - ${this.formatarTelefone(contatos[1].telefone)}`;

    if (contatos[2].nome) {
      contatosFormatados += ` / ${contatos[2].nome} (${contatos[2].parentesco}) - ${this.formatarTelefone(contatos[2].telefone)}`;
    }
    if (contatos[3].nome) {
      contatosFormatados += ` / ${contatos[3].nome} (${contatos[3].parentesco}) - ${this.formatarTelefone(contatos[3].telefone)}`;
    }

    return contatosFormatados;
  }

  abrirComprovante(dados: any, sexo: string) {
    this.dadosComprovante = {
      titulo: 'Comprovante de inscrição',
      dados: {
        dadosInscricao: {
          codigoInscricao: dados.codigoInscricao,
          dataInscricao: dados.dataInscricao,
          status: dados.status
        },
        dadosPessoais: [
          { label: 'Nome', valor: dados.nome },
          { label: 'Sexo', valor: sexo === 'M' ? 'Masculino' : 'Feminino' },
          { label: 'Data de nascimento', valor: dados.dataNasc },
          { label: 'Celula', valor: dados.celula },
          { label: 'Endereço', valor: dados.endereco },
          { label: 'Telefone', valor: dados.telefone },
          { label: 'Estado civil', valor: dados.estadoCivil },
          { label: 'Remédios controlados', valor: dados.remediosControlados },
          { label: 'Alergias', valor: dados.alergias },
          { label: 'Contatos', valor: this.formatarContatos() }
        ],
        dadosPagamento: {
          formaPagamento: dados.formaPagamento,
          valor: dados.valor,
          dataPagamento: dados.dataPagamento,
          statusPagamento: dados.statusPagamento
        }
      }
    }

    this.comprovante?.abrirComprovante();
  }

  handleError(error: any) {
    const MODAL = {
      titulo: error.titulo,
      tipoModal: TipoModal.ERRO,
      texto: error.mensagem,
      textoBotao: 'OK',
      botao: () => { this.router.navigate([Rotas.HOME]); this.modalErro?.fecharModal() },
    }

    this.modalErro?.abrirModal();
  }
}
