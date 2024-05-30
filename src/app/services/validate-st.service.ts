import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ValidateSTService {

  constructor(
    private http: HttpClient
  ) { }

  validateST(otp: string){
    return this.http.post('/api/validateTokenManager', {otp}, {withCredentials: true});
  }

}
