
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { CommonModule } from '@angular/common';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { InscricaoService } from '../inscricao.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpcInputRadioComponent, RadioOption } from '../../../shared/components/mpc-input-radio/mpc-input-radio.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputDateComponent } from '../../../shared/components/mpc-input-date/mpc-input-date.component';
import { MpcInputSelectComponent } from '../../../shared/components/mpc-input-select/mpc-input-select.component';
import { MpcInputTextComponent } from '../../../shared/components/mpc-input-text/mpc-input-text.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';

@Component({
  selector: 'app-dados-pessoais',
  imports: [
    CommonModule, MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputDateComponent,
    MpcInputRadioComponent, MpcButtonComponent, MpcInputSelectComponent,
    MpcFormProgressBarComponent, MpcNavbarComponent
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
    private router: Router,
    private inscricaoService: InscricaoService
  ) { }

  ngOnInit(): void {
    this.atualizarForm();
    this.listarCelulas();
    this.dataAtual = this.formatarData(this.dataAtual);
  }

  atualizarForm() {
    try {
      const dadosInscricao = this.inscricaoService.getDadosInscricao();
      console.log(dadosInscricao.nome);

      if (dadosInscricao.nome) {
        this.form.reset();
        this.form.patchValue(dadosInscricao);
      }

      this.estadosCivis.unshift('Selecione');
      this.form.get('estadoCivil')?.setValue('Selecione');
    } catch (error) {
      this.abrirModalErro('Erro', 'Não foi possível carregar os dados da inscrição');
    }
  }

  listarCelulas() {
    this.inscricaoService.listarCelulas().subscribe({
      next: (response: any) => {
        this.celulas = response;
        if (this.celulas.length > 0) this.filtrarCelulas();
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
  }

  formatarData(data: string): string {
    const partes = data.split('-');
    if (partes.length === 3) {
      const ano = partes[0];
      const mes = partes[1];
      const dia = partes[2];
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  }

  abrirModalErro(titulo: string, texto: string) {
    const modalErro: MpcModalConfig = {
      titulo: titulo,
      texto: texto,
      tipoModal: TipoModal.ERRO,
      botao: () => this.modalErro?.fecharModal(),
      textoBotao: 'OK'
    }

    this.modalErro?.abrirModal(modalErro);
  }
}
