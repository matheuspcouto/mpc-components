import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({ providedIn: 'root' })
export class MpcComprovanteService {

  action$ = new Subject<boolean>();
  lastFocusElement: Element | null = null;

  hide() {
    this.action$.next(false);
  }

  show() {
    this.lastFocusElement = document.activeElement;
    this.action$.next(true);
    if (this.lastFocusElement) {
      (this.lastFocusElement as any).focus();
    }
  }
}
