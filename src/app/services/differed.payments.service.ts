import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DifferedPaymentsService {

  constructor(private httpClient : HttpClient) {
  }

  getDifferedPayments() : Observable<any> {
    let buc = (sessionStorage.getItem('buc')) ? sessionStorage.getItem('buc') : '';
    let numContrato = (sessionStorage.getItem('numContrato')) ? sessionStorage.getItem('numContrato') : '';
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getDeferredOffers?buc=53H649a035D789032i');
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getDeferredOffers?buc=53H649a035D7894567e');
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getDeferredOffers?buc=53H649a035D7893768a');
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getDeferredOffers?buc=53H649a035D78983562d');
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/getDeferredOffers?buc=53H649a035D78981608c');
    //return this.httpClient.get(`/api/financing/deferredOffers?buc=${buc}`, { withCredentials : true }).pipe(
    /*return this.httpClient.get(`/financing/deferredOffers?buc=${buc}`, { withCredentials : true }).pipe(
      catchError(this.handleError)
    );*/
    let body = {
      "numContrato": numContrato,
    };
    return this.httpClient.post(`/financing/deferredOffers`, body).pipe(
      catchError(this.handleError)
    );
    /*return this.httpClient.get('/assets/data/differed.json').pipe(
      catchError(this.handleError)
    );*/
  }

  handleError(error : HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.ok);
  }
}
