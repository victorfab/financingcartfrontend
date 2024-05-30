import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DifferService {

  constructor(private httpClient : HttpClient) { }

  performDiffer(body: {buyId: number, offerId: number}[]) : Observable<any> {
    //return this.httpClient.post(`https://financing-service-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/financing/deferralOffers`, offers).pipe(
    // return this.httpClient.post(`/financing/differOffer?buyId=${id}&offerId=${offerId}`).pipe(
    return this.httpClient.post(`/financing/deferralOffers`, body, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error : HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.ok);
  }
}
