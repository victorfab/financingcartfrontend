import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {
  @Input() lastLocation : string = '';
  @Input() titleName : string = '';
  @Output() redirect = new EventEmitter;
}
