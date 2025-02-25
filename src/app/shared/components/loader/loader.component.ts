import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader',
  imports: [ CommonModule ],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  constructor(public loaderService: LoaderService) { }

}
