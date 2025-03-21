import { MpcComprovanteConfig } from '../../../shared/components/mpc-comprovante/mpc-comprovante.directive';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { FluxoErro } from '../../../shared/fluxo-erro';
import { CommonModule } from '@angular/common';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcComprovanteComponent } from '../../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpcInputRadioComponent, RadioOption } from '../../../shared/components/mpc-input-radio/mpc-input-radio.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputDateComponent } from '../../../shared/components/mpc-input-date/mpc-input-date.component';
import { MpcInputSelectComponent } from '../../../shared/components/mpc-input-select/mpc-input-select.component';
import { MpcInputTextComponent } from '../../../shared/components/mpc-input-text/mpc-input-text.component';
import { InscricaoService } from '../inscricao.service';

@Component({
  selector: 'app-dados-pessoais',
  imports: [
      CommonModule, MpcModalComponent, FormsModule,
      ReactiveFormsModule, MpcInputTextComponent, MpcInputDateComponent,
      MpcInputRadioComponent, MpcButtonComponent, MpcInputSelectComponent,
      MpcNavbarComponent, MpcComprovanteComponent, MpcFormProgressBarComponent
    ],
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css'],
})
export default class DadosPessoaisComponent implements OnInit {

  @ViewChild('modalErro', { static: true }) modalErro!: MpcModalComponent;
  @ViewChild('modalSucesso', { static: true }) modalSucesso!: MpcModalComponent;
  @ViewChild('comprovante', { static: true }) comprovante!: MpcComprovanteComponent;
  dadosComprovante: MpcComprovanteConfig = {} as MpcComprovanteConfig;

  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  celulas = [];
  celulasDropdown: any = [];
  sexos: RadioOption[] = [
    { label: 'Masculino', value: 'M', checked: false },
    { label: 'Feminino', value: 'F', checked: false }
  ];
  dataAtual = new Date().toISOString().split('T')[0];

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    celula: new FormControl(''),
    dataNasc: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    estadoCivil: new FormControl('', Validators.required),
  });

  etapa: number = 1;
  qtdVagas = 30;
  inscricoesEncerradas = false;

  constructor(
    private fluxoErro: FluxoErro,
    private router: Router,
    private inscricaoService: InscricaoService
  ) { }

  ngOnInit(): void {
    this.listarInscricoes();
    this.listarCelulas();
  }

  getDadosTerceiraEtapa() {
    if (this.etapa === 3) {
      const dados = this.inscricaoService.getDadosInscricao();
      this.enviarInscricao(dados);
    }
  }

  listarCelulas() {
    this.inscricaoService.listarCelulas().subscribe({
      next: (response: any) => {
        this.celulas = response;
        this.filtrarCelulas();
      }
    });
  }

  filtrarCelulas() {
    let sexo = this.form.get('sexo')?.value;
    sexo = sexo === 'Masculino' ? 'Masculina' : 'Feminina';
    let aux = this.celulas.filter((celula: any) => { return celula.tipoCelula === sexo || celula.tipoCelula === 'Mista' });
    this.celulasDropdown = [];
    aux.forEach((celula: any) => {
      this.celulasDropdown.push(celula.nome);
    });
    this.celulasDropdown.unshift('Nenhuma');
    this.form.get('celula')?.setValue('Nenhuma');
  }

  proximaEtapa() {
    if (this.form.invalid) return;
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 2);
  }

  setValorCampo(event: any, campo: string): void {
    if (!event) {
      this.form.get(campo)?.setErrors({ error: true });
      return;
    }

    this.form.get(campo)?.setValue(event);

    console.log(this.form.get(campo)?.value);
  }

  listarInscricoes() {
    try {
      this.inscricaoService.listarInscricoes().subscribe({
        next: (response: any) => {
          this.inscricoesEncerradas = response.length >= this.qtdVagas;
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

  enviarInscricao(dados: any) {
    try {
      if (!dados) return;

      // TODO: colocar essas validações nas etapas
      const request = {
        nome: dados.nome.toString().trim() + ' ' + dados.sobrenome.toString().trim(),
        celula: dados.celula === "Nenhuma" ? undefined : dados.celula,
        endereco: dados.endereco,
        dataNasc: this.formatarData(dados.dataNasc),
        telefone: this.formatarTelefone(dados.telefone),
        estadoCivil: dados.estadoCivil,
        formaPagamento: dados.formaPagamento,
        valor: 160
      }

      let sexo = dados.sexo === 'Masculino' ? 'M' : 'F';

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
