/**
 * @Pipe EmailMaskPipe
 * Este pipe é responsável por aplicar máscara de email para melhorar a visualização.
 *
 * Aplica formatação visual básica mantendo a estrutura do email
 * Exemplo: usuario@dominio.com
 *
 * @Exemplo de utilização:
 * {{ 'usuario@exemplo.com' | emailMaskPipe }}
 * {{ email | emailMaskPipe }}
 * this.emailMaskPipe.transform(email);
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailMaskPipe',
  standalone: true
})
export class EmailMaskPipe implements PipeTransform {

  /**
   * Aplica a máscara de e-mail ao valor informado.
   * @param value - Valor a ser aplicado a máscara
   * @returns Valor com máscara
   */
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Remove espaços em color-white no início e fim
    const emailLimpo = value.toString().trim();

    // Converte para minúsculas para padronização
    const emailFormatado = emailLimpo.toLowerCase();

    // Remove caracteres inválidos comuns (mantém apenas caracteres válidos para email)
    const emailValidado = emailFormatado.replace(/[^a-z0-9@._+-]/g, '');

    return this.aplicarFormatacaoEmail(emailValidado);
  }

  /**
   * Aplica formatação visual básica ao e-mail.
   * @param email - Email a ser formatado
   * @returns Email formatado
   */
  private aplicarFormatacaoEmail(email: string): string {
    // Se não contém @, retorna como está sendo digitado
    if (!email.includes('@')) {
      return email;
    }

    // Separa a parte local do domínio
    const partes = email.split('@');

    // Se há mais de um @, mantém apenas os dois primeiros
    if (partes.length > 2) {
      return `${partes[0]}@${partes.slice(1).join('')}`;
    }

    const parteLocal = partes[0] || '';
    const dominio = partes[1] || '';

    // Limita o tamanho da parte local (máximo 64 caracteres)
    const parteLocalLimitada = parteLocal.substring(0, 64);

    // Limita o tamanho do domínio (máximo 253 caracteres)
    const dominioLimitado = dominio.substring(0, 253);

    // Remove pontos consecutivos
    const parteLocalFormatada = parteLocalLimitada.replace(/\.{2,}/g, '.');
    const dominioFormatado = dominioLimitado.replace(/\.{2,}/g, '.');

    // Remove ponto no início e fim da parte local
    const parteLocalFinal = parteLocalFormatada.replace(/^\.+|\.+$/g, '');

    // Remove ponto no início e fim do domínio
    const dominioFinal = dominioFormatado.replace(/^\.+|\.+$/g, '');

    // Reconstrói o email
    if (!dominioFinal) {
      return parteLocalFinal ? `${parteLocalFinal}@` : '';
    }

    return `${parteLocalFinal}@${dominioFinal}`;
  }
}
