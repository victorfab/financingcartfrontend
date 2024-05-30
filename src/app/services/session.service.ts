import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient : HttpClient) { }

  generateSession(token : string) {
    //https://financing-security-mx-financing-web-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp
    //https://financing-security-mx-financing-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp
      return this.httpClient.post('/api/session', null, {
    //return this.httpClient.post('/api/api/session', null, {
      headers: new HttpHeaders({ 'Authorization': token })
    }).pipe(catchError(this.handleError));
  }

  handleError(error : HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.ok);
  }
}
