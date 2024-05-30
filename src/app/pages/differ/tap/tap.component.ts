import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setFlagPayment } from 'src/app/ngrx/actions/payment.action';
import * as fromPayments from 'src/app/ngrx/selectors/payments.selector';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import {Router} from "@angular/router";
import {FlameLoaderService} from "@ngx-mxflame/atoms/loader-overlay";
import {DeviceDetectorService} from "ngx-device-detector";

declare var superMovil : any;

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.css']
})
export class TapComponent implements OnInit {
  flagTap : boolean;
  @Input() group24msiChild : Array<any>;
  @Input() group24mciChild : Array<any>;
  @Input() group18msiChild : Array<any>;
  @Input() group18mciChild : Array<any>;
  @Input() group12msiChild : Array<any>;
  @Input() group12mciChild : Array<any>;
  @Input() group9msiChild : Array<any>;
  @Input() group9mciChild : Array<any>;
  @Input() group6msiChild : Array<any>;
  @Input() group6mciChild : Array<any>;
  @Input() group3msiChild : Array<any>;
  @Input() group3mciChild : Array<any>;
  @Input() differedMciChild : Array<any>;
  @Input() differedMsiChild : Array<any>;
  @Input() btnContinueChild : boolean;
  @Input() counterAvailableChild : {
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
  @Input() counterDisplayChild : {
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
  @Input() generalCounterChild : number;
  @Output() radioClick : EventEmitter<any> = new EventEmitter<any>;
  @Output() allClick : EventEmitter<any> = new EventEmitter<any>;
  @Output() testDiffered: EventEmitter<any> = new EventEmitter<any>;
  @Output() notAllClick: EventEmitter<any> = new EventEmitter;

  constructor(
    private store : Store<any>,
    private _gtm: GoogleTagManagerService,
    private _loader: FlameLoaderService,
    private _router: Router,
    private _device:DeviceDetectorService,
    private _ngZone: NgZone
    ) {
    (window as any).backButton = (resp: any) => {
      this._ngZone.run(() => {
        if ( !this.flagTap ) {
          this.flagTap = true;
        } else {
            superMovil.goToPreviousScreen();
        }
      });
    };
    this.flagTap = true;
    this.group24msiChild = [];
    this.group24mciChild = [];
    this.group18msiChild = [];
    this.group18mciChild = [];
    this.group12msiChild = [];
    this.group12mciChild = [];
    this.group9msiChild = [];
    this.group9mciChild = [];
    this.group6msiChild = [];
    this.group6mciChild = [];
    this.group3msiChild = [];
    this.group3mciChild = [];
    this.differedMsiChild = [];
    this.differedMciChild = [];
    this.btnContinueChild = false;
    this.counterAvailableChild = {
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
    this.counterDisplayChild = {
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
    this.generalCounterChild = 0;
  }

  ngOnInit(): void {
    this.store.pipe(select(fromPayments.getFlagPayments)).subscribe(
      flag => this.flagTap = flag
    );
  }

  toDiffer() {
    this.flagTap = true;
    this.store.dispatch(setFlagPayment({ flag: this.flagTap }));
    this._gtm.pushTag({
      event: 'interaccion',
      categoria: 'financing',
      accion: 'disponibles_a_diferir',
      etiqueta: 'disponibles_a_diferir',
      canalBanco: 'Supermovil',
      buc_id: sessionStorage.getItem('buc'),
    });
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
      event: 'pageView'
    });
  }

  differed() {
    this.flagTap = false;
    this.store.dispatch(setFlagPayment({ flag: this.flagTap }));
    this._gtm.pushTag({
      event: 'interaccion',
      categoria: 'financing',
      accion: 'historial_de_diferidas',
      etiqueta: 'historial_de_diferidas',
      canalBanco: 'Supermovil',
      buc_id: sessionStorage.getItem('buc'),
    });
    this._gtm.pushTag({
      tipoSitio: 'Publico',
      idiomaPagina: 'Espanol',
      canalBanco: 'Supermovil',
      section: 'historial_de_diferidas',
      titulo: 'historial_de_diferidas',
      url: 'financing/historial-de-diferida',
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

  async differAndTag(){
    const loaderRef = this._loader.open();
    await this._gtm.pushTag({
      event: 'interaccion',
      categoria: 'financing',
      accion: 'disponible_a_diferir',
      etiqueta: 'continuar',
      canalBanco: 'Supermovil',
      buc_id: sessionStorage.getItem('buc'),
      plan: '24_meses',
    });
    loaderRef.close();
    this.testDiffered.emit();
    this._router.navigate(['/products/simulator']);
  }

}
