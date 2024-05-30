import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simulator-slideshow',
  templateUrl: './simulator-slideshow.component.html',
  styleUrls: ['./simulator-slideshow.component.css']
})
export class SimulatorSlideshowComponent {
  @Input() month : string;
  @Input() monthsWith : Array<any>;
  @Input() monthsWithout : Array<any>;
  @Output() monthBox : EventEmitter<any>;
  
  constructor() {
    this.month = '';
    this.monthsWith = [];
    this.monthsWithout = [];
    this.monthBox = new EventEmitter<any>;
  }

}
