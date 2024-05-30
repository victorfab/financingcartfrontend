import {Injectable} from '@angular/core';

declare let FinancingSuperMovil: any;

@Injectable({
  providedIn: 'root'
})
export class SoftTokenService {

  promise: any;
  params: any = {
    "name": "superToken",
    "parameters": null,
    "callbackName": "superTokenResponse"
  };
  constructor() {}

  getSuperToken() {
    if(typeof FinancingSuperMovil !== 'undefined'){
      // Flujo Android
      this.promise = FinancingSuperMovil.superToken(JSON.stringify(this.params));
    }
    else if( (window as any).webkit !== undefined && (window as any).webkit.messageHandlers.FinancingSuperMovil !== undefined ){
      // Flujo IOS
      this.getTokenManager();
    }
  }

  getTokenManager() {
    let financingSM = (window as any).webkit.messageHandlers.FinancingSuperMovil;
    this.promise = financingSM.postMessage(JSON.stringify(this.params));
  }

}
