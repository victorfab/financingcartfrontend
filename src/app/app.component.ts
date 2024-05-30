import { Component } from '@angular/core';
import { GoogleTagManagerService } from "angular-google-tag-manager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financing-cart';
  constructor(
    private _gtmService: GoogleTagManagerService
  ) {
    _gtmService.addGtmToDom();
  }
}
