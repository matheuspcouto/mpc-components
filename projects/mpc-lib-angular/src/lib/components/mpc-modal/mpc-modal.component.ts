/**
 * @Componente MpcModalComponent
 * 
 * Este componente é responsável por exibir modais personalizados com diferentes tipos
 * de configuração, suportando títulos, textos, imagens e botões customizáveis.
 * 
 * @Propriedades
 * @Input() id {string} - ID do campo (obrigatório)
 * @Input() tabIndex {number} - Índice do campo (opcional)
 * @Input() ariaLabel {string} - Label do campo (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Modal de Confirmação -->
 * <mpc-modal #modalExemplo id="modal-exemplo"></mpc-modal>
 * 
 * <!-- Abrir Modal -->
 * this.modalExemplo.abrirModal();
 * 
 * @Interfaces
 * MpcModalConfig: Interface para configuração do modal
 * - titulo: string - Título do modal
 * - texto: string - Texto do modal
 * - textoBotao: string - Texto do botão principal
 * - imagem?: string - URL da imagem (opcional)
 * - tipoModal?: any - Tipo do modal (CONFIRMACAO, ALERTA, ERRO, SUCESSO)
 * - botao?: () => void - Função do botão principal (opcional)
 * - textoSegundoBotao?: string - Texto do segundo botão (opcional)
 * - segundoBotao?: () => void - Função do segundo botão (opcional)
 * 
 * @Enums
 * TamanhoModal: Enum para tamanhos do modal
 * - TELA_INTEIRA: Modal em tela inteira
 * - METADE_TELA: Modal em metade da tela
 * 
 * @Constantes
 * TipoModal: Objeto com configurações dos tipos de modal
 * - CONFIRMACAO: Modal de confirmação (metade da tela)
 * - ALERTA: Modal de alerta (tela inteira, imagem de atenção)
 * - ERRO: Modal de erro (tela inteira, imagem de erro)
 * - SUCESSO: Modal de sucesso (tela inteira, imagem de sucesso)
 * 
 * @Variáveis CSS
 * --mpc-color-bg-modal: Cor de fundo do modal (padrão: white)
 * --mpc-color-title-modal: Cor do título do modal (padrão: var(--mpc-color-primary))
 * --mpc-color-description-modal: Cor da descrição do modal (padrão: var(--mpc-color-tertiary))
 * --mpc-color-first-button-bg-modal: Cor de fundo do primeiro botão (padrão: var(--mpc-color-primary))
 * --mpc-color-first-button-text-modal: Cor do texto do primeiro botão (padrão: white)
 * --mpc-color-second-button-bg-modal: Cor de fundo do segundo botão (padrão: var(--mpc-color-secondary))
 * --mpc-color-second-button-text-modal: Cor do texto do segundo botão (padrão: white)
 * --mpc-color-copy-button-bg-modal: Cor de fundo do botão de copiar (padrão: transparent)
 * --mpc-color-copy-button-text-modal: Cor do texto do botão de copiar (padrão: var(--mpc-color-primary))
 * --mpc-font-title-modal: Fonte do título do modal (padrão: var(--mpc-font-subtitle))
 * --mpc-font-description-modal: Fonte da descrição do modal (padrão: var(--mpc-font-default))
 * --mpc-font-button-modal: Fonte dos botões do modal (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component } from '@angular/core';
import { MpcButtonDirective } from '../../directives/mpc-button/mpc-button.directive';
import { AccessibilityInputs } from '../../../shared/accessibility-inputs';

export interface MpcModalConfig {
  /** Título do modal */
  titulo: string;
  /** Texto do modal */
  texto: string;
  /** Texto do botão principal */
  textoBotao: string;
  /** URL da imagem (opcional) */
  imagem?: string;
  /** Tipo do modal (CONFIRMACAO, ALERTA, ERRO, SUCESSO) */
  tipoModal?: any;
  /** Função do botão principal (opcional) */
  botao?: () => void;
  /** Texto do segundo botão (opcional) */
  textoSegundoBotao?: string;
  /** Função do segundo botão (opcional) */
  segundoBotao?: () => void;
}

enum TamanhoModal {
  /** Modal em tela inteira */
  TELA_INTEIRA = 'tela-inteira',
  /** Modal em metade da tela */
  METADE_TELA = 'metade-tela'
}

export const TipoModal = {
  /** Modal de confirmação (metade da tela) */
  CONFIRMACAO: { tamanho: TamanhoModal.METADE_TELA },
  /** Modal de alerta (tela inteira, imagem de atenção) */
  ALERTA: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'assets/img/modal/atencao.png' },
  /** Modal de erro (tela inteira, imagem de erro) */
  ERRO: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'assets/img/modal/error.png' },
  /** Modal de sucesso (tela inteira, imagem de sucesso) */
  SUCESSO: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'assets/img/modal/success.png' }
}

@Component({
  selector: 'mpc-modal',
  imports: [MpcButtonDirective],
  templateUrl: './mpc-modal.component.html',
  styleUrls: ['./mpc-modal.component.css']
})
export class MpcModalComponent extends AccessibilityInputs {

  // ===== PROPRIEDADES PRIVADAS =====
  /** Controla a exibição do modal */
  protected exibirModal: boolean = false;
  /** Função do botão principal */
  protected botao: () => void = () => { };
  /** Função do segundo botão */
  protected segundoBotao: () => void = () => { };
  /** Controla a exibição do botão de copiar mensagem de erro */
  protected btnCopiarMensagemErro: any;
  /** Controla o estado de copiado */
  protected isCopiado: boolean = false;
  /** Verifica se o modal é em tela inteira */
  protected isTelaInteira: boolean = false;
  /** Configuração atual do modal */
  protected modal!: MpcModalConfig;

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Fecha o modal e reseta os estados internos.
   */
  fecharModal() {
    this.exibirModal = false;
    this.isCopiado = false;
  }

  /**
   * Abre o modal com a configuração informada.
   * @param modalConfig Configuração do modal
   */
  abrirModal(modalConfig: MpcModalConfig) {
    this.modal = modalConfig;

    this.isTelaInteira = this.modal.tipoModal.tamanho === TamanhoModal.TELA_INTEIRA;

    if (!this.modal.imagem && this.modal.tipoModal.imagem) {
      this.modal.imagem = this.modal.tipoModal.imagem;
    }

    this.botao = this.modal.botao || this.fecharModal;
    this.btnCopiarMensagemErro = this.modal.tipoModal === TipoModal.ERRO;

    if (this.modal.textoSegundoBotao && this.modal.segundoBotao) {
      this.segundoBotao = this.modal.segundoBotao;
    }

    this.exibirModal = true;
  };

  /**
   * Copia o texto do modal para a área de transferência e exibe notificação.
   */
  copiarCodigo() {
    navigator.clipboard.writeText(this.modal.texto);
    this.isCopiado = true;
    setTimeout(() => { this.isCopiado = false; }, 3000);
  }
}
