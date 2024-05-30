import {Component, EventEmitter, Input, Output, OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromPayments from 'src/app/ngrx/selectors/payments.selector';
import { setConfirmPayment } from 'src/app/ngrx/actions/payment.action';
import { TermsService } from 'src/app/services/terms.service';
import { DifferService } from 'src/app/services/differ.service';
import { CardService } from 'src/app/services/card.service';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import {FlameBottomSheetService} from "@ngx-mxflame/atoms/bottom-sheet";
import {ModalErrorComponent} from "../../shared/modal-error/modal-error.component";
import {ModalService} from "../../common/modal.service";
import {ModalMaintenanceComponent} from "../../shared/modal-maintenance/modal-maintenance.component";
import {ModalNotDiferedComponent} from "../../shared/modal-not-difered/modal-not-difered.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {FlameLoaderService} from "@ngx-mxflame/atoms/loader-overlay";
import {SoftTokenService} from "../../common/soft-token.service";
import {ValidateSTService} from "../../../services/validate-st.service";
import {ShowTransactionTicketService} from "../../common/show-transaction-ticket.service";

declare var superMovil : any;
declare let FinancingSuperMovil: any;

@Component({
  selector: 'app-simulator-modal',
  templateUrl: './simulator-modal.component.html',
  styleUrls: ['./simulator-modal.component.css']
})
export class SimulatorModalComponent implements OnInit {
  @Input() paymentCountChild : number;
  @Input() simulatorMonthChild : string;
  @Input() paymentTotalMonthChild : number;
  @Input() paymentTotalRateChild : number;
  @Input() paymentTotalAmountChild : number;
  @Input() paymentAnualRateChild : string;
  @Input() paymentMonthRateChild : string;
  @Input() getTypeChild : string;
  @Input() modalFlagChild : boolean;
  @Input() selectedPaymentsChild : Array<any>;

  @Output() modal : EventEmitter<boolean> = new EventEmitter<boolean>();

  flagModalParent : boolean;
  inputTerm : boolean;
  inputSwitch : boolean;
  flagModal : boolean;
  terms : string;
  mError : boolean;
  responseST: any;
  responseNativeTicket: any;

  storage : {
    cardName : string | null,
    cardNumber : string | null,
    cardType : string | null,
    codStamp : string | null
  };

  cardImage : string;

  constructor(private termsService : TermsService,
    private cardService : CardService,
    private store : Store<any>,
    private router : Router,
    private differService : DifferService,
    private _bottomSheetService: ModalService,
    private _gtm: GoogleTagManagerService,
    private _device: DeviceDetectorService,
    private _loader: FlameLoaderService,
    private zone: NgZone,
    private _softTokenService: SoftTokenService,
    private _showTicket: ShowTransactionTicketService,
    private _validateST: ValidateSTService,
    private _ngZone: NgZone
  ) {
    (window as any).superTokenResponse = (resp: any):void => {
      this.zone.run(():void => {
      this.responseST = resp;
        let tokenResponse:{status: string, params: {date: string, token: string, typeOTP: string}} = JSON.parse(this.responseST);
        if(tokenResponse.status === 'true'){
          // Consume servicio de validacion de token
          this.validateST(tokenResponse.params.token);
        }
        else {
          // Mostrar error
          const config = {
            title: '',
            subtitle: '',
            closeLabel: 'Cerrar',
            titlePosition: 'center',
            backgroundColor: 'secondary',
            closeBackdropClick: false,
            panelClass: 'modal-error',
          };
          const dialogRef = this._bottomSheetService.open(ModalErrorComponent, config);
        }
      });
    };
    (window as any).nativeTicketResponse = (resp: any)=> {
      let respuesta = JSON.parse(resp);
      if(respuesta.params && respuesta.params.userAction !== 'share'){
        this.zone.run(() => {
          this.router.navigate(['/']);
        });
      }
    };
    (window as any).backButton = (resp: any) => {
      this._ngZone.run(() => {
        if(this.flagModal){
          this.flagModal = false;
          (window as any).backButton = () =>{
            this._ngZone.run(() => {
              this.modal.emit(false);
            });
          }
        }
      });
    };
    this.paymentCountChild = 0;
    this.simulatorMonthChild = '';
    this.paymentTotalMonthChild = 0.0;
    this.paymentTotalRateChild = 0.0;
    this.paymentTotalAmountChild = 0.0;
    this.paymentAnualRateChild = '';
    this.paymentMonthRateChild = '';
    this.getTypeChild = '';
    this.modalFlagChild = false;
    this.selectedPaymentsChild = [];

    this.inputTerm = false;
    this.flagModal = false;
    this.inputSwitch = true;
    this.flagModalParent = true;
    this.terms = '';
    this.mError = true;
    this.cardImage = '';

    this.storage = {
      cardName : sessionStorage.getItem('cardName'),
      cardNumber : sessionStorage.getItem('cardNumber'),
      cardType : sessionStorage.getItem('cardType'),
      codStamp : sessionStorage.getItem('codStamp')
    }
  }

  ngOnInit(): void {
    this.cardImage = this.cardService.getImageCard(this.storage.codStamp);
    this._gtm.pushTag({
      tipoSitio: 'Publico',
      idiomaPagina: 'Espanol',
      canalBanco: 'Supermovil',
      section: 'modal_confirmacion',
      titulo: 'financing/disponibles-a-diferir/confirmar',
      url: 'financing/disponibles-a-diferir/confirmar',
      buc_id: sessionStorage.getItem('buc'),
      plan: '',
      proceso: '',
      anio: '',
      tipoDispocitivo: this._device.deviceType,
      versionApp: '1.0.0',
      marca_dispositivo: this._device.device,
      sistema_operativo: this._device.os,
      entorno: 'DEV',
      event: '´pageview'
    });
    const loader = this._loader.open();
    this.termsService.getTermsAndConditions().subscribe({
      next: data => {
        loader.close();
        if (data) this.terms = data.description;
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
        };
        loader.close();
        const dialogRef = this._bottomSheetService.open(ModalErrorComponent, config);
        dialogRef.afterClosed().subscribe(() => {
          superMovil.goToPreviousScreen();
        });
      }
    });
  }

  confirmDiffer() : void {
    /*let st = null;

    if (this.getTypeChild === 'MCI') {
      try {
        st = superMovil.getSuperToken();
      } catch (error) {
        console.log(error);
      }
    } else if (this.getTypeChild === 'MSI') {
      st = true;
    }*/
    //console.log(st);
    //if (this.inputTerm && st !== null) {
    if (this.inputTerm) {
      console.log("OK!");
      this.inputSwitch = false;
      this.callSuperToken();
    } else {
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
      this.mError = false;
    }
  }

  acceptedTerms() : void {
    if (!this.inputTerm) {
      this.flagModalParent = false;
      this.inputTerm = true;
      this.inputSwitch = false;
    } else {
      this.flagModalParent = true;
      this.inputTerm = false;
      this.inputSwitch = true;
    }
  }

  acceptedTermsModal(flagModal : boolean) : void {
    this.flagModal = flagModal;
    this.flagModalParent = flagModal;
    this.inputTerm = true;
    this.inputSwitch = false;
  }

  showModal(flagModal : boolean) {
    //window.scrollTo(0, 0);
    this.flagModal = flagModal;
  }

  closeModal(flagModal : boolean) {
    this.flagModal = flagModal;
  }

  callSuperToken(){
    try{
      this._softTokenService.getSuperToken();
    }catch(error){
      console.log(error);
      // Mostrar error de Token
      const config = {
        title: '',
        subtitle: '',
        closeLabel: 'Cerrar',
        titlePosition: 'center',
        backgroundColor: 'secondary',
        closeBackdropClick: false,
        panelClass: 'modal-error',
      };
      const dialogRef = this._bottomSheetService.open(ModalErrorComponent, config);
    }
  }

  validateST(otp: string){
    const loader = this._loader.open();
    this._validateST.validateST(otp).subscribe({
      next: (resp: any) => {
        // validar si estatusSoftToken = 'A'
        if(resp.estatusSoftToken === 'A'){
          // Realizar Diferimiento
          loader.close();
          this.differPurchases();
        } else {
          // Mostrar error de Token
          loader.close();
          const config = {
            title: '',
            subtitle: '',
            closeLabel: 'Cerrar',
            titlePosition: 'center',
            backgroundColor: 'secondary',
            closeBackdropClick: false,
            panelClass: 'modal-error',
          };
          const dialogRef = this._bottomSheetService.open(ModalErrorComponent, config);
        }
      },
      error: (err: any) => {
        console.log(err);
        // Error al consumir el servicio de validacion de token
        loader.close();
        const config = {
          title: '',
          subtitle: '',
          closeLabel: 'Cerrar',
          titlePosition: 'center',
          backgroundColor: 'secondary',
          closeBackdropClick: false,
          panelClass: 'modal-error',
        };
        const dialogRef = this._bottomSheetService.open(ModalErrorComponent, config);
      }
    });
  }

  differPurchases(){
    setTimeout(() => {
      let counterOffers = 0;
      let counterRequests = 0;
      let date = new Date();
      let months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
        'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      //console.log(this.paymentAnualRateChild, typeof this.paymentAnualRateChild);
      this.store.dispatch(setConfirmPayment({ paymentConfirm : {
          differedPayments : this.selectedPaymentsChild.filter((row : any) => row.offer),
          numPayments : this.selectedPaymentsChild.length,
          month : this.simulatorMonthChild,
          paymentTotalMonth : `${this.paymentTotalMonthChild.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN`,
          paymentTotalRate : `${this.paymentTotalRateChild.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN`,
          paymentAnualRate : this.paymentAnualRateChild,
          paymentMonthRate : this.paymentMonthRateChild,
          paymentTotalAmount : `${this.paymentTotalAmountChild.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN`,
          invoice : Math.floor(Math.random() * 1000000000),
          datetime : `${(date.getDate() < 10) ? '0' + date.getDate() : date.getDate()}/${months[date.getMonth()]}/${date.getFullYear().toString().slice(2)} - ${(date.getHours() < 10) ? '0' + date.getHours() : date.getHours()}:${(date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()}:${(date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()}`
        }}));
      const offersToDiffer: any[] = [];
      this.store.pipe(select(fromPayments.getProcessPaymentConfirm)).subscribe(data => {
        if(!data ){
          data = [];
        }
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
              offersToDiffer.push(data);
            }
          });
        });
      });
      this.differService.performDiffer(offersToDiffer.map(offers => {
        return {buyId: offers.id, offerId: offers.offerIdTest};
      })).subscribe({
        next: (resp: {deferralOffers: {status: number, description: string}[], folio: string}) => {
          const offersSuccess: any[] = [];
          const offersFail: any[] = [];
          resp.deferralOffers.forEach((r: {status: number, description: string}, index) => {
            if( r.status === 1 ){
              offersSuccess.push(offersToDiffer[index]);
            } else {
              offersFail.push(offersToDiffer[index]);
            }
          });
          if (offersFail.length === 0) {
            // Not Errors
            this._showTicket.showTransactionTicket(offersSuccess, this.simulatorMonthChild);
          } else if (offersSuccess.length === 0 && offersFail.length > 0) {
            // Todas Fallaron
            const config = {
              title: '',
              subtitle: '',
              closeLabel: 'Cerrar',
              titlePosition: 'center',
              backgroundColor: 'secondary',
              closeBackdropClick: false,
              panelClass: 'modal-error',
            };
            const dialogRef = this._bottomSheetService.open(ModalNotDiferedComponent, config, offersFail);
          } else {
            // show modal not differed
            const config = {
              title: '',
              subtitle: '',
              closeLabel: 'Cerrar',
              titlePosition: 'center',
              backgroundColor: 'secondary',
              closeBackdropClick: false,
              panelClass: 'modal-error',
            };
            const dialogRef = this._bottomSheetService.open(ModalNotDiferedComponent, config, offersFail);
            this._showTicket.showTransactionTicket(offersSuccess, this.simulatorMonthChild);
          }
        },
        error: () => {
          const config = {
            title: '',
            subtitle: '',
            closeLabel: 'Cerrar',
            titlePosition: 'center',
            backgroundColor: 'secondary',
            closeBackdropClick: false,
            panelClass: 'modal-error',
          };
          const dialogRef = this._bottomSheetService.open(ModalErrorComponent, config);
        }
      });
    }, 1500);
  }


}
