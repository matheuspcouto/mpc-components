/**
 * @Componente MpcPaginationComponent
 * Este componente é responsável por exibir uma barra de navegação de páginas.
 *
 * totalItens: {number} Número total de itens a serem paginados.
 * itensPorPagina: {number} Número de itens a serem visualizados por página.
 * mostrarSeletorItensPorPagina: {boolean} Indica se deve mostrar o seletor de itens por página.
 *
 * Exemplo de utilização:
 * <mpc-pagination id="mpc-pagination" tabindex="0" ariaLabel="mpc-pagination" [totalItens]="itensTeste.length" (indices)="definirIndiceLista($event)"></mpc-pagination>
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 24/06/2025
 */

import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges } from '@angular/core';

export interface IndicesPaginacao {
  indiceInicial: number;
  indiceFinal: number;
}

@Component({
  selector: 'mpc-pagination',
  imports: [],
  templateUrl: './mpc-pagination.component.html',
  styleUrl: './mpc-pagination.component.css'
})
export class MpcPaginationComponent implements OnInit, AfterViewInit, OnChanges {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string = 'Navegação de páginas';

  // Configurações de paginação
  @Input() totalItens: number = 0;
  @Input() mostrarSeletorItensPorPagina: boolean = true;
  itensPorPagina: number = 10;
  paginaAtual: number = 1;
  maxPaginasVisiveis: number = 5;
  opcoesSeletorItensPorPagina: number[] = [10, 25, 50, 100];

  @Output() indices: EventEmitter<IndicesPaginacao> = new EventEmitter();

  // Propriedades calculadas
  protected totalPaginas: number = 0;
  protected paginasVisiveis: number[] = [];
  protected mostrarPrimeirasReticencias: boolean = false;
  protected mostrarUltimasReticencias: boolean = false;

  // Variáveis para exibir quantos itens estão sendo mostrados
  protected primeiroItem: number = 0;
  protected ultimoItem: number = 0;

  ngOnInit(): void {
    this.calcularPaginacao();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.emitirIndices();
    });
  }

  ngOnChanges(): void {
    this.calcularPaginacao();
    this.emitirIndices();
  }

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

  private calcularItensVisiveis(): void {
    this.primeiroItem = this.totalItens === 0 ? 0 : (this.paginaAtual - 1) * this.itensPorPagina + 1;
    this.ultimoItem = Math.min(this.paginaAtual * this.itensPorPagina, this.totalItens);
  }

  private emitirIndices(): void {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    const indiceFinal = Math.min(this.paginaAtual * this.itensPorPagina, this.totalItens);

    this.indices.emit({
      indiceInicial,
      indiceFinal
    });
  }

  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas && pagina !== this.paginaAtual) {
      this.paginaAtual = pagina;
      this.calcularPaginacao();
      this.emitirIndices();
    }
  }

  irParaPrimeiraPagina(): void {
    this.irParaPagina(1);
  }

  irParaUltimaPagina(): void {
    this.irParaPagina(this.totalPaginas);
  }

  irParaPaginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.irParaPagina(this.paginaAtual - 1);
    }
  }

  irParaProximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.irParaPagina(this.paginaAtual + 1);
    }
  }

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

  // Métodos auxiliares para o template
  get temPaginaAnterior(): boolean {
    return this.paginaAtual > 1;
  }

  get temProximaPagina(): boolean {
    return this.paginaAtual < this.totalPaginas;
  }

  get ehPrimeiraPagina(): boolean {
    return this.paginaAtual === 1;
  }

  get ehUltimaPagina(): boolean {
    return this.paginaAtual === this.totalPaginas;
  }
}
