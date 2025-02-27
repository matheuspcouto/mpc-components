import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { enderecoValidator, InscricaoValidator, telefoneValidator } from '../formulario.validator';
import { InscricaoService } from '../../../services/inscricao.service';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';

@Component({
  selector: 'primeira-etapa',
  imports: [CommonModule, MpcModalComponent, NgxMaskDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './primeira-etapa.component.html',
  styleUrl: './primeira-etapa.component.css'
})
export class PrimeiraEtapaComponent {
  mascaraTelefone = '(00) 00000-0000';
  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  celulas = [];
  celulasDropdown: any = [];
  dataAtual;

  @Output() dados = new EventEmitter<any>();
  @Input() inscricoesHomensEncerradas = false;
  @Input() inscricoesMulheresEncerradas = false;

  @ViewChild('modalErro', { static: true }) modalErro: MpcModalComponent | undefined;
  formBuild = inject(FormBuilder);

  formGroup: FormGroup = this.formBuild.group({
    nome: [undefined, Validators.required],
    sobrenome: [undefined, Validators.required],
    celula: [undefined],
    endereco: [undefined, enderecoValidator],
    dataNasc: [undefined, Validators.required],
    sexo: [undefined, Validators.required],
    telefone: [undefined, telefoneValidator],
    estadoCivil: [undefined, Validators.required],
    remediosControlados: [undefined],
    alergias: [undefined]
  }, {
    validators: [(formGroup: FormGroup) => {
      const appValidator = new InscricaoValidator();
      const telefone = formGroup.get('telefone');
      const dataNasc = formGroup.get('dataNasc');
      const estadosCivis = formGroup.get('estadoCivil');

      if (telefone?.value && !appValidator.isValidTelefone(telefone.value)) {
        telefone.setErrors({ formatoInvalido: true });
      }

      if (dataNasc?.value && !appValidator.isValidDataNascimento(dataNasc.value)) {
        dataNasc.setErrors({ formatoInvalido: true });
      }

      if (estadosCivis?.touched && estadosCivis?.value === 'Selecione') {
        estadosCivis.setErrors({ required: true });
      }
    }]
  });

  constructor(
    private router: Router,
    private inscricaoService: InscricaoService,
  ) {
    this.dataAtual = this.formatarData(new Date());
    this.listarCelulas();

    if (typeof window !== 'undefined') {
      let dadosInscricao: any = sessionStorage.getItem('dadosInscricao');

      if (dadosInscricao) {
        dadosInscricao = JSON.parse(dadosInscricao);
        this.formGroup.reset();
        this.formGroup.patchValue(dadosInscricao);
        this.filtrarCelulas();
        this.formGroup.get('celula')?.setValue(dadosInscricao.celula);
      }
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

  formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  filtrarCelulas() {
    let sexo = this.formGroup.get('sexo')?.value;
    sexo = sexo === 'Masculino' ? 'Masculina' : 'Feminina';
    let aux = this.celulas.filter((celula: any) => { return celula.tipoCelula === sexo || celula.tipoCelula === 'Mista' });
    this.celulasDropdown = [];
    aux.forEach((celula: any) => {
      this.celulasDropdown.push(celula.nome);
    });
    this.celulasDropdown.unshift('Nenhuma');
    this.formGroup.get('celula')?.setValue('Nenhuma');
  }

  proximaEtapa() {
    const dados = {
      dados: this.formGroup.value,
      proximaEtapa: 2
    }

    this.dados.emit(dados);
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
