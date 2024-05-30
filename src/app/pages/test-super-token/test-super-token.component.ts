import {Component, NgZone} from '@angular/core';
import {SoftTokenService} from "../common/soft-token.service";
import {ShowTransactionTicketService} from "../common/show-transaction-ticket.service";
import {Router} from "@angular/router";

declare let FinancingSuperMovil: any;
declare let SuperMovil: any;

@Component({
  selector: 'app-test-super-token',
  templateUrl: './test-super-token.component.html',
  styleUrls: ['./test-super-token.component.css']
})
export class TestSuperTokenComponent {

  response: any;
  constructor(
    private _softTokenService: SoftTokenService,
    private _showTicket: ShowTransactionTicketService,
    private router: Router,
    private _ngZone: NgZone
  ) {
    (window as any).superTokenResponse = (resp: any)=> {
      console.log('superTokenResponse: ' ,resp);
      this._ngZone.run(()=> {
        this.response = resp;
      });
    };
    (window as any).nativeTicketResponse = (resp: any)=> {
      console.log('nativeTicketResponse: ' ,resp);
      this._ngZone.run(()=> {
        let respuesta = JSON.parse(resp);
        if(respuesta.params && respuesta.params.userAction !== 'share'){
          this._ngZone.run(() => {
            this.router.navigate(['/testCallBack']);
          });
        }
      });
    };
    (window as any).backButton = (resp: any)=> {
      console.log('backButtonAndroid: ' ,resp);
      this._ngZone.run(()=> {
        this.router.navigate(['/']);
      });
    };
  }

  openToken(){
    this._softTokenService.getSuperToken();
  }

  showTicket(){
    let purchases = [
      {
        "id": 2803,
        "title": "Sams",
        "date": "2023-10-02T06:00:00.000+00:00",
        "amount": 5521.88,
        "offer": true,
        "offerIdTest": 17596,
        "month": "24",
        "type": "MCI",
        "total": 7850.57622,
        "rate": 0.0303,
        "mci": "24"
      },
      {
        "id": 2807,
        "title": "Oxxo",
        "date": "2023-10-02T06:00:00.000+00:00",
        "amount": 2311.88,
        "offer": true,
        "offerIdTest": 17614,
        "month": "24",
        "type": "MCI",
        "total": 3286.8498,
        "rate": 0.0303,
        "mci": "24"
      }
    ];
    this._showTicket.showTransactionTicket(purchases, '24');
  }

  backToSM(){
    SuperMovil.goToPreviousScreen();
  }

}
