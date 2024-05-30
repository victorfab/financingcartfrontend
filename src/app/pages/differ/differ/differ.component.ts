import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import { select, Store } from '@ngrx/store';
import { DifferedPaymentsService } from 'src/app/services/differed.payments.service';
import { PaymentsService } from 'src/app/services/payments.service';
import * as fromPayments from 'src/app/ngrx/selectors/payments.selector';
import { setCounterPayment, setDifferedPayment, setPaymentToDiffer, setProcessPayment, setProcessPaymentGroup } from 'src/app/ngrx/actions/payment.action';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute } from '@angular/router';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import {ModalErrorComponent} from "../../shared/modal-error/modal-error.component";
import {ModalService} from "../../common/modal.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {FlameLoaderService} from "@ngx-mxflame/atoms/loader-overlay";
import {SoftTokenService} from "../../common/soft-token.service";

declare var superMovil : any;

@Component({
  selector: 'app-differ',
  templateUrl: './differ.component.html',
  styleUrls: ['./differ.component.css']
})
export class DifferComponent implements OnInit, AfterViewChecked, AfterViewInit {
  currentLastLocation : string;
  currentTitleName : string;
  toDiffer : Array<any>;
  differed : Array<any>;
  month : string;
  group24msi : Array<any>;
  group24mci : Array<any>;
  group18msi : Array<any>;
  group18mci : Array<any>;
  group12msi : Array<any>;
  group12mci : Array<any>;
  group9msi : Array<any>;
  group9mci : Array<any>;
  group6msi : Array<any>;
  group6mci : Array<any>;
  group3msi : Array<any>;
  group3mci : Array<any>;
  group24msiView : Array<any>;
  group24mciView : Array<any>;
  group18msiView : Array<any>;
  group18mciView : Array<any>;
  group12msiView : Array<any>;
  group12mciView : Array<any>;
  group9msiView : Array<any>;
  group9mciView : Array<any>;
  group6msiView : Array<any>;
  group6mciView : Array<any>;
  group3msiView : Array<any>;
  group3mciView : Array<any>;
  differedMci : Array<any>;
  differedMsi : Array<any>;
  btnContinue : boolean;
  mError : boolean;
  mErrorMaintenance : boolean;
  counterAvailable : {
    twentyFourMsi : number,
    twentyFourMci : number,
    eighteenMsi : number,
    eighteenMci : number,
    twelveMsi : number,
    twelveMci : number,
    nineMsi : number,
    nineMci : number,
    sixMsi : number,
    sixMci : number,
    threeMsi : number,
    threeMci : number
  };
  counterDisplay : {
    twentyFourMsi : boolean,
    twentyFourMci : boolean,
    eighteenMsi : boolean,
    eighteenMci : boolean,
    twelveMsi : boolean,
    twelveMci : boolean,
    nineMsi : boolean,
    nineMci : boolean,
    sixMsi : boolean,
    sixMci : boolean,
    threeMsi : boolean,
    threeMci : boolean
  };
  generalCounter : number;

  constructor(private store : Store<any>,
              private paymentsService : PaymentsService,
              private differedPaymentsService : DifferedPaymentsService,
              private _elementRef : ElementRef,
              private _modalErrorService: ModalService,
              private sessionService : SessionService,
              private route : ActivatedRoute,
              private _gtm: GoogleTagManagerService,
              private _device: DeviceDetectorService,
              private _loader: FlameLoaderService,
              private _ssoToken: SoftTokenService
              ) {
    this.currentLastLocation = '/';
    this.currentTitleName = 'Difiere tus compras';
    this.toDiffer = new Array<any>;
    this.differed = [];
    this.month = '';
    this.group24msi = [];
    this.group24mci = [];
    this.group18msi = [];
    this.group18mci = [];
    this.group12msi = [];
    this.group12mci = [];
    this.group9msi = [];
    this.group9mci = [];
    this.group6msi = [];
    this.group6mci = [];
    this.group3msi = [];
    this.group3mci = [];
    this.group24msiView = [];
    this.group24mciView = [];
    this.group18msiView = [];
    this.group18mciView = [];
    this.group12msiView = [];
    this.group12mciView = [];
    this.group9msiView = [];
    this.group9mciView = [];
    this.group6msiView = [];
    this.group6mciView = [];
    this.group3msiView = [];
    this.group3mciView = [];
    this.differedMci = [];
    this.differedMsi = [];
    this.btnContinue = false;
    this.mError = true;
    this.mErrorMaintenance = true;
    this.counterAvailable = {
      twentyFourMsi : 0,
      twentyFourMci : 0,
      eighteenMsi : 0,
      eighteenMci : 0,
      twelveMsi : 0,
      twelveMci : 0,
      nineMsi : 0,
      nineMci : 0,
      sixMsi : 0,
      sixMci : 0,
      threeMsi : 0,
      threeMci : 0
    };
    this.counterDisplay = {
      twentyFourMsi : true,
      twentyFourMci : true,
      eighteenMsi : true,
      eighteenMci : true,
      twelveMsi : true,
      twelveMci : true,
      nineMsi : true,
      nineMci : true,
      sixMsi : true,
      sixMci : true,
      threeMsi : true,
      threeMci : true
    };
    this.generalCounter = 0;
  }

  ngOnInit(): void {
    const loader = this._loader.open();
    if (!sessionStorage.getItem('buc')) {
      this.route.queryParamMap.subscribe(params => {
        let token = params.get('token');
        if (token !== null) {
          this.sessionService.generateSession(token)
              .subscribe((data : any) => {
                if (data) {
                  sessionStorage.setItem('buc', data.SecObjRec.SecObjInfoBean.SecObjData.find((sod: any) => sod.SecObjDataKey === 'buc').SecObjDataValue);
                  sessionStorage.setItem('cardNumber', data.SecObjRec.SecObjInfoBean.SecObjData.find((sod: any) => sod.SecObjDataKey === 'cardNumber').SecObjDataValue);
                  sessionStorage.setItem('cardType', data.SecObjRec.SecObjInfoBean.SecObjData.find((sod: any) => sod.SecObjDataKey === 'cartType').SecObjDataValue);
                  sessionStorage.setItem('codStamp', data.SecObjRec.SecObjInfoBean.SecObjData.find((sod: any) => sod.SecObjDataKey === 'codStamp').SecObjDataValue);
                  sessionStorage.setItem('cardName', data.SecObjRec.SecObjInfoBean.SecObjData.find((sod: any) => sod.SecObjDataKey === 'cardName').SecObjDataValue);
                  sessionStorage.setItem('numContrato', data.SecObjRec.SecObjInfoBean.SecObjData.find((sod: any) => sod.SecObjDataKey === 'numContrato').SecObjDataValue);
                  loader.close();
                  this.loadData();
                }
              }, error => {
                const config = {
                  title: '',
                  subtitle: '',
                  closeLabel: 'Cerrar',
                  titlePosition: 'center',
                  backgroundColor: 'secondary',
                  closeBackdropClick: false,
                  panelClass: 'modal-error'
                };
                loader.close();
                const dialogRef = this._modalErrorService.open(ModalErrorComponent, config);
                dialogRef.afterClosed().subscribe(() => {
                  superMovil.goToPreviousScreen();
                });
              });
        } else {
          const config = {
            title: '',
            subtitle: '',
            closeLabel: 'Cerrar',
            titlePosition: 'center',
            backgroundColor: 'secondary',
            closeBackdropClick: false,
            panelClass: 'modal-error'
          };
          loader.close();
          const dialogRef = this._modalErrorService.open(ModalErrorComponent, config);
          dialogRef.afterClosed().subscribe(() => {
            superMovil.goToPreviousScreen();
          });
        }
      });
    } else {
      loader.close();
      this.loadData();
    }
  }

  loadData() : void {
    this.store.pipe(select(fromPayments.getProcessCounter)).subscribe((data : any) => {
      console.log(data);
      this.counterDisplay = {
        twentyFourMsi : data.paymentDisplay.twentyFourMsi,
        twentyFourMci : data.paymentDisplay.twentyFourMci,
        eighteenMsi : data.paymentDisplay.eighteenMsi,
        eighteenMci : data.paymentDisplay.eighteenMci,
        twelveMsi : data.paymentDisplay.twelveMsi,
        twelveMci : data.paymentDisplay.twelveMci,
        nineMsi : data.paymentDisplay.nineMsi,
        nineMci : data.paymentDisplay.nineMci,
        sixMsi : data.paymentDisplay.sixMsi,
        sixMci : data.paymentDisplay.sixMci,
        threeMsi : data.paymentDisplay.threeMsi,
        threeMci : data.paymentDisplay.threeMci
      }
      this.counterAvailable = {
        twentyFourMsi : data.paymentCounter.twentyFourMsi,
        twentyFourMci : data.paymentCounter.twentyFourMci,
        eighteenMsi : data.paymentCounter.eighteenMsi,
        eighteenMci : data.paymentCounter.eighteenMci,
        twelveMsi : data.paymentCounter.twelveMsi,
        twelveMci : data.paymentCounter.twelveMci,
        nineMsi : data.paymentCounter.nineMsi,
        nineMci : data.paymentCounter.nineMci,
        sixMsi : data.paymentCounter.sixMsi,
        sixMci : data.paymentCounter.sixMci,
        threeMsi : data.paymentCounter.threeMsi,
        threeMci : data.paymentCounter.threeMci
      };
      this.btnContinue = data.paymentBtn;
      this.month = data.paymentMonth;
      this.generalCounter = data.paymentGeneralCounter
    });

    this.store.pipe(select(fromPayments.getProcessPaymentGroup)).subscribe((array : any) => {
      //console.log(array);
      if (array.length > 0) {
        let counter = 0;
        array.forEach((row : any) => {
          row.forEach((data : any) => {
            if (data.offer) counter++;
          });
        });
        //console.log(counter);
        if (counter === 0) this.btnContinue = false;
        this.group24msiView = array[0];
        this.group24mciView = array[1];
        this.group18msiView = array[2];
        this.group18mciView = array[3];
        this.group12msiView = array[4];
        this.group12mciView = array[5];
        this.group9msiView = array[6];
        this.group9mciView = array[7];
        this.group6msiView = array[8];
        this.group6mciView = array[9];
        this.group3msiView = array[10];
        this.group3mciView = array[11];
      }
    });

    this.store.pipe(select(fromPayments.getProcessPayment)).subscribe(array => {
      //console.log(array);
      if (array.length > 0) {
        this.group24msi = array[0];
        this.group24mci = array[1];
        this.group18msi = array[2];
        this.group18mci = array[3];
        this.group12msi = array[4];
        this.group12mci = array[5];
        this.group9msi = array[6];
        this.group9mci = array[7];
        this.group6msi = array[8];
        this.group6mci = array[9];
        this.group3msi = array[10];
        this.group3mci = array[11];
      } else {
        this.store.pipe(select(fromPayments.getPaymentsToDiffer)).subscribe((data : any) => {
          //console.log(data);
          if (data.length > 0) {
            this.group24msiView = this.reGroup(data, 'MSI', '24', true);
            this.group24mciView = this.reGroup(data, 'MCI', '24', true);
            this.group18msiView = this.reGroup(data, 'MSI', '18', true);
            this.group18mciView = this.reGroup(data, 'MCI', '18', true);
            this.group12msiView = this.reGroup(data, 'MSI', '12', true);
            this.group12mciView = this.reGroup(data, 'MCI', '12', true);
            this.group9msiView = this.reGroup(data, 'MSI', '9', true);
            this.group9mciView = this.reGroup(data, 'MCI', '9', true);
            this.group6msiView = this.reGroup(data, 'MSI', '6', true);
            this.group6mciView = this.reGroup(data, 'MCI', '6', true);
            this.group3msiView = this.reGroup(data, 'MSI', '3', true);
            this.group3mciView = this.reGroup(data, 'MCI', '3', true);

            this.group24msi = this.reGroup(data, 'MSI', '24', false);
            this.group24mci = this.reGroup(data, 'MCI', '24', false);
            this.group18msi = this.reGroup(data, 'MSI', '18', false);
            this.group18mci = this.reGroup(data, 'MCI', '18', false);
            this.group12msi = this.reGroup(data, 'MSI', '12', false);
            this.group12mci = this.reGroup(data, 'MCI', '12', false);
            this.group9msi = this.reGroup(data, 'MSI', '9', false);
            this.group9mci = this.reGroup(data, 'MCI', '9', false);
            this.group6msi = this.reGroup(data, 'MSI', '6', false);
            this.group6mci = this.reGroup(data, 'MCI', '6', false);
            this.group3msi = this.reGroup(data, 'MSI', '3', false);
            this.group3mci = this.reGroup(data, 'MCI', '3', false);
          } else {
            const loader = this._loader.open();
            this.paymentsService.getPaymentsToDiffer().subscribe({
              next : data => {
                if (data.length > 0) {
                  this.group24msiView = this.reGroup(data, 'MSI', '24', true);
                  this.group24mciView = this.reGroup(data, 'MCI', '24', true);
                  this.group18msiView = this.reGroup(data, 'MSI', '18', true);
                  this.group18mciView = this.reGroup(data, 'MCI', '18', true);
                  this.group12msiView = this.reGroup(data, 'MSI', '12', true);
                  this.group12mciView = this.reGroup(data, 'MCI', '12', true);
                  this.group9msiView = this.reGroup(data, 'MSI', '9', true);
                  this.group9mciView = this.reGroup(data, 'MCI', '9', true);
                  this.group6msiView = this.reGroup(data, 'MSI', '6', true);
                  this.group6mciView = this.reGroup(data, 'MCI', '6', true);
                  this.group3msiView = this.reGroup(data, 'MSI', '3', true);
                  this.group3mciView = this.reGroup(data, 'MCI', '3', true);

                  this.group24msi = this.reGroup(data, 'MSI', '24', false);
                  this.group24mci = this.reGroup(data, 'MCI', '24', false);
                  this.group18msi = this.reGroup(data, 'MSI', '18', false);
                  this.group18mci = this.reGroup(data, 'MCI', '18', false);
                  this.group12msi = this.reGroup(data, 'MSI', '12', false);
                  this.group12mci = this.reGroup(data, 'MCI', '12', false);
                  this.group9msi = this.reGroup(data, 'MSI', '9', false);
                  this.group9mci = this.reGroup(data, 'MCI', '9', false);
                  this.group6msi = this.reGroup(data, 'MSI', '6', false);
                  this.group6mci = this.reGroup(data, 'MCI', '6', false);
                  this.group3msi = this.reGroup(data, 'MSI', '3', false);
                  this.group3mci = this.reGroup(data, 'MCI', '3', false);
                  this.store.dispatch(setPaymentToDiffer({ toDiffer : data }));
                }
                loader.close();
              },
              error : err => {
                const config = {
                  title: '',
                  subtitle: '',
                  closeLabel: 'Cerrar',
                  titlePosition: 'center',
                  backgroundColor: 'secondary',
                  closeBackdropClick: false,
                  panelClass: 'modal-error'
                }
                loader.close();
                const dialogRef = this._modalErrorService.open(ModalErrorComponent, config);
                dialogRef.afterClosed().subscribe(() => {
                  superMovil.goToPreviousScreen();
                });
              }
            });
          }
        });
      }
    });

    this.store.pipe(select(fromPayments.getDifferedPayments)).subscribe((data : any) => {
      if (data.length > 0) {
        this.differedMci = this.byType(data, 'MCI');
        this.differedMsi = this.byType(data, 'MSI');
      } else {
        this.differedPaymentsService.getDifferedPayments().subscribe({
          next : data => {
            if (data.length > 0) {
              this.differedMci = this.byType(data, 'MCI');
              this.differedMsi = this.byType(data, 'MSI');
              this.store.dispatch(setDifferedPayment({ differed : data }));
            }
          },
          error : err => {
            const config = {
              title: '',
              subtitle: '',
              closeLabel: 'Cerrar',
              titlePosition: 'center',
              backgroundColor: 'secondary',
              closeBackdropClick: false,
              panelClass: 'modal-error'
            }
            const dialogRef = this._modalErrorService.open(ModalErrorComponent, config);
            dialogRef.afterClosed().subscribe(() => {
              superMovil.goToPreviousScreen();
            });
          }
        });
      }
    });
  }

  reGroup = (endpoint : Array<any>, type: string, months : string, filter : boolean) : Array<any> => {
    //console.log(type, months);
    let counterMci = 0, counterMsi = 0;
    let monthListMsi : number[] = [];
    let monthListMci : number[] = [];
    let getIds : number[] = [];
    let array = new Array<any>;

    let list = endpoint.map(row => row);
    list.map(row => {
      row.ofertas.filter((data : any) => {
        if (data.tipo === type && data.noMeses === months) {
          getIds = getIds.concat(row.id);
          array = array.concat({
            id: row.id,
            title: (row.nomCom.length > 23) ? row.nomCom.slice(0, 23) + '...' : row.nomCom,
            date: row.fechaCompra,
            amount: row.montoCompra,
            offer: false,
            offerIdTest: data.id,
            month: data.noMeses,
            type: data.tipo,
            total: (data.totalPago) ? parseFloat(data.totalPago) : 0.0,
            rate: (data.interesMensual) ? parseFloat(data.interesMensual) : 0.0
          });
        }
      })
    });
    //console.log(getIds);
    //console.log(array);
    array = array.map((element, i) => {
      //console.log(element, i);
      monthListMsi = [];
      monthListMci = [];
      list.map(row => {
        row.ofertas.filter((data : any) => {
          if (data.tipo === 'MSI' && row.id === element.id) {
            //console.log('msi', row.id, data.noMeses);
            monthListMsi = monthListMsi.concat(parseInt(data.noMeses));
          }
          if (data.tipo === 'MCI' && row.id === element.id) {
            //console.log('mci', row.id, data.noMeses);
            monthListMci = monthListMci.concat(parseInt(data.noMeses));
          }
        });
      });
      //console.log('msi', monthListMsi);
      //console.log('mci', monthListMci);
      if (element.type === 'MSI') {
        return { ...element, msi : Math.max(...monthListMsi).toString() };
      }
      if (element.type === 'MCI') {
        return { ...element, mci : Math.max(...monthListMci).toString() };
      }
    });
    //console.log(array);
    array.forEach(row => {
      if (row.month === row.msi) counterMsi++;
      if (row.month === row.mci) counterMci++;
    });

    if (filter) {
      if (type === 'MSI') {
        array = array.filter(row => row.month === row.msi);
      } else if (type === 'MCI') {
        array = array.filter(row => row.month === row.mci);
      }
    }

    switch (months) {
      case '24':
        if (type === 'MSI') {
          this.counterAvailable = { ...this.counterAvailable, twentyFourMsi : counterMsi };
        } else if (type === 'MCI') {
          this.counterAvailable = { ...this.counterAvailable, twentyFourMci : counterMci };
        }
        break;
      case '18':
        if (type === 'MSI') {
          this.counterAvailable = { ...this.counterAvailable, eighteenMsi : counterMsi };
        } else if (type === 'MCI') {
          this.counterAvailable = { ...this.counterAvailable, eighteenMci : counterMci };
        }
        break;
      case '12':
        if (type === 'MSI') {
          this.counterAvailable = { ...this.counterAvailable, twelveMsi : counterMsi };
        } else if (type === 'MCI') {
          this.counterAvailable = { ...this.counterAvailable, twelveMci : counterMci };
        }
        break;
      case '9':
        if (type === 'MSI') {
          this.counterAvailable = { ...this.counterAvailable, nineMsi : counterMsi };
        } else if (type === 'MCI') {
          this.counterAvailable = { ...this.counterAvailable, nineMci : counterMci };
        }
        break;
      case '6':
        if (type === 'MSI') {
          this.counterAvailable = { ...this.counterAvailable, sixMsi : counterMsi };
        } else if (type === 'MCI') {
          this.counterAvailable = { ...this.counterAvailable, sixMci : counterMci };
        }
        break;
      case '3':
        if (type === 'MSI') {
          this.counterAvailable = { ...this.counterAvailable, threeMsi : counterMsi };
        } else if (type === 'MCI') {
          this.counterAvailable = { ...this.counterAvailable, threeMci : counterMci };
        }
        break;
    }
    array = array.sort((a : any, b : any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    //console.log(array);
    //console.log(this.counterAvailable);
    return array;
  }

  byType = (endpoint : Array<any>, type : string) : Array<any> => {
    let array = new Array<any>;
    let list = endpoint.map(row => row);
    list.map(row => row.ofertas.filter((data : any) => {
      if (data.tipo === type) {
        array = array.concat({
          id: row.id,
          title: (row.nomCom.length > 23) ? row.nomCom.slice(0, 23) + '...' : row.nomCom,
          date: row.fechaModificacion,
          amount: row.montoCompra,
          offerIdTest: data.id
        });
      }
    }));
    array = array.sort((a : any, b : any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return array;
  }

  getRadioClick(event : Array<any>) : void{
    let count = 0;
    this.generalCounter = 0;

    switch (event[1]) {
      case 'g24msi':
        this.group24msi = this.group24msi.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group24msiView = this.group24msiView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group24msiView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse24Msi(count);
        this.month = '24';
        break;
      case 'g24mci':
        this.group24mci = this.group24mci.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group24mciView = this.group24mciView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group24mciView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });
        this.btnContinue = (count === 0) ? false : true;
        this.toFalse24Mci(count);
        this.month = '24';
        break;
      case 'g18msi':
        this.group18msi = this.group18msi.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group18msiView = this.group18msiView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group18msiView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse18Msi(count);
        this.month = '18';
        break;
      case 'g18mci':
        this.group18mci = this.group18mci.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group18mciView = this.group18mciView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group18mciView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });
        this.btnContinue = (count === 0) ? false : true;
        this.toFalse18Mci(count);
        this.month = '18';
        break;
      case 'g12msi':
        this.group12msi = this.group12msi.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group12msiView = this.group12msiView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group12msiView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });
        this.btnContinue = (count === 0) ? false : true;
        this.toFalse12Msi(count);
        this.month = '12';
        break;
      case 'g12mci':
        this.group12mci = this.group12mci.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group12mciView = this.group12mciView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group12mciView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });
        this.btnContinue = (count === 0) ? false : true;
        this.toFalse12Mci(count);
        this.month = '12';
        break;
      case 'g9msi':
        this.group9msi = this.group9msi.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group9msiView = this.group9msiView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group9msiView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse9Msi(count);
        this.month = '9';
        break;
      case 'g9mci':
        this.group9mci = this.group9mci.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group9mciView = this.group9mciView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group9mciView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse9Mci(count);
        this.month = '9';
        break;
      case 'g6msi':
        this.group6msi = this.group6msi.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group6msiView = this.group6msiView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group6msiView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse6Msi(count);
        this.month = '6';
        break;
      case 'g6mci':
        this.group6mci = this.group6mci.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group6mciView = this.group6mciView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group6mciView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse6Mci(count);
        this.month = '6';
        break;
      case 'g3msi':
        this.group3msi = this.group3msi.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group3msiView = this.group3msiView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group3msiView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse3Mci(count);
        this.month = '3';
        break;
      case 'g3mci':
        this.group3mci = this.group3mci.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group3mciView = this.group3mciView.map(row => {
          if (row.id === event[0]) {
            return { ...row, offer: !row.offer }
          } else {
            return row;
          }
        });

        this.group3mciView.forEach(data => {
          if (data.offer) count++;
          if (data.offer) this.generalCounter++;
        });

        this.btnContinue = (count === 0) ? false : true;
        this.toFalse3Mci(count);
        this.month = '3';
        break;
    }

    let allGroupsView = [this.group24msiView, this.group24mciView, this.group18msiView, this.group18mciView,
      this.group12msiView, this.group12mciView, this.group9msiView,
      this.group9mciView, this.group6msiView, this.group6mciView, this.group3msiView, this.group3mciView];
    this.store.dispatch(setProcessPaymentGroup({ paymentGroup : allGroupsView }));

    let allGroups = [this.group24msi, this.group24mci, this.group18msi, this.group18mci,
      this.group12msi, this.group12mci, this.group9msi,
      this.group9mci, this.group6msi, this.group6mci, this.group3msi, this.group3mci];
    this.store.dispatch(setProcessPayment({ paymentCart : allGroups }));
  }

  getAllClick(event : any) : void {
    this.generalCounter = 0;

    switch (event) {
      case 'g24msi':
        this.group24msi = this.group24msi.map(row => {
          if (row.month === row.msi) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group24msiView = this.group24msiView.map(row => { return { ...row, offer: true } });
        this.toFalse24Msi();
        this.month = '24';

        this.group24msiView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g24mci':
        this.group24mci = this.group24mci.map(row => {
          if (row.month === row.mci) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group24mciView = this.group24mciView.map(row => { return { ...row, offer: true } });
        this.toFalse24Mci();
        this.month = '24';

        this.group24mciView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g18msi':
        this.group18msi = this.group18msi.map(row => {
          if (row.month === row.msi) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group18msiView = this.group18msiView.map(row => { return { ...row, offer: true } });
        this.toFalse18Msi();
        this.month = '18';

        this.group18msiView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g18mci':
        this.group18mci = this.group18mci.map(row => {
          if (row.month === row.mci) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group18mciView = this.group18mciView.map(row => { return { ...row, offer: true } });
        this.toFalse18Mci();
        this.month = '18';

        this.group18mciView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g12msi':
        this.group12msi = this.group12msi.map(row => {
          if (row.month === row.msi) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group12msiView = this.group12msiView.map(row => { return { ...row, offer: true } });
        this.toFalse12Msi();
        this.month = '12';

        this.group12msiView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g12mci':
        this.group12mci = this.group12mci.map(row => {
          if (row.month === row.mci) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group12mciView = this.group12mciView.map(row => { return { ...row, offer: true } });
        this.toFalse12Mci();
        this.month = '12';

        this.group12mciView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g9msi':
        this.group9msi = this.group9msi.map(row => {
          if (row.month === row.msi) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group9msiView = this.group9msiView.map(row => { return { ...row, offer: true } });
        this.toFalse9Msi();
        this.month = '9';

        this.group9msiView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g9mci':
        this.group9mci = this.group9mci.map(row => {
          if (row.month === row.mci) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group9mciView = this.group9mciView.map(row => { return { ...row, offer: true } });
        this.toFalse9Mci();
        this.month = '9';

        this.group9mciView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g6msi':
        this.group6msi = this.group6msi.map(row => {
          if (row.month === row.msi) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group6msiView = this.group6msiView.map(row => { return { ...row, offer: true } });
        this.toFalse6Msi();
        this.month = '6';

        this.group6msiView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g6mci':
        this.group6mci = this.group6mci.map(row => {
          if (row.month === row.mci) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group6mciView = this.group6mciView.map(row => { return { ...row, offer: true } });
        this.toFalse6Mci();
        this.month = '6';

        this.group6mciView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g3msi':
        this.group3msi = this.group3msi.map(row => {
          if (row.month === row.msi) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group3msiView = this.group3msiView.map(row => { return { ...row, offer: true } });
        this.toFalse3Msi();
        this.month = '3';

        this.group3msiView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
      case 'g3mci':
        this.group3mci = this.group3mci.map(row => {
          if (row.month === row.mci) {
            return { ...row, offer: true };
          } else {
            return { ...row, offer: false };
          }
        });
        this.group3mciView = this.group3mciView.map(row => { return { ...row, offer: true } });
        this.toFalse3Mci();
        this.month = '3';

        this.group3mciView.forEach(data => {
          if (data.offer) this.generalCounter++;
        });
        break;
    }

    let allGroupsView = [this.group24msiView, this.group24mciView, this.group18msiView, this.group18mciView,
      this.group12msiView, this.group12mciView, this.group9msiView,
      this.group9mciView, this.group6msiView, this.group6mciView, this.group3msiView, this.group3mciView];
    this.store.dispatch(setProcessPaymentGroup({ paymentGroup : allGroupsView }));

    let allGroups = [this.group24msi, this.group24mci, this.group18msi, this.group18mci, this.group12msi, this.group12mci, this.group9msi,
      this.group9mci, this.group6msi, this.group6mci, this.group3msi, this.group3mci];
    this.store.dispatch(setProcessPayment({ paymentCart : allGroups }));
    this.btnContinue = true;
  }

  getNotAllClick() : void {
    this.generalCounter = 0;
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    this.counterDisplay = {
      twentyFourMsi : true,
      twentyFourMci : true,
      eighteenMsi : true,
      eighteenMci : true,
      twelveMsi : true,
      twelveMci : true,
      nineMsi : true,
      nineMci : true,
      sixMsi : true,
      sixMci : true,
      threeMsi : true,
      threeMci : true
    };
    this.btnContinue = false;
  }

  ngAfterViewChecked() : void {
    //console.log(this._elementRef.nativeElement.querySelector('.btn-continue')?.offsetTop);
    if (this._elementRef.nativeElement.querySelector('.btn-continue')?.style) {
      this._elementRef.nativeElement.querySelector('.btn-continue').style.position = 'relative';
    }

    if (this._elementRef.nativeElement.querySelector('.btn-continue')?.offsetTop <= 600) {
      if (this._elementRef.nativeElement.querySelector('.btn-continue')?.style) {
        this._elementRef.nativeElement.querySelector('.btn-continue').style.position = 'fixed';
      }
    } else {
      if (this._elementRef.nativeElement.querySelector('.btn-continue')?.style) {
        this._elementRef.nativeElement.querySelector('.btn-continue').style.position = 'relative';
      }
    }
  }

  test() {
    let allGroups = [this.group24msi, this.group24mci, this.group18msi, this.group18mci,
      this.group12msi, this.group12mci, this.group9msi,
      this.group9mci, this.group6msi, this.group6mci, this.group3msi, this.group3mci];
    //console.log(allGroups);
    this.store.dispatch(setProcessPayment({ paymentCart : allGroups }));

    let allGroupsView = [this.group24msiView, this.group24mciView, this.group18msiView, this.group18mciView,
      this.group12msiView, this.group12mciView, this.group9msiView,
      this.group9mciView, this.group6msiView, this.group6mciView, this.group3msiView, this.group3mciView];
    //console.log(allGroupsView);
    this.store.dispatch(setProcessPaymentGroup({ paymentGroup : allGroupsView }));

    this.store.dispatch(setCounterPayment({
      paymentDisplay : this.counterDisplay,
      paymentCounter : this.counterAvailable,
      paymentBtn : this.btnContinue,
      paymentMonth : this.month,
      paymentGeneralCounter : this.generalCounter
    }));
  }

  toFalse24Msi(count? : number) {
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse24Mci(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : true,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse18Msi(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : true,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse18Mci(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : true,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse12Msi(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : true,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse12Mci(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : true,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse9Msi(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : true,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse9Mci(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : true,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse6Msi(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : true,
        sixMci : false,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse6Mci(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : true,
        threeMsi : false,
        threeMci : false
      };
    }
  }

  toFalse3Msi(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3mciView = this.group3mciView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3mci = this.group3mci.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : true,
        threeMci : false
      };
    }
  }

  toFalse3Mci(count? : number) {
    this.group24msiView = this.group24msiView.map(data => {return {...data, offer: false}});
    this.group24mciView = this.group24mciView.map(data => {return {...data, offer: false}});
    this.group18msiView = this.group18msiView.map(data => {return {...data, offer: false}});
    this.group18mciView = this.group18mciView.map(data => {return {...data, offer: false}});
    this.group12msiView = this.group12msiView.map(data => {return {...data, offer: false}});
    this.group12mciView = this.group12mciView.map(data => {return {...data, offer: false}});
    this.group9msiView = this.group9msiView.map(data => {return {...data, offer: false}});
    this.group9mciView = this.group9mciView.map(data => {return {...data, offer: false}});
    this.group6msiView = this.group6msiView.map(data => {return {...data, offer: false}});
    this.group6mciView = this.group6mciView.map(data => {return {...data, offer: false}});
    this.group3msiView = this.group3msiView.map(data => {return {...data, offer: false}});

    this.group24msi = this.group24msi.map(data => {return {...data, offer: false}});
    this.group24mci = this.group24mci.map(data => {return {...data, offer: false}});
    this.group18msi = this.group18msi.map(data => {return {...data, offer: false}});
    this.group18mci = this.group18mci.map(data => {return {...data, offer: false}});
    this.group12msi = this.group12msi.map(data => {return {...data, offer: false}});
    this.group12mci = this.group12mci.map(data => {return {...data, offer: false}});
    this.group9msi = this.group9msi.map(data => {return {...data, offer: false}});
    this.group9mci = this.group9mci.map(data => {return {...data, offer: false}});
    this.group6msi = this.group6msi.map(data => {return {...data, offer: false}});
    this.group6mci = this.group6mci.map(data => {return {...data, offer: false}});
    this.group3msi = this.group3msi.map(data => {return {...data, offer: false}});

    if (count === 0) {
      this.counterDisplay = {
        twentyFourMsi : true,
        twentyFourMci : true,
        eighteenMsi : true,
        eighteenMci : true,
        twelveMsi : true,
        twelveMci : true,
        nineMsi : true,
        nineMci : true,
        sixMsi : true,
        sixMci : true,
        threeMsi : true,
        threeMci : true
      };
    } else {
      this.counterDisplay = {
        twentyFourMsi : false,
        twentyFourMci : false,
        eighteenMsi : false,
        eighteenMci : false,
        twelveMsi : false,
        twelveMci : false,
        nineMsi : false,
        nineMci : false,
        sixMsi : false,
        sixMci : false,
        threeMsi : false,
        threeMci : true
      };
    }
  }

  getLocation() : void {
    //window.location.href = "/";
    superMovil.goToPreviousScreen();
  }

  ngAfterViewInit() {
    this._gtm.pushTag({
      tipoSitio: 'Publico',
      idiomaPagina: 'Espanol',
      canalBanco: 'Supermovil',
      section: 'difiere_tus_compras',
      titulo: 'difiere_tus_compras',
      url: 'financing/disponibles-a-diferir',
      buc_id: sessionStorage.getItem('buc'),
      plan: '',
      proceso: '',
      anio: '',
      tipoDispositivo: this._device.deviceType,
      versionApp: '1.0.0',
      marca_dispositivo: this._device.device,
      sistema_operativo: this._device.os,
      entorno: 'DEV',
      event: 'pageView',
    });
  }

}
