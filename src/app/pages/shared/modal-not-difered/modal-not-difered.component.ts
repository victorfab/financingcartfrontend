import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalService} from "../../common/modal.service";

@Component({
  selector: 'app-modal-not-difered',
  templateUrl: './modal-not-difered.component.html',
  styleUrls: ['./modal-not-difered.component.css']
})
export class ModalNotDiferedComponent implements OnInit {

  purchases:any[] = [];

  message: string = '';
  constructor(
    private _modalService: ModalService,
  ) {
  }

  ngOnInit() {
    this.purchases = this._modalService.inputData;
    console.log(this.purchases);
    this.message = this.getNames();
  }

  getNames(){
    if(this.purchases.length > 1){
      const purchs = [...this.purchases];
      const endPurchase = purchs.pop();
      return purchs.map(p => p.title).join(', ') + ' y ' + endPurchase!.title;
    } else {
      return this.purchases[0].title;
    }
  }

  getAmount(){
    let amount = 0;
    this.purchases.forEach(( store )=> {
      amount += store.total;
    });
    return amount;
  }

  close() {
    this.purchases = [];
    this._modalService.inputData = null;
    this._modalService.close();
  }

}
