import { AfterViewInit, Component, inject, InjectionToken } from '@angular/core';

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
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export default class AguardeComponent implements AfterViewInit {
  window = inject(WINDOW);

  ngAfterViewInit(): void {
    this.window.scrollTo(0, 0);
  }

}
