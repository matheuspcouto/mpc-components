/**
 * @Pipe TelefoneMaskPipe
 * Este pipe é responsável por aplicar máscara de telefone no formato (00) 00000-0000.
 *
 * Formato: (00) 00000-0000
 *
 * Exemplo de utilização:
 * {{ '11987654321' | telefoneMask }}
 * {{ telefone | telefoneMask }}
 * this.telefoneMaskPipe.transform(telefone);
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneMask',
  standalone: true
})
export class TelefoneMaskPipe implements PipeTransform {

  /**
   * Aplica a máscara de telefone ao valor informado.
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

    return this.aplicarMascaraTelefone(valorLimpo);
  }

  /**
   * Aplica a máscara no formato (00) 00000-0000.
   */
  private aplicarMascaraTelefone(valor: string): string {
    // Limita a 11 dígitos para telefone brasileiro
    const telefone = valor.substring(0, 11);

    // Aplica a máscara progressivamente conforme o usuário digita
    if (telefone.length <= 2) {
      return `(${telefone}`;
    } else if (telefone.length <= 7) {
      return `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
    } else {
      return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
    }
  }
}
