/**
 * @Componente MpcPageHeaderHomeComponent
 *
 * Componente responsável por exibir o cabeçalho da página inicial com imagem de fundo escurecida.
 * Permite customizar a imagem de fundo via propriedade de entrada.
 *
 * @Propriedades
 * @property {string} [imagemFundo] Imagem de fundo da seção
 *
 * @Métodos
 * @method getBackgroundImage Retorna a imagem de fundo escurecida para o cabeçalho
 *
 * @Exemplo
 * <!-- ======= Page Header Home ======= -->
 * <mpc-page-header-home [imagemFundo]="'assets/img/home/logo.png'">
 *   <div content>
 *     <h2>Page Header</h2>
 *   </div>
 * </mpc-page-header-home>
 * <!-- ======= End Page Header Home ======= -->
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
import { Component, Input } from "@angular/core";

@Component({
  selector: 'mpc-page-header-home',
  templateUrl: './mpc-page-header-home.component.html',
  styleUrls: ['./mpc-page-header-home.component.scss']
})
export class MpcPageHeaderHomeComponent {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Imagem de fundo da seção */
  @Input() imagemFundo?: string;

  // ===== MÉTODOS PROTEGIDOS =====

  /**
  * Verifica e retorna a imagem de fundo escurecida.
  * @returns {string} imagem de fundo escurecida
  */
  protected getBackgroundImage(): string {
    return this.imagemFundo && this.imagemFundo.length > 0 ?
      `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${this.imagemFundo})` :
      "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/img/no-image.jpg)";
  }
} 