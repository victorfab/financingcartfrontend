import { Injectable } from '@angular/core';
import {FlameBottomSheetService} from "@ngx-mxflame/atoms/bottom-sheet";
import {FlameCustomDialog} from "@ngx-mxflame/atoms/dialog-web";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  bottomSheetRef: any;
  inputData: any;
  constructor(
    private _bottomSheetService: FlameBottomSheetService
  ) { }

  open(component: any, config: any, inputData?: any) {
    this.inputData = inputData;
    this.bottomSheetRef = this._bottomSheetService.open(component, config);
    return this.bottomSheetRef;
  }

  close() {
    this.bottomSheetRef.close();
  }
}
