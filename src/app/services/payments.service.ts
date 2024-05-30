import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private httpClient : HttpClient) {
  }

  getPaymentsToDiffer() : Observable<any> {
    let buc = (sessionStorage.getItem('buc')) ? sessionStorage.getItem('buc') : '';
    let numContrato = (sessionStorage.getItem('numContrato')) ? sessionStorage.getItem('numContrato') : '';
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getOffers?buc=53H649a035D789032i');
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getOffers?buc=53H649a035D7894567e');
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getOffers?buc=53H649a035D7893768a');
    /*return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getOffers?buc=53H649a035D78983562d').pipe(
      catchError(this.handleError)
    );*/
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getOffers?buc=53H649a035D78981608c').pipe(
    //return this.httpClient.get(`/api/financing/offers?buc=${buc}`, { withCredentials : true }).pipe(
    //return this.httpClient.get(`https://financing-security-mx-financing-web-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/financing/offers?buc=${buc}`, { withCredentials : true }).pipe(
    /*return this.httpClient.get(`/financing/offers?buc=${buc}`, { withCredentials : true }).pipe(
      catchError(this.handleError)
    );*/
    let body = {
      "numContrato": numContrato,
    };
    return this.httpClient.post(`/financing/offers`, body).pipe(
      catchError(this.handleError)
    );
    /*return this.httpClient.get('/assets/data/payments.json').pipe(
      catchError(this.handleError)
    );*/
  }

  handleError(error : HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.ok);
  }
}
