/**
 * @Componente MpcLoaderComponent
 * 
 * Este componente é responsável por exibir um loader na tela, controlado via serviço
 * para gerenciar estados de carregamento de forma reativa.
 * 
 * @Propriedades
 * Não possui @Input() - O componente é controlado via MpcLoaderService
 * 
 * @Exemplo
 * ```html
 * <!-- Loader Básico -->
 * <mpc-loader id="loader-exemplo" />
 * 
 * <!-- Controle via Serviço -->
 * // No componente pai
 * private readonly loaderService = inject(MpcLoaderService);
 * 
 * // Exibir loader
 * this.loaderService.show();
 * 
 * // Ocultar loader
 * this.loaderService.hide();
 * ```
 * 
 * @Serviços
 * MpcLoaderService: Serviço responsável pelo controle do loader
 * - show(): void - Exibe o loader
 * - hide(): void - Oculta o loader
 * - isVisible(): boolean - Verifica se o loader está visível
 * 
 * @Variáveis CSS
 * --mpc-bg-loader: Cor de fundo do loader (padrão: white)
 * --mpc-color-loader: Cor do loader (padrão: var(--mpc-color-primary))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, inject } from '@angular/core';
import { MpcLoaderService } from './mpc-loader.service';

@Component({
  selector: 'mpc-loader',
  templateUrl: './mpc-loader.component.html',
  styleUrls: ['./mpc-loader.component.scss']
})
export class MpcLoaderComponent {

  // ===== PROPRIEDADES PRIVADAS =====
  /** Serviço injetado para controle do loader */
  protected readonly loaderService = inject(MpcLoaderService);
}
