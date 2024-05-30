import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import {select, Store} from "@ngrx/store";
import * as fromPayments from "../../../ngrx/selectors/payments.selector";

@Component({
  selector: 'app-simulator-result',
  templateUrl: './simulator-result.component.html',
  styleUrls: ['./simulator-result.component.css']
})
export class SimulatorResultComponent implements OnInit {
  @Input() paymentCountChild : number;
  @Input() paymentTotalMonthChild : number;
  @Input() paymentTotalRateChild : number;
  @Input() paymentAnualRateChild : string;
  @Input() paymentMonthRateChild : string;
  @Input() getTypeChild : string;
  @Output() clickConfirm : EventEmitter<any>;

  constructor(
    private _gtm: GoogleTagManagerService,
    private _store: Store<any>
  ) {
    this.paymentCountChild = 0;
    this.paymentTotalMonthChild = 0.0;
    this.paymentTotalRateChild = 0.0;
    this.paymentAnualRateChild = '';
    this.paymentMonthRateChild = '';
    this.getTypeChild = '';
    this.clickConfirm = new EventEmitter();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  tagAndContinue(continuar : any) {
    continuar.emit();
    let purchase: any;
    this._store.pipe(select(fromPayments.getProcessPaymentConfirm)).subscribe(data => {
      data.forEach(row => {
        row.forEach((data : any) => {
          if (data.offer) {
            purchase = data;
          }
        });
      });
    });
    this._gtm.pushTag({
      event: 'interaccion',
      categoria: 'financing',
      accion: 'mensualidades',
      etiqueta: 'continuar',
      canalBanco: 'Supermovil',
      buc_id: sessionStorage.getItem('buc'),
      plan: purchase.month
    });
  }

}
