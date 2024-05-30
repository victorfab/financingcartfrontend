import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simulator-cart',
  templateUrl: './simulator-cart.component.html',
  styleUrls: ['./simulator-cart.component.css']
})
export class SimulatorCartComponent {
  @Input() selectedPaymentsChild : Array<any>;
  @Input() mDetailsChild : boolean;
  @Input() paymentCountChild : number;
  @Output() deletePayment : EventEmitter<any>;
  @Output() moreDetails : EventEmitter<any>;
  @Output() radioClick : EventEmitter<any> = new EventEmitter<any>;

  constructor() {
    this.selectedPaymentsChild = [];
    this.mDetailsChild = false;
    this.paymentCountChild = 0;
    this.deletePayment = new EventEmitter<any>;
    this.moreDetails = new EventEmitter<any>;
    this.radioClick = new EventEmitter<any>;
  }
}
