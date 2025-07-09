/**
 * @Pipe CpfCnpjMaskPipe
 * Este pipe é responsável por aplicar máscara de CPF ou CNPJ baseado no tamanho do valor.
 *
 * CPF: 000.000.000-00
 * CNPJ: 00.000.000/0000-00
 *
 * Exemplo de utilização:
 * {{ '12345678901' | cpfCnpjMask }}
 * {{ documento | cpfCnpjMask }}
 * this.cpfCnpjMaskPipe.transform(documento);
 *
 * @author Matheus Pimentel Do Couto
 * @created 26/06/2025
 * @updated 26/06/2025
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpjMask',
  standalone: true
})
export class CpfCnpjMaskPipe implements PipeTransform {

  /**
   * Aplica a máscara de CPF ou CNPJ ao valor informado.
   */
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Remove todos os caracteres não numéricos
    const valorLimpo = value.toString().replace(/\D/g, '');

    // Determina se é CPF ou CNPJ baseado no tamanho
    if (valorLimpo.length <= 11) {
      return this.aplicarMascaraCPF(valorLimpo);
    } else {
      return this.aplicarMascaraCNPJ(valorLimpo);
    }
  }

  /**
   * Aplica a máscara de CPF no formato 000.000.000-00.
   */
  private aplicarMascaraCPF(valor: string): string {
    // Limita a 11 dígitos para CPF
    const cpf = valor.substring(0, 11);

    // Aplica a máscara progressivamente conforme o usuário digita
    if (cpf.length <= 3) {
      return cpf;
    } else if (cpf.length <= 6) {
      return `${cpf.substring(0, 3)}.${cpf.substring(3)}`;
    } else if (cpf.length <= 9) {
      return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6)}`;
    } else {
      return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;
    }
  }

  /**
   * Aplica a máscara de CNPJ no formato 00.000.000/0000-00.
   */
  private aplicarMascaraCNPJ(valor: string): string {
    // Limita a 14 dígitos para CNPJ
    const cnpj = valor.substring(0, 14);

    // Aplica a máscara progressivamente conforme o usuário digita
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
  }
}
