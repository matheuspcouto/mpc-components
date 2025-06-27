import { SelectOption } from '../../../shared/components/Inputs/mpc-input-select/mpc-input-select.component';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { InscricaoService } from '../service/inscricao.service';
import { Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcInputRadioComponent, RadioOption } from '../../../shared/components/Inputs/mpc-input-radio/mpc-input-radio.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputDateComponent } from '../../../shared/components/Inputs/mpc-input-date/mpc-input-date.component';
import { MpcInputSelectComponent } from '../../../shared/components/Inputs/mpc-input-select/mpc-input-select.component';
import { MpcInputTextComponent } from '../../../shared/components/Inputs/mpc-input-text/mpc-input-text.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';
import { ToastrService } from 'ngx-toastr';
import { MpcInputNumberComponent } from '../../../shared/components/Inputs/mpc-input-number/mpc-input-number.component';
import { MpcInputCpfcnpjComponent } from "../../../shared/components/Inputs/mpc-input-cpfcnpj/mpc-input-cpfcnpj.component";
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';
import { MpcInputTextAreaComponent } from "../../../shared/components/Inputs/mpc-input-text-area/mpc-input-text-area.component";

@Component({
  selector: 'app-dados-pessoais',
  imports: [MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputDateComponent,
    MpcInputRadioComponent, MpcButtonComponent, MpcInputSelectComponent,
    MpcFormProgressBarComponent, MpcNavbarComponent, MpcInputNumberComponent,
    MpcInputCpfcnpjComponent, MpcFooterComponent, MpcInputTextAreaComponent],
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css'],
})
export default class DadosPessoaisComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly notificationService = inject(ToastrService);

  @ViewChild('modalErro', { static: true }) protected modalErro!: MpcModalComponent;
  protected dataAtual: string = new Date().toISOString().split('T')[0];

  protected estadosCivis: SelectOption[] = [
    { label: 'Solteiro(a)', value: 'Solteiro(a)', selected: false },
    { label: 'Casado(a)', value: 'Casado(a)', selected: false },
    { label: 'Divorciado(a)', value: 'Divorciado(a)', selected: false },
    { label: 'Viúvo(a)', value: 'Viúvo(a)', selected: false },
    { label: 'Separado(a)', value: 'Separado(a)', selected: false }
  ];

  protected sexos: RadioOption[] = [
    { label: 'Masculino', value: 'M', checked: false },
    { label: 'Feminino', value: 'F', checked: false }
  ];

  protected form = this.formBuilder.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    dataNasc: ['', Validators.required],
    sexo: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    idade: [0, Validators.min(1)],
    cpfCnpj: ['', Validators.required],
    descricao: ['']
  });

  ngOnInit(): void {
    this.atualizarForm();
    this.dataAtual = this.formatarData(this.dataAtual);
  }

  private atualizarForm(): void {
    try {
      const dadosInscricao = this.inscricaoService.getDadosInscricao();

      if (this.inscricaoService.isDadosPessoaisCompletos()) {
        this.form.reset();

        this.form.patchValue({
          nome: dadosInscricao.nome,
          sobrenome: dadosInscricao.sobrenome,
          dataNasc: dadosInscricao.dataNasc,
          idade: dadosInscricao.idade,
          cpfCnpj: dadosInscricao.cpfCnpj,
          descricao: dadosInscricao.descricao
        });

        if (dadosInscricao.sexo) {
          this.sexos.forEach(sexo => {
            if (sexo.value === dadosInscricao.sexo) {
              sexo.checked = true;
              this.form.patchValue({ sexo: sexo.value });
            }
          });
        }

        if (dadosInscricao.estadoCivil) {
          this.estadosCivis.forEach(estadoCivil => {
            if (estadoCivil.value === dadosInscricao.estadoCivil) {
              estadoCivil.selected = true;
              this.form.patchValue({ estadoCivil: estadoCivil.value });
            }
          });
        }
      }
    } catch (error) {
      this.abrirModalErro('Erro', 'Não foi possível carregar os dados da inscrição');
    }
  }

  protected proximaEtapa(): void {
    if (this.form.invalid) {
      this.notificationService.error('Preencha todos os campos obrigatórios corretamente!');
    } else {
      this.inscricaoService.atualizarDadosInscricao(this.form.value, 2);
      this.router.navigate([Rotas.CONTATO]);
    }
  }

  private formatarData(data: string): string {
    const partes = data.split('-');
    if (partes.length === 3) {
      const ano = partes[0];
      const mes = partes[1];
      const dia = partes[2];
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  }

  private abrirModalErro(titulo: string, texto: string): void {
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
