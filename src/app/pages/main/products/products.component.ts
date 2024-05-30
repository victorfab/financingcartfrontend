import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

//declare var superMovil : any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private sessionService : SessionService,
              private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('buc')) {
      this.route.queryParamMap.subscribe(params => {
        let token = params.get('token');
        if (token !== null) {
          //console.log(token);
          this.sessionService.generateSession(token)
              .subscribe((data : any) => {
                if (data) {
                  //console.log(data);
                  sessionStorage.setItem('buc', data.SecObjRec.SecObjInfoBean.SecObjData[0].SecObjDataValue);
                  sessionStorage.setItem('cardNumber', data.SecObjRec.SecObjInfoBean.SecObjData[1].SecObjDataValue);
                  sessionStorage.setItem('cardType', data.SecObjRec.SecObjInfoBean.SecObjData[2].SecObjDataValue);
                  sessionStorage.setItem('codStamp', data.SecObjRec.SecObjInfoBean.SecObjData[3].SecObjDataValue);
                  sessionStorage.setItem('cardName', data.SecObjRec.SecObjInfoBean.SecObjData[4].SecObjDataValue);
                  sessionStorage.setItem('numContrato', data.SecObjRec.SecObjInfoBean.SecObjData[5].SecObjDataValue);
                }
              });
        }
      });
    }
  }

}
