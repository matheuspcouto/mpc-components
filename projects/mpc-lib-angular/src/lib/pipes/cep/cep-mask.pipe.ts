/**
 * @Pipe CepMaskPipe
 * Este pipe é responsável por aplicar máscara de CEP.
 *
 * CEP: 00000-000
 *
 * @Exemplo de utilização:
 * {{ '12345678' | cepMaskPipe }}
 * {{ cep | cepMaskPipe }}
 * this.cepMaskPipe.transform(cep);
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMaskPipe',
  standalone: true
})
export class CepMaskPipe implements PipeTransform {

  /**
   * Aplica a máscara de CEP ao valor informado.
   * @param value - Valor a ser aplicado a máscara
   * @returns Valor com máscara
   */
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Remove todos os caracteres não numéricos
    const valorLimpo = value.toString().replace(/\D/g, '');

    if (valorLimpo.length === 0) {
      return '';
    }

    return this.aplicarMascaraCEP(valorLimpo);
  }

  /**
   * Aplica a máscara no formato 00000-000.
   * @param valor - Valor a ser aplicado a máscara
   * @returns Valor com máscara
   */
  private aplicarMascaraCEP(valor: string): string {
    // Limita a 8 dígitos para CEP
    const cep = valor.substring(0, 8);

    // Aplica a máscara progressivamente conforme o usuário digita
    if (cep.length <= 5) {
      return cep;
    } else {
      return `${cep.substring(0, 5)}-${cep.substring(5)}`;
    }
  }
}
