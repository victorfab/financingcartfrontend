import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BranchioService {

  constructor(
    private httpClient: HttpClient
  ) { }

  sendData(data: any){
    const url = 'https://api2.branch.io/v2/event/custom';
    this.httpClient.post(url, data);
  }
}
