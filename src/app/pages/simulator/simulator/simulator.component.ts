import {AfterViewChecked, AfterViewInit, Component, NgZone, OnInit} from "@angular/core";
import { Location } from "@angular/common";
import { select, Store } from '@ngrx/store';
import { setPaymentGeneralCounter, setProcessPayment, setProcessPaymentConfirm, setProcessPaymentGroup } from 'src/app/ngrx/actions/payment.action';
import * as fromPayments from 'src/app/ngrx/selectors/payments.selector';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit, AfterViewChecked, AfterViewInit {
  currentLastLocation : string;
  currentTitleName : string;
  selectedPayments : Array<any>;
  simulatorMonthsWithout : Array<any>;
  simulatorMonthsWith : Array<any>;
  simulatorMonth : string;
  paymentCount : number;
  paymentTotalMonth : number;
  paymentTotalAmount : number;
  paymentTotalRate : number;
  paymentAnualRate : string;
  paymentMonthRate : string;
  all : Array<any>;
  allView : Array<any>;
  getType : string;
  getScrollLeft : number;
  modalFlag : boolean;
  topMonth : string;
  mDetails : boolean;

  constructor(
    private store : Store<any>,
    private _gtm: GoogleTagManagerService,
    private _device: DeviceDetectorService,
    private _ngZone: NgZone,
    private _location: Location
    ) {
    (window as any).backButton = (resp: any) => {
      console.log('backButtonAndroid: ', resp);
      this._ngZone.run(() => {
        // Validamos si la modal de confirmacion esta abierta
        if(this.modalFlag){
          this.modalFlag = false;
        } else {
          // Si no regresamos al home
          this._location.back();
        }
      });
    };
    this.currentLastLocation = '/';
    this.currentTitleName = 'Difiere tus compras';
    this.selectedPayments = [];
    this.simulatorMonthsWithout = [];
    this.simulatorMonthsWith = [];
    this.simulatorMonth = '';
    this.paymentCount = 0;
    this.paymentTotalMonth = 0.0;
    this.paymentTotalAmount = 0.0;
    this.paymentTotalRate = 0.0;
    this.paymentAnualRate = '';
    this.paymentMonthRate = '';
    this.all = [];
    this.allView = [];
    this.getType = '';
    this.getScrollLeft = 0;
    this.modalFlag = false;
    this.topMonth = '';
    this.mDetails = false;
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getScrollLeft = 297;
    this.store.pipe(select(fromPayments.getProcessPayment)).subscribe(offer => {
      if (offer.length > 0) {
        this.all = offer;
        //console.clear();
        //console.log(offer);
        let checkType = '';
        let getIds : number[] = [];
        this.selectedPayments = [];
        offer.forEach(row => {
          row.forEach((data : any) => {
            if (data.month === "24" && data.type === 'MCI') {
              getIds = getIds.concat(data.id);
              checkType = data.type;
              this.getType = data.type;
              this.selectedPayments = this.selectedPayments.concat({...data});
            }
          })
        });
        //console.log(getIds);
        //console.log(this.selectedPayments);
        offer.forEach(row => {
          row.forEach((data : any) => {
            if (getIds.includes(data.id)) {
              if (data.type === 'MSI' && checkType === 'MSI') {
                this.simulatorMonthsWithout = this.simulatorMonthsWithout.concat([data.month]);
              }
              if (data.type === 'MCI' && checkType === 'MCI') {
                this.simulatorMonthsWith = this.simulatorMonthsWith.concat([data.month]);
              }
            }
          })
        });

        if (this.simulatorMonthsWithout.length > 0) {
          this.simulatorMonthsWithout = this.simulatorMonthsWithout.filter((ele, i) => {
            return this.simulatorMonthsWithout.indexOf(ele) === i;
          }).sort((a, b) => a - b);
        }

        if (this.simulatorMonthsWith.length > 0) {
          this.simulatorMonthsWith = this.simulatorMonthsWith.filter((ele, i) => {
            return this.simulatorMonthsWith.indexOf(ele) === i;
          }).sort((a, b) => a - b);
        }

        if (this.simulatorMonth.length > 0) {
          this.selectedPayments = this.selectedPayments.map(row => {
            return {...row, month: this.simulatorMonth}
          });
        }

        if (this.selectedPayments.length > 0) {
          //this.paymentCount = this.selectedPayments.length;
          this.simulatorMonth = (this.simulatorMonth.length > 0) ? this.simulatorMonth : '';
          if (this.simulatorMonth.length === 0) {
            this.simulatorMonth = (this.selectedPayments[0].month) ? this.selectedPayments[0].month : '';
          }
          //console.log(this.simulatorMonth);

          for (let row of this.selectedPayments) {
            //console.log(row);
            if (row.offer) {
              this.paymentCount += 1;
              this.paymentTotalMonth += (row.total / parseInt(this.simulatorMonth));
              this.paymentTotalRate += row.total;
              this.paymentAnualRate = ((parseFloat(row.rate)  * 12) * 100).toFixed(2);
              this.paymentMonthRate = ((parseFloat(row.rate)  * 1) * 100).toFixed(2);
              this.paymentTotalAmount += row.amount;
            } /*else {
              this.paymentTotalMonth += (row.amount / parseInt(this.simulatorMonth));
              this.paymentTotalRate += row.amount;
              this.paymentTotalAmount += row.amount;
            }*/
          }
        }
        if (this.paymentAnualRate.length === 0) this.paymentAnualRate = '0.0';
        if (this.topMonth.length === 0) this.topMonth = this.simulatorMonth;
        //console.log(this.paymentAnualRate);
        //console.log(this.selectedPayments);
      }
    });
    this.updatePaymentsChoice([this.topMonth, 0]);
  }

  clickDeletePayment(event : Event) {
    this.getScrollLeft = document.querySelector('.wrapper-slideshow-slider')!.scrollLeft;
    this.store.pipe(select(fromPayments.getProcessPayment)).subscribe(array => {
      if (array.length > 0) {
        this.all = array.map(row => row.map((data: any) => {
          if (data.id === event) {
            return {...data, offer: false};
          } else {
            return data;
          }
        }));

        this.selectedPayments = [];
        this.simulatorMonth = (this.simulatorMonth.length > 0) ? this.simulatorMonth : '';
        this.paymentCount = 0;
        this.paymentTotalMonth = 0.0;
        this.paymentTotalAmount = 0.0;
        this.paymentTotalRate = 0.0;
        this.paymentAnualRate = '';
        this.all.forEach(row => {
          row.forEach((data : any) => {
            if (data.offer) {
              this.selectedPayments = this.selectedPayments.concat({...data});
            }
          })
        });

        if (this.simulatorMonth.length > 0) {
          this.selectedPayments = this.selectedPayments.map(row => {
            return {...row, month: this.simulatorMonth}
          });
        }

        if (this.selectedPayments.length > 0) {
          this.paymentCount = this.selectedPayments.length;
          if (this.simulatorMonth.length === 0) {
            this.simulatorMonth = (this.selectedPayments[0].month) ? this.selectedPayments[0].month : '';
          }

          for (let row of this.selectedPayments) {
            if (row.type === 'MCI') {
              this.paymentTotalMonth += (row.total / parseInt(this.simulatorMonth));
              this.paymentTotalRate += row.total;
              this.paymentAnualRate = ((parseFloat(row.rate)  * 12) * 100).toFixed(1);
              this.paymentTotalAmount += row.amount;
            } else {
              this.paymentTotalMonth += (row.amount / parseInt(this.simulatorMonth));
              this.paymentTotalRate += row.amount;
              this.paymentTotalAmount += row.amount;
            }
          }
          if (this.paymentAnualRate.length === 0) this.paymentAnualRate = '0.0';
        } else {
          this.simulatorMonth = '';
          this.paymentCount = 0;
          this.paymentTotalMonth = 0.0;
          this.paymentTotalRate = 0.0;
          this.paymentAnualRate = '';
        }
      }
    });
    //console.log(this.all);
    this.store.dispatch(setProcessPayment({ paymentCart : this.all }));
    this.store.pipe(select(fromPayments.getProcessPaymentGroup)).subscribe(array => {
      if (array.length > 0) {
        this.allView = array.map(row => row.map((data: any) => {
          if (data.id === event) {
            return {...data, offer: false};
          } else {
            return data;
          }
        }));
      }
    });
    this.store.dispatch(setProcessPaymentGroup({ paymentGroup : this.allView }));
    this.store.dispatch(setPaymentGeneralCounter({ paymentGeneralCounter : this.selectedPayments.length }));
  }

  monthSwitch(event : any) {
    //console.log(event);
    let all : any[] = [];
    this.getScrollLeft = document.querySelector('.wrapper-slideshow-slider')!.scrollLeft;
    //document.querySelector('.wrapper-slideshow-slider').scrollLeft
    this.store.pipe(select(fromPayments.getProcessPayment)).subscribe(array => {
      if (array.length > 0) {
        all = array;
        let collectIds : number[] = [];
        this.all = array.map(row => row.map((data: any) => {
          if (data.offer) {
            collectIds = collectIds.concat(data.id);
            return {...data, offer: false};
          } else {
            return data;
          }
        }));
        //console.log(collectIds);
        this.all = this.all.map(row => row.map((data: any) => {
        /*if (event[1] > 0) {
            if (data.month === event[0] && data.id === event[1] && data.type === this.getType) {
              return {...data, offer: true};
            } else {
              return data;
            }
          } else {*/
            if (data.month === event[0] && collectIds.includes(data.id) && data.type === this.getType) {
              return {...data, offer: true};
            } else {
              return data;
            }
          //}
        }));
        //console.log(this.all);
        //let getOfferIds : any = [];
        this.selectedPayments = [];
        this.simulatorMonth = '';
        this.paymentCount = 0;
        this.paymentTotalMonth = 0.0;
        this.paymentTotalAmount = 0.0;
        this.paymentTotalRate = 0.0;
        this.paymentAnualRate = '';
        this.paymentMonthRate = '';
        /*this.selectedPayments = this.selectedPayments.map(row => {
          return {...row, month: event}
        });*/
        this.all.forEach(row => {
          row.forEach((data : any) => {
            if (data.month === event[0]) {
              this.selectedPayments = this.selectedPayments.concat({...data});
            }
          })
        });
        //console.log(this.selectedPayments);
        //this.selectedPayments.forEach(row => getOfferIds = getOfferIds.concat(row.offerIdTest));
        if (this.selectedPayments.length > 0) {
          //this.paymentCount = this.selectedPayments.length;
          this.simulatorMonth = event[0];

          for (let row of this.selectedPayments) {
            if (row.offer) {
              this.paymentCount += 1;
              this.paymentTotalMonth += (row.total / parseInt(row.month));
              this.paymentTotalRate += row.total;
              this.paymentAnualRate = ((parseFloat(row.rate)  * 12) * 100).toFixed(2);
              this.paymentMonthRate = ((parseFloat(row.rate)  * 1) * 100).toFixed(2);
              this.paymentTotalAmount += row.amount;
            } /*else {
              this.paymentTotalMonth += (row.amount / parseInt(row.month));
              this.paymentTotalRate += row.amount;
              this.paymentTotalAmount += row.amount;
            }*/
          }
          if (this.paymentAnualRate.length === 0) this.paymentAnualRate = '0.0';
          /*this.all = this.all.map(row => row.map((data: any) => {
            if (getOfferIds.includes(data.offerIdTest)) {
              return {...data, month: event};
            } else {
              return data;
            }
          }));*/
        } /*else {
          this.simulatorMonth = '';
          this.paymentCount = 0;
          this.paymentTotalMonth = 0.0;
          this.paymentTotalAmount = 0.0;
          this.paymentTotalRate = 0.0;
          this.paymentAnualRate = '';
        }*/
      }
    });
    //console.log(this.all);
    //console.log(all);
    this.store.dispatch(setProcessPayment({ paymentCart : all }));
    this.store.dispatch(setProcessPaymentConfirm({ paymentCartConfirm : this.all }));
  }

  ngAfterViewChecked(): void {
    if (document.querySelector('.wrapper-slideshow-slider')?.hasChildNodes()) {
      document.querySelector('.wrapper-slideshow-slider')!.scrollLeft = this.getScrollLeft;
    }
  }

  performConfirm() : void {
    /*this.store.dispatch(setConfirmPayment({ paymentConfirm : {
      month : this.simulatorMonth,
      paymentTotalMonth : this.paymentTotalMonth,
      paymentTotalRate : this.paymentTotalRate,
      paymentAnualRate : this.paymentAnualRate,
      paymentTotalAmount : this.paymentTotalAmount
    } }));*/
    this.modalFlag = true;
  }

  closeModal(flagModal : boolean) {
    this.modalFlag = flagModal;
  }

  clickMoreDetails() : void {
    this.getScrollLeft = document.querySelector('.wrapper-slideshow-slider')!.scrollLeft;
    this.mDetails = !this.mDetails;
  }

  updatePaymentsChoice(event : Array<any>) : void{
    let all : any[] = [];
    this.store.pipe(select(fromPayments.getProcessPayment)).subscribe(array => {
      //console.log(array);
      if (array.length > 0) {
        all = array.map(row => row.map((data: any) => {
          if (data.id === event[0] && data.month === '24') {
            return { ...data, offer: !event[1] }
          } else {
            return data;
          }
        }));
        //console.log(all);

        let collectIdsAndOffers : any[] = [];
        this.all = all.map(row => row.map((data: any) => {
          if (data.month === '24') {
            collectIdsAndOffers = collectIdsAndOffers.concat({
              id: data.id,
              offer: data.offer
            })
          }
          return {...data, offer: false};
        }));
        //console.log(collectIdsAndOffers);
        this.all = this.all.map(row => row.map((data: any) => {
            let getId = collectIdsAndOffers.filter(obj => obj.id === data.id);
            //console.log(getId);
            if (data.month === this.simulatorMonth && getId && data.type === this.getType) {
              return {...data, offer: getId[0].offer};
            } else {
              return data;
            }
        }));
        //console.log(this.all);
        this.selectedPayments = [];
        this.all.forEach(row => {
          row.forEach((data : any) => {
            if (data.month === this.simulatorMonth && data.type === 'MCI') {
              this.selectedPayments = this.selectedPayments.concat({...data});
            }
          })
        });

        this.paymentCount = 0;
        this.paymentTotalMonth = 0.0;
        this.paymentTotalAmount = 0.0;
        this.paymentTotalRate = 0.0;
        this.paymentAnualRate = '';
        this.paymentMonthRate = '';
        //console.log(this.selectedPayments);
        if (this.selectedPayments.length > 0) {
          for (let row of this.selectedPayments) {
            //console.log(row);
            if (row.offer) {
              this.paymentCount += 1;
              this.paymentTotalMonth += (row.total / parseInt(row.month));
              this.paymentTotalRate += row.total;
              this.paymentAnualRate = ((parseFloat(row.rate)  * 12) * 100).toFixed(2);
              this.paymentMonthRate = ((parseFloat(row.rate)  * 1) * 100).toFixed(2);
              this.paymentTotalAmount += row.amount;
            }
          }
          /*console.log(this.paymentCount);
          console.log(this.paymentTotalMonth);
          console.log(this.paymentTotalRate);
          console.log(this.paymentAnualRate);
          console.log(this.paymentTotalAmount);*/
          if (this.paymentAnualRate.length === 0) this.paymentAnualRate = '0.0';
        }
      }
    });
    //console.log(all);

    this.store.dispatch(setProcessPayment({ paymentCart : all }));
    this.store.dispatch(setProcessPaymentConfirm({ paymentCartConfirm : this.all }));

    this.store.pipe(select(fromPayments.getProcessPaymentGroup)).subscribe(array => {
      if (array.length > 0) {
        this.allView = array.map(row => row.map((data: any) => {
          if (data.id === event[0]) {
            return {...data, offer: !event[1] };
          } else {
            return data;
          }
        }));
      }
    });
    this.store.dispatch(setProcessPaymentGroup({ paymentGroup : this.allView }));
  }

  ngAfterViewInit() {
    this._gtm.pushTag({
      tipoSitio: 'Publico',
      idiomaPagina: 'Espanol',
      canalBanco: 'Supermovil',
      section: 'seleccion_de_plazo',
      titulo: 'difiere_tus_compras',
      url: 'financing/disponibles-a-diferir/mensualidades',
      buc_id: sessionStorage.getItem('buc'),
      plan: this.topMonth,
      proceso: this.paymentMonthRate,
      anio: this.paymentAnualRate,
      tipoDispositivo: this._device.deviceType,
      versionApp: '1.0.0',
      marca_dispositivo: this._device.device,
      sistema_operativo: this._device.os,
      entorno: 'DEV',
      event: 'pageView',
    })
  }

}
