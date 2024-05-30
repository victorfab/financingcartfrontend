import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-differ',
  templateUrl: './summary-differ.component.html',
  styleUrls: ['./summary-differ.component.css']
})
export class SummaryDifferComponent {
  @Input() title : string | undefined;
  @Input() data : Array<any>;

  constructor() {
    this.title = '';
    this.data = [];
  }
}
