import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MpcFooterComponent } from './shared/components/mpc-footer/mpc-footer.component';
import { MpcLoaderComponent } from './shared/components/mpc-loader/mpc-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcFooterComponent, MpcLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-components';
}
