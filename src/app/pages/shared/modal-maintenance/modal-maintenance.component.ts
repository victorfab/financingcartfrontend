import { Component } from '@angular/core';
import {ModalService} from "../../common/modal.service";

declare var superMovil : any;

@Component({
  selector: 'app-modal-maintenance',
  templateUrl: './modal-maintenance.component.html',
  styleUrls: ['./modal-maintenance.component.css']
})
export class ModalMaintenanceComponent {

  constructor(
    private _modalService: ModalService,
  ) {
  }

  close() {
    this._modalService.close();
    superMovil.goToPreviousScreen();
  }
}
