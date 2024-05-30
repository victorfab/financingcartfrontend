import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-switch',
  templateUrl: './summary-switch.component.html',
  styleUrls: ['./summary-switch.component.css']
})
export class SummarySwitchComponent implements OnInit {
  @Output() switchBtn : EventEmitter<any>;
  @Input() inputSwitchChild : boolean;
  status : string;

  constructor() {
    this.switchBtn = new EventEmitter<any>();
    this.inputSwitchChild = true;
    this.status = '';
  }

  ngOnInit(): void {
    const rules = `
    @media (min-width: 320px) {
      .sn-slide-button.sn-slide-button-disabled>div>div {
        background-color: #d9d9d9 !important;
      }
      .sn-slide-button .sn-slide-button-bar {
          width: 100% !important;
          background-color: #f2f2f2 !important;
          height: 56px !important;
          color: #999;
      }
      .sn-slide-button .sn-slide-button-bar:after {
          line-height: 3.4 !important;
          display: initial !important;
      }
      .sn-slide-button .slide-radius {
        top: 4px;
        left: 5px;
        box-shadow: none !important;
        background-color: #ec0000;
      }
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(rules));
    document.head.appendChild(style);
  }
}
