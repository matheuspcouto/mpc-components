/**
 * @Componente DadosPessoaisComponent
 * Este componente é responsável por exibir e gerenciar o formulário de dados pessoais.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 07/07/2025
 */
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { InscricaoService } from '../service/inscricao.service';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ErrorService } from '../../../shared/error/error.service';
import { MpcInputDateComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-date/mpc-input-date.component';
import { MpcInputRadioComponent, RadioOption } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-radio/mpc-input-radio.component';
import { MpcButtonDirective } from '../../../../../projects/mpc-lib-angular/src/lib/directives/mpc-button/mpc-button.directive';
import { MpcInputSelectComponent, SelectOption } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-select/mpc-input-select.component';
import { MpcInputTextComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-text/mpc-input-text.component';
import { MpcInputNumberComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-number/mpc-input-number.component';
import { MpcInputCpfcnpjComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-cpfcnpj/mpc-input-cpfcnpj.component';
import { MpcInputTextAreaComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-text-area/mpc-input-text-area.component';
import { MpcFormProgressBarComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { MpcLoaderService } from '../../../../../projects/mpc-lib-angular/src/lib/components/mpc-loader/mpc-loader.service';

@Component({
  selector: 'app-dados-pessoais',
  imports: [FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputDateComponent,
    MpcInputRadioComponent, MpcButtonDirective, MpcInputSelectComponent,
    MpcFormProgressBarComponent, MpcInputNumberComponent,
    MpcInputCpfcnpjComponent, MpcInputTextAreaComponent],
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css'],
})
export default class DadosPessoaisComponent implements OnInit {

  // Injeções
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly errorService = inject(ErrorService);
  private readonly loaderService = inject(MpcLoaderService);

  // Variáveis
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
    nome: [''],
    sobrenome: [''],
    dataNasc: [''],
    sexo: [''],
    estadoCivil: [''],
    idade: [0],
    cpfCnpj: [''],
    descricao: ['']
  });

  /**
   * Inicializa o formulário e atualiza os dados se já existirem.
   */
  ngOnInit(): void {
    this.atualizarForm();
  }

  /**
   * Atualiza o formulário com os dados salvos, se existirem.
   */
  private atualizarForm(): void {
    try {
      this.loaderService.show();
      const dadosInscricao = this.inscricaoService.getDadosInscricao();

      if (this.inscricaoService.isDadosPessoaisCompletos()) {
        this.form.reset();

        this.form.patchValue({
          nome: dadosInscricao.nome,
          sobrenome: dadosInscricao.sobrenome,
          dataNasc: dadosInscricao.dataNasc,
          idade: dadosInscricao.idade,
          cpfCnpj: dadosInscricao.cpfCnpj,
          descricao: dadosInscricao.descricao,
        });

        if (dadosInscricao.sexo) {
          this.sexos.forEach(sexo => {
            if (sexo.value === dadosInscricao.sexo) {
              sexo.checked = true;
              this.form.controls.sexo.setValue(sexo.value);
            }
          });
        }
        if (dadosInscricao.estadoCivil) {
          this.estadosCivis.forEach(estadoCivil => {
            if (estadoCivil.value === dadosInscricao.estadoCivil) {
              estadoCivil.selected = true;
              this.form.controls.estadoCivil.setValue(estadoCivil.value);
            }
          });
        }

        this.dataAtual = this.formatarData(this.dataAtual);
      }
    } catch (error) {
      this.errorService.construirErro(error);
    } finally {
      this.loaderService.hide();
    }
  }

  /**
   * Avança para a próxima etapa do formulário, validando os campos.
   */
  protected proximaEtapa(): void {
    try {
      this.inscricaoService.atualizarDadosInscricao({ novosDados: this.form.value, proximaEtapa: 2 });
      this.router.navigate([Rotas.CONTATO]);
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

  /**
   * Formata a data para o padrão yyyy-mm-dd.
   */
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
}
