import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setConfirmPayment } from 'src/app/ngrx/actions/payment.action';
import * as fromPayments from 'src/app/ngrx/selectors/payments.selector';
import { DifferService } from 'src/app/services/differ.service';
import { TermsService } from 'src/app/services/terms.service';
import { setDifferedPayment, setPaymentToDiffer, setProcessPayment } from 'src/app/ngrx/actions/payment.action';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  currentLastLocation : string;
  currentTitleName : string;
  differ : Array<any>;
  flagModal : boolean;
  flagModalParent : boolean;
  inputTerm : boolean;
  inputSwitch : boolean;
  terms : string;
  currentData;
  mError : boolean;

  constructor(private store : Store<any>, 
              private differService : DifferService,
              private termsService : TermsService,
              private router : Router
              ) {
    this.currentLastLocation = '/products/simulator';
    this.currentTitleName = 'Confirmacion';
    this.differ = [];
    this.flagModal = false;
    this.inputTerm = false;
    this.inputSwitch = true;
    this.flagModalParent = true;
    this.terms = '';
    this.mError = true;
    this.currentData = {
      month : '0',
      paymentTotalMonth : 0.0,
      paymentTotalRate : 0.0,
      paymentAnualRate : 0.0,
      paymentTotalAmount : 0.0
    };
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.termsService.getTermsAndConditions().subscribe(data => {
      if (data) this.terms = data.description;
    });

    this.store.pipe(select(fromPayments.getProcessConfirm)).subscribe((data : any) => {
      this.differ = [
        { title: 'Monto total de compra', value: `${data.paymentTotalAmount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN` },
        { title: 'Tasa de interés anual', value: `${data.paymentAnualRate}%` },
        { title: 'Total a pagar', value: `${data.paymentTotalRate.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN` },
        { title: 'Plazo a diferir', value: `${data.month} meses` },
        { title: 'Pago mensual', value: `${data.paymentTotalMonth.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN` }
      ];
      this.currentData = {
        month : data.month,
        paymentTotalMonth : data.paymentTotalMonth,
        paymentTotalRate : data.paymentTotalRate,
        paymentAnualRate : data.paymentAnualRate,
        paymentTotalAmount : data.paymentTotalAmount
      };
    });
  }

  confirmDiffer() : void {
    if (this.inputTerm) {
      console.log("OK!");
      this.inputSwitch = false;
      setTimeout(() => {
        //window.scrollTo(0, 0);
        //this.mError = false;
        let counterOffers = 0;
        let counterRequests = 0;
        let date = new Date();
        let months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        this.store.dispatch(setConfirmPayment({ paymentConfirm : {
          month : this.currentData.month,
          paymentTotalMonth : `${this.currentData.paymentTotalMonth.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN`,
          paymentTotalRate : `${this.currentData.paymentTotalRate.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN`,
          paymentAnualRate : this.currentData.paymentAnualRate,
          paymentTotalAmount : this.currentData.paymentTotalAmount,
          invoice : Math.floor(Math.random() * 1000000000),
          datetime : `${(date.getDate() < 10) ? '0' + date.getDate() : date.getDate()}/${months[date.getMonth()]}/${date.getFullYear().toString().slice(2)} - ${(date.getHours() < 10) ? '0' + date.getHours() : date.getHours()}:${(date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()}:${(date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()} h`
        }}));
        /*this.store.pipe(select(fromPayments.getProcessPayment)).subscribe(data => {
          data.forEach(row => {
            row.forEach((data : any) => {
              if (data.offer) {
                counterOffers++;
              }
            });
          });

          data.forEach(row => {
            row.forEach((data : any) => {
              if (data.offer) {
                let id = data.id.toString();
                let offerIdTest = data.offerIdTest.toString();
                this.differService.performDiffer(id, offerIdTest).subscribe({
                  next : (result : any) => { 
                    counterRequests++;
                    console.log(result);  
                    //console.log(counterOffers, counterRequests);
                    if (counterOffers === counterRequests) {
                      this.router.navigate(['/products/ticket']);
                    }
                  },
                  error : err => this.mError = err
                });
              }
            });
            
          });
        });*/
        this.router.navigate(['/products/ticket']);
      }, 1500);
    }
  }

  acceptedTerms() : void {
    this.flagModalParent = false;
    this.inputTerm = true;
    this.inputSwitch = false;
  }

  acceptedTermsModal(flagModal : boolean) : void {
    this.flagModal = flagModal;
    this.flagModalParent = flagModal;
    this.inputTerm = true;
    this.inputSwitch = false;
  }

  showModal(flagModal : boolean) {
    window.scrollTo(0, 0);
    this.flagModal = flagModal;
  }

  closeModal(flagModal : boolean) {
    this.flagModal = flagModal;
  }
}
