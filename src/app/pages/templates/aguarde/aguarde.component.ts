/**
 * @Componente AguardeComponent
 *
 * Este componente exibe uma tela de aguarde/carregamento para o usuário, geralmente utilizada durante operações assíncronas.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-aguarde></app-aguarde>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-aguarde',
  imports: [],
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export default class AguardeComponent { }
