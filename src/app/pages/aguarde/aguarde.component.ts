import { AfterViewInit, Component, inject, InjectionToken } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';

const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});

@Component({
  selector: 'app-aguarde',
  imports: [ MpcNavbarComponent ],
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export default class AguardeComponent implements AfterViewInit {
  private window = inject(WINDOW);

  ngAfterViewInit(): void {
    this.window.scrollTo(0, 0);
  }

}
