import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { GoogleTagManagerService } from "angular-google-tag-manager";

@Component({
  selector: 'app-modal-ticket',
  templateUrl: './modal-ticket.component.html',
  styleUrls: ['./modal-ticket.component.css']
})
export class ModalTicketComponent implements OnInit, AfterViewInit {
  @Input() ticketDataChild;
  @Input() storageChild;
  @Output() closeApp : EventEmitter<any>;
  @Output() save : EventEmitter<any>;
  @Output() share : EventEmitter<any>;
  transitionModal : boolean;
  paymentAnualRate : number;
  cardImage : string;
  flagCloseInfo : boolean;

  constructor(private cardService : CardService,
    private _gtm: GoogleTagManagerService) {
    this.transitionModal = false;
    this.closeApp = new EventEmitter();
    this.save = new EventEmitter();
    this.share = new EventEmitter();
    this.ticketDataChild = {
      differedPayments : [],
      numPayments : 0,
      month : "0",
      paymentAnualRate : 0,
      paymentMonthRate : 0,
      paymentTotalAmount : 0,
      paymentTotalMonth : 0,
      paymentTotalRate : 0,
      invoice : 0,
      datetime : ""
    };
    this.storageChild = {
      cardName : sessionStorage.getItem('cardName'),
      cardNumber : sessionStorage.getItem('cardNumber'),
      cardType : sessionStorage.getItem('cardType'),
      codStamp : sessionStorage.getItem('codStamp')
    };
    this.paymentAnualRate = 0.0;
    this.cardImage = '';
    this.flagCloseInfo = true;
  }

  ngOnInit(): void {
    this.cardImage = this.cardService.getImageCard(this.storageChild.codStamp);
    this.paymentAnualRate = Number(this.ticketDataChild.paymentAnualRate);
    //console.log(this.paymentAnualRate, typeof this.paymentAnualRate);
    setTimeout(() => this.transitionModal = true, 500);
  }

  closeInfo() : void {
    this.flagCloseInfo = false;
  }

  ngAfterViewInit(): void {
    this._gtm.pushTag({
      tipoSitio: 'Publico',
      idiomaPagina: 'Espanol',
      canalBanco: 'Supermovil',
      section: 'comprobante',
      titulo: 'comprobante',
      url: 'financing/disponibles-a-diferir/comprobante',
      buc_id: sessionStorage.getItem('buc'),
      plan: '',
      proceso: '',
      anio: '',
      tipoDispositivo: '',
      versionApp: '1.0.0',
      marca_dispositivo: '',
      sistema_operativo: '',
      entorno: '',
      event: 'pageView',
    });
  }

  shareAndTag(share: any){
      share.emit()
      this._gtm.pushTag({
      event: 'interaccion',
      categoria: 'financing',
      accion: 'comprobante',
      etiqueta: 'Compartir',
      canalBanco: 'Supermovil',
      buc_id: sessionStorage.getItem('buc'),
    });
  }
}
