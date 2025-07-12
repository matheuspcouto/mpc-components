/**
 * @Componente DadosPessoaisComponent
 *
 * Este componente é responsável por exibir e gerenciar o formulário de dados pessoais do usuário,
 * incluindo campos como nome, sobrenome, data de nascimento, sexo, estado civil, CPF/CNPJ e descrição.
 *
 * @Propriedades
 * @protected dataAtual {string} - Data atual para validação de data de nascimento
 * @protected estadosCivis {SelectOption[]} - Opções de estado civil
 * @protected sexos {RadioOption[]} - Opções de sexo
 * @protected form {FormGroup} - Formulário reativo de dados pessoais
 *
 * @Exemplo
 * ```html
 * <app-dados-pessoais></app-dados-pessoais>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { InscricaoService } from '../service/inscricao.service';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcInputDateComponent, MpcInputRadioComponent, RadioOption, MpcInputSelectComponent, SelectOption, MpcInputTextComponent, MpcInputNumberComponent, MpcInputCpfcnpjComponent, MpcInputTextAreaComponent, MpcFormProgressBarComponent, MpcLoaderService, MpcButtonComponent } from 'mpc-lib-angular';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { MpcSectionComponent } from "../../../shared/components/mpc-section/mpc-section.component";

@Component({
  selector: 'app-dados-pessoais',
  imports: [FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputDateComponent,
    MpcInputRadioComponent, MpcInputSelectComponent,
    MpcFormProgressBarComponent, MpcInputNumberComponent,
    MpcInputCpfcnpjComponent, MpcInputTextAreaComponent, MpcButtonComponent, MpcSectionComponent],
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css'],
})
export default class DadosPessoaisComponent implements OnInit {

  // Injeções
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly errorService = inject(MpcErrorService);
  private readonly loaderService = inject(MpcLoaderService);

  /**
   * Data atual para validação de data de nascimento.
   */
  protected dataAtual: string = new Date().toISOString().split('T')[0];

  /**
   * Opções de estado civil para o select.
   */
  protected estadosCivis: SelectOption[] = [
    { label: 'Solteiro(a)', value: 'Solteiro(a)', selected: false },
    { label: 'Casado(a)', value: 'Casado(a)', selected: false },
    { label: 'Divorciado(a)', value: 'Divorciado(a)', selected: false },
    { label: 'Viúvo(a)', value: 'Viúvo(a)', selected: false },
    { label: 'Separado(a)', value: 'Separado(a)', selected: false }
  ];

  /**
   * Opções de sexo para o radio.
   */
  protected sexos: RadioOption[] = [
    { label: 'Masculino', value: 'M', checked: false },
    { label: 'Feminino', value: 'F', checked: false }
  ];

  /**
   * Formulário reativo de dados pessoais.
   */
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
   * @param data Data a ser formatada
   * @returns {string} Data formatada
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
