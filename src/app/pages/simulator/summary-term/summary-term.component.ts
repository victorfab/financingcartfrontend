import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-summary-term',
  templateUrl: './summary-term.component.html',
  styleUrls: ['./summary-term.component.css']
})
export class SummaryTermComponent implements OnInit {
  @Output() modal : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickTerms : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() inputTermChild : boolean;

  constructor() {
    this.inputTermChild = false;
  }

  ngOnInit(): void {
    const rules = `
      .fl-radio-button {
        font-weight: 700 !important;
      }
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(rules));
    document.head.appendChild(style);
  }
}
