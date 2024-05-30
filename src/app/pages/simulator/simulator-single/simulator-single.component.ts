import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simulator-single',
  templateUrl: './simulator-single.component.html',
  styleUrls: ['./simulator-single.component.css']
})
export class SimulatorSingleComponent {
  @Input() selectedPaymentsChild : Array<any>;
  @Input() month : string;
  @Input() monthsWith : Array<any>;
  @Input() monthsWithout : Array<any>;
  @Output() monthBox : EventEmitter<any>;
  @Input() paymentCountChild : number;
  @Input() paymentTotalMonthChild : number;
  @Input() paymentTotalRateChild : number;
  @Input() paymentAnualRateChild : string;
  @Output() clickConfirm : EventEmitter<any>;
  @Input() getTypeChild : string;

  constructor() {
    window.scroll(0, 0);
    this.selectedPaymentsChild = [];
    this.month = '';
    this.monthsWith = [];
    this.monthsWithout = [];
    this.monthBox = new EventEmitter<any>;
    this.paymentCountChild = 0;
    this.paymentTotalMonthChild = 0.0;
    this.paymentTotalRateChild = 0.0;
    this.paymentAnualRateChild = '';
    this.clickConfirm = new EventEmitter();
    this.getTypeChild = '';
  }
}
