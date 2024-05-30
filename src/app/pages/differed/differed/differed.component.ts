import {Component, NgZone, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DifferedPaymentsService } from 'src/app/services/differed.payments.service';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import {DeviceDetectorService} from "ngx-device-detector";
import {FlameLoaderService} from "@ngx-mxflame/atoms/loader-overlay";
import {ModalErrorComponent} from "../../shared/modal-error/modal-error.component";
import {ModalService} from "../../common/modal.service";
import {Location} from "@angular/common";
declare var superMovil : any;
@Component({
  selector: 'app-differed',
  templateUrl: './differed.component.html',
  styleUrls: ['./differed.component.css']
})
export class DifferedComponent implements OnInit {
  currentLastLocation : string;
  currentTitleName : string;
  differed : Array<any>;
  getData : any;
  id : string | null;

  constructor(private route : ActivatedRoute,
              private differedPaymentsService : DifferedPaymentsService,
              private _gtm: GoogleTagManagerService,
              private _device: DeviceDetectorService,
              private _modalErrorService: ModalService,
              private _loader: FlameLoaderService,
              private _ngZone: NgZone,
              private _location: Location
              ) {
    (window as any).backButton = (resp: any) => {
      this._ngZone.run(() => {
        this._location.back();
      });
    };
    this.id = this.route.snapshot.paramMap.get('id');
    this.currentLastLocation = '/';
    this.currentTitleName = 'Tu compra diferida';
    this.differed = [];
    this.getData = {};
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const loader = this._loader.open();
    this.differedPaymentsService.getDifferedPayments()
      .subscribe({
        next: data => {
          this.getData = this.reGroup(data, this.id);
          let amount = `${this.getData.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN`;
          let offerType = this.getData.type;
          let anualRate = (this.getData.rate) ? `${((this.getData.rate * 12) * 100).toFixed(2)}%` : '0.0%';
          let monthRate = (this.getData.rate) ? `${((this.getData.rate * 1) * 100).toFixed(2)}%` : '0.0%';
          let months = `${this.getData.months} meses`;
          let charge = `$${(this.getData.amount / this.getData.months).toFixed(2)} MXN`;
          if (offerType === 'MCI') {
            //amount = `${parseFloat(this.getData.totalAmount).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN`;
            charge = `$${(parseFloat(this.getData.totalAmount) / this.getData.months).toFixed(2)} MXN`;
          }
          this.differed = [
            { title: 'Monto de compra', value: amount },
            { title: 'Tasa de interés anual', value: anualRate },
            { title: 'Tasa de interés mensual', value: monthRate },
            //{ title: 'Saldo restante de tu plan de pago', value: '$401.01 MXN' },
            { title: 'Plazo', value: months },
            //{ title: 'Cargos realizados', value: '03 de 06' },
            { title: 'Pago mensual', value: charge }
          ];
          this.tagDeferred(anualRate, monthRate, months);
          loader.close();
        },
        error: err => {
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
        },
      });
  }

  reGroup = (endpoint : Array<any>, id : string | null) : any => {
    let obj = {};
    let list = endpoint.map(row => row);
    list.map(row => row.ofertas.filter((data : any) => {
      if (data.id === Number(id)) {
        obj = {...obj,
          amount: row.montoCompra,
          months: data.noMeses,
          type: data.tipo,
          rate: data.interesMensual,
          totalAmount: data.totalPago
        };
      }
    }));
    return obj;
  }

  tagDeferred(anualRate: string, monthRate: string, months: string) {
    this._gtm.pushTag({
      tipoSitio: 'Publico',
      idiomaPagina: 'Espanol',
      canalBanco: 'Supermovil',
      section: 'historial-de-diferidas',
      titulo: 'tu-compra-diferida',
      url: 'financing/historial-de-diferidas/detalles',
      buc_id: sessionStorage.getItem('buc'),
      plan: `${months.replaceAll(" ", "_")}`,
      proceso: monthRate,
      anio: anualRate,
      tipoDispositivo: this._device.deviceType,
      versionApp: '1.0.0',
      marca_dispositivo: this._device.device,
      sistema_operativo: this._device.os,
      entorno: 'DEV',
      event: 'pageView',
    });
  }

}


