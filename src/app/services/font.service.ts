import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  constructor(private httpClient : HttpClient) { }

  uploadFont(url : string) : Observable<any> {
    return this.httpClient.get(url, { 
      responseType : 'text'
    });
  }
}
