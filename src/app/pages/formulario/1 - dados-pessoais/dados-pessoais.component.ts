
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { FluxoErro } from '../../../shared/fluxo-erro';
import { CommonModule } from '@angular/common';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { InscricaoService } from '../inscricao.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpcInputRadioComponent, RadioOption } from '../../../shared/components/mpc-input-radio/mpc-input-radio.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputDateComponent } from '../../../shared/components/mpc-input-date/mpc-input-date.component';
import { MpcInputSelectComponent } from '../../../shared/components/mpc-input-select/mpc-input-select.component';
import { MpcInputTextComponent } from '../../../shared/components/mpc-input-text/mpc-input-text.component';
import { InscricoesEncerradasComponent } from "../inscricoes-encerradas/inscricoes-encerradas.component";
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';

@Component({
  selector: 'app-dados-pessoais',
  imports: [
    CommonModule, MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputDateComponent,
    MpcInputRadioComponent, MpcButtonComponent, MpcInputSelectComponent,
    MpcFormProgressBarComponent, MpcNavbarComponent, InscricoesEncerradasComponent
],
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css'],
})
export default class DadosPessoaisComponent implements OnInit {

  @ViewChild('modalErro', { static: true }) modalErro!: MpcModalComponent;

  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];

  celulas = [];
  celulasDropdown: any = [];

  sexos: RadioOption[] = [
    { label: 'Masculino', value: 'M', checked: false },
    { label: 'Feminino', value: 'F', checked: false }
  ];

  qtdVagas = 30;
  inscricoesEncerradas = false;
  dataAtual = new Date().toISOString().split('T')[0];

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    celula: new FormControl(''),
    dataNasc: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    estadoCivil: new FormControl('', Validators.required),
  });

  constructor(
    private fluxoErro: FluxoErro,
    private router: Router,
    private inscricaoService: InscricaoService
  ) { }

  ngOnInit(): void {
    this.listarInscricoes();
    this.listarCelulas();
    this.dataAtual = this.formatarData(this.dataAtual);
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
    sexo = sexo === 'M' ? 'Masculina' : 'Feminina';

    this.celulas.forEach((celula: any) => {
      if (celula.tipoCelula === sexo || celula.tipoCelula === 'Mista') {
        this.celulasDropdown.push(celula.nome);
      }
    });

    this.celulasDropdown.unshift('Nenhuma');
    this.form.get('celula')?.setValue('Nenhuma');
  }

  proximaEtapa() {
    if (this.form.invalid) return;
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 2);
    this.router.navigate([Rotas.CONTATO]);
  }

  setValorCampo(event: any, campo: string): void {
    if (!event) {
      this.form.get(campo)?.setErrors({ error: true });
      return;
    }

    this.form.get(campo)?.setValue(event);

    console.log(this.form.get(campo)?.value);
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
