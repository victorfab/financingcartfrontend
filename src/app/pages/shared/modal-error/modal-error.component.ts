import { Component, Input } from '@angular/core';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import {ModalService} from "../../common/modal.service";

declare var superMovil : any;

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent {

  constructor(
    private _modalService: ModalService,
    private _gtm: GoogleTagManagerService) {
  }

  close() {
    this._modalService.close();
    superMovil.goToPreviousScreen();
  }
}
