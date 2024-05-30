import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private httpClient : HttpClient) { }

  getTermsAndConditions() : Observable<any> {
    //return this.httpClient.get('https://financing-result-eval-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/producerUnit/termsAndConditions');
    //return this.httpClient.get('/api/financing/terms-conditions');
    return this.httpClient.get('/financing/terms-conditions')
    //return this.httpClient.get('/assets/data/terms.json')
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error : HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.ok);
  }
}
