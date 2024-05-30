import {Component, Input} from '@angular/core';
import {GoogleTagManagerService} from "angular-google-tag-manager";
declare var superMovil : any;
@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.css']
})
export class ModalTestComponent {
  @Input() modalError : boolean;
  labelTest : string = 'Lo sentimos';

  constructor(private _gtm: GoogleTagManagerService) {
    this.modalError = false;
  }

  goToPreviousScreen() : void {
    this.labelTest = superMovil.goToPreviousScreen();
  }

  showConnectionError() : void {
    this.labelTest = superMovil.showConnectionError();
    this._gtm.pushTag({
      categoria: 'error',
      accion: 'error',
      etiqueta: 'tu-compra-no-pudo-ser-diferida-por-favor-intentalo-mas-tarde',
      canalBanco: 'Supermovil'
    });
  }


  showTransactionTicket() : void {
    this.labelTest = superMovil.showTransactionTicket();
  }
}
