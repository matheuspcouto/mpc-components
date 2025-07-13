/**
 * @Componente MpcPaginationComponent
 * 
 * Este componente é responsável por exibir uma paginação completa com navegação,
 * seletor de itens por página e informações de paginação de forma responsiva.
 * 
 * @Propriedades
 * @Input() id {string} - ID do campo (obrigatório)
 * @Input() tabIndex {number} - Índice do campo (opcional)
 * @Input() ariaLabel {string} - Label do campo (opcional)
 * @Input() totalItens {number} - Total de itens (obrigatório)
 * @Input() mostrarSeletorItensPorPagina {boolean} - Se deve mostrar o seletor de itens por página (opcional, padrão: true)
 * @Input() opcoesSeletorItensPorPagina {number[]} - Opções de quantidades a serem mostradas no seletor de Itens po Página
 * 
 * @Eventos
 * @Output() indices {EventEmitter<IndicesPaginacao>} - Emite os índices dos itens visíveis
 * 
 * @Exemplo
 * ```html
 * <!-- Paginação Básica -->
 * <mpc-pagination
 *   [totalItens]="100"
 *   [mostrarSeletorItensPorPagina]="true"
 *   (indices)="onIndicesChange($event)"
 *   id="paginacao-exemplo"
 *   [tabIndex]="0"
 *   ariaLabel="Paginação dos resultados" />
 * ```
 * 
 * @Variáveis CSS
 * --mpc-color-navbuttons: Cor dos botões de navegação (padrão: var(--mpc-color-primary))
 * --mpc-color-text-active: Cor do texto ativo (padrão: var(--mpc-color-primary))
 * --mpc-color-border-active: Cor da borda ativa (padrão: var(--mpc-color-primary))
 * --mpc-color-text-disabled: Cor do texto desabilitado (padrão: var(--mpc-color-tertiary))
 * --mpc-font-pagination: Fonte da paginação (padrão: var(--mpc-font-subtitle))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { AccessibilityInputs } from '../../../shared/accessibility-inputs';

export interface IndicesPaginacao {
  /** Índice do primeiro item visível */
  indiceInicial: number;
  /** Índice do último item visível */
  indiceFinal: number;
}

@Component({
  selector: 'mpc-pagination',
  imports: [],
  templateUrl: './mpc-pagination.component.html',
  styleUrl: './mpc-pagination.component.css'
})
export class MpcPaginationComponent extends AccessibilityInputs implements OnInit, AfterViewInit, OnChanges {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Número total de itens a serem paginados */
  @Input() totalItens: number = 0;
  /** Indica se deve mostrar o seletor de itens por página */
  @Input() mostrarSeletorItensPorPagina: boolean = true;
  /** Número de itens por página */
  itensPorPagina: number = 5;
  /** Página atual */
  paginaAtual: number = 1;
  /** Número máximo de páginas visíveis na paginação */
  maxPaginasVisiveis: number = 5;
  /** Opções disponíveis no seletor de itens por página */
  @Input() opcoesSeletorItensPorPagina: number[] = [5, 12, 24, 50, 100];

  /** Evento emitido com os índices dos itens visíveis */
  @Output() indices: EventEmitter<IndicesPaginacao> = new EventEmitter();

  // ===== PROPRIEDADES PROTEGIDAS =====
  /** Total de páginas calculado */
  protected totalPaginas: number = 0;
  /** Array de páginas visíveis na paginação */
  protected paginasVisiveis: number[] = [];
  /** Controla exibição das reticências no início */
  protected mostrarPrimeirasReticencias: boolean = false;
  /** Controla exibição das reticências no final */
  protected mostrarUltimasReticencias: boolean = false;
  /** Primeiro item visível na página atual */
  protected primeiroItem: number = 0;
  /** Último item visível na página atual */
  protected ultimoItem: number = 0;

  // ===== MÉTODOS DO CICLO DE VIDA =====

  /**
   * Inicializa o componente calculando a paginação.
   */
  ngOnInit(): void {
    this.calcularPaginacao();
  }

  /**
   * Emite os índices após a inicialização da view.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.emitirIndices();
    });
  }

  /**
   * Recalcula a paginação quando as propriedades mudam.
   */
  ngOnChanges(): void {
    this.calcularPaginacao();
    this.emitirIndices();
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Calcula o total de páginas e atualiza as páginas visíveis e itens visíveis.
   */
  private calcularPaginacao(): void {
    this.totalPaginas = Math.ceil(this.totalItens / this.itensPorPagina);

    // Garantir que a página atual está dentro dos limites
    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = this.totalPaginas || 1;
    }
    if (this.paginaAtual < 1) {
      this.paginaAtual = 1;
    }

    this.calcularPaginasVisiveis();
    this.calcularItensVisiveis();
  }

  /**
   * Calcula as páginas visíveis na paginação e define se as reticências devem ser exibidas.
   */
  private calcularPaginasVisiveis(): void {
    const metade = Math.floor(this.maxPaginasVisiveis / 2);
    let inicio = Math.max(1, this.paginaAtual - metade);
    let fim = Math.min(this.totalPaginas, inicio + this.maxPaginasVisiveis - 1);

    // Ajustar o início se não temos páginas suficientes no final
    if (fim - inicio + 1 < this.maxPaginasVisiveis) {
      inicio = Math.max(1, fim - this.maxPaginasVisiveis + 1);
    }

    this.paginasVisiveis = [];
    for (let i = inicio; i <= fim; i++) {
      this.paginasVisiveis.push(i);
    }

    // Determinar se devemos mostrar as reticências
    this.mostrarPrimeirasReticencias = inicio > 2;
    this.mostrarUltimasReticencias = fim < this.totalPaginas - 1;
  }

  /**
   * Calcula o primeiro e o último item visível na página atual.
   */
  private calcularItensVisiveis(): void {
    this.primeiroItem = this.totalItens === 0 ? 0 : (this.paginaAtual - 1) * this.itensPorPagina + 1;
    this.ultimoItem = Math.min(this.paginaAtual * this.itensPorPagina, this.totalItens);
  }

  /**
   * Emite os índices do primeiro e último item visível.
   */
  private emitirIndices(): void {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    const indiceFinal = Math.min(this.paginaAtual * this.itensPorPagina, this.totalItens);

    this.indices.emit({
      indiceInicial,
      indiceFinal
    });
  }

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Navega para a página informada.
   * @param pagina Página de destino
   */
  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas && pagina !== this.paginaAtual) {
      this.paginaAtual = pagina;
      this.calcularPaginacao();
      this.emitirIndices();
    }
  }

  /**
   * Navega para a primeira página.
   */
  irParaPrimeiraPagina(): void {
    this.irParaPagina(1);
  }

  /**
   * Navega para a última página.
   */
  irParaUltimaPagina(): void {
    this.irParaPagina(this.totalPaginas);
  }

  /**
   * Navega para a página anterior.
   */
  irParaPaginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.irParaPagina(this.paginaAtual - 1);
    }
  }

  /**
   * Navega para a próxima página.
   */
  irParaProximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.irParaPagina(this.paginaAtual + 1);
    }
  }

  /**
   * Atualiza o número de itens por página ao selecionar uma nova opção.
   * @param event Evento de alteração do seletor
   */
  aoMudarItensPorPagina(event: any): void {
    const target = event.target as HTMLSelectElement;
    const novosItensPorPagina = parseInt(target.value, 10);

    if (novosItensPorPagina !== this.itensPorPagina) {
      this.itensPorPagina = novosItensPorPagina;
      this.paginaAtual = 1; // Resetar para a primeira página
      this.calcularPaginacao();
      this.emitirIndices();
    }
  }

  // ===== GETTERS =====

  /**
   * Indica se existe página anterior.
   * @returns {boolean} true se existe página anterior
   */
  get temPaginaAnterior(): boolean {
    return this.paginaAtual > 1;
  }

  /**
   * Indica se existe próxima página.
   * @returns {boolean} true se existe próxima página
   */
  get temProximaPagina(): boolean {
    return this.paginaAtual < this.totalPaginas;
  }

  /**
   * Indica se a página atual é a primeira.
   * @returns {boolean} true se for a primeira página
   */
  get ehPrimeiraPagina(): boolean {
    return this.paginaAtual === 1;
  }

  /**
   * Indica se a página atual é a última.
   * @returns {boolean} true se for a última página
   */
  get ehUltimaPagina(): boolean {
    return this.paginaAtual === this.totalPaginas;
  }
}
