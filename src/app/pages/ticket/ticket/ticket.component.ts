import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromPayments from 'src/app/ngrx/selectors/payments.selector';
import { CardService } from 'src/app/services/card.service';
import { FontService } from 'src/app/services/font.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketData;
  ticketWidth : number;
  ticketHeight : number;
  img : any;
  cardImage : any;
  fontFace : any;
  getBaseSH : any;
  getBaseST : any;
  paymentAnualRate : number;

  storage : {
    cardName : string | null,
    cardNumber : string | null,
    cardType : string | null,
    codStamp : string | null
  };

  constructor(private store : Store<any>, private router : Router,
    private fontService : FontService, private cardService : CardService) {
    this.ticketWidth = window.innerWidth;
    this.ticketHeight = 780;
    this.ticketData = {
      differedPayments : [],
      numPayments : 0,
      month : "0",
      paymentAnualRate : 0,
      paymentMonthRate : 0,
      paymentTotalAmount : 0,
      paymentTotalMonth : 0,
      paymentTotalRate : 0,
      invoice : 0,
      datetime : ""
    };
    this.paymentAnualRate = 0.0;

    this.storage = {
      cardName : sessionStorage.getItem('cardName'),
      cardNumber : sessionStorage.getItem('cardNumber'),
      cardType : sessionStorage.getItem('cardType'),
      codStamp : sessionStorage.getItem('codStamp')
    }

    this.img = document.createElement('img');
    this.fontService.uploadFont('assets/data/santanderHeadline.txt').subscribe(data => {
      if (data) this.getBaseSH = data;
    });
    this.fontService.uploadFont('assets/data/santanderText.txt').subscribe(data => {
      if (data) this.getBaseST = data;
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.store.pipe(select(fromPayments.getProcessConfirm)).subscribe((data : any) => {
      console.log(data);
      if (data) {
        this.ticketData = data;
        this.paymentAnualRate = Number(this.ticketData.paymentAnualRate);
        this.ticketHeight = this.ticketHeight + (this.ticketData.differedPayments.length * 54);

        let paymentsList = '';

        for (let row of this.ticketData.differedPayments) {
          paymentsList += '<div class="modal-operation-row">';
          paymentsList += '<div class="modal-operation-title">Compra </div>';
          paymentsList += '<div class="modal-operation-data">' + row['title'] + '</div>';
          paymentsList += '</div>';
        }

        this.convertImage(this.cardService.getImageCard(this.storage.codStamp), (cardIcon : any) => {
          //console.log(cardIcon);
          this.cardImage = cardIcon;
          //console.log(this.cardImage);
          //console.log(this.getBaseSH);
          this.convertImage('/assets/images/logo-mini-icon.png', (logoIcon : any) => {
            this.img.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="${this.ticketWidth}" height="${this.ticketHeight}">
              <defs>
                <style type="text/css">
                @font-face {
                  font-family: 'Santander Headline';
                  src: url(data:application/x-font-woff;charset=utf-8;base64,${this.getBaseSH}) format('woff');
                }
                @font-face {
                  font-family: 'Santander Text';
                  src: url(data:application/x-font-woff;charset=utf-8;base64,${this.getBaseST}) format('woff');
                }
                .modal {
                  background-color: #fff;
                  background-image: url("${logoIcon}");
                  background-repeat: no-repeat;
                  background-position: 1.7em 1.8em;
                  padding: 1.5em 0;
                  width: 100%;
                }
                .modal-title h3 {
                  font-family: 'Santander Headline', Arial, Helvetica, sans-serif;;
                  font-weight: 700;
                  font-size: 20px;
                  color: #191919;
                  padding-bottom: 0.9em;
                  margin: 0 0 0 1em;
                }
                .modal-head {
                    text-align: center;
                    padding: 0 1.5em;
                }
                .modal-status p {
                    font-family: 'Santander Text', Arial, Helvetica, sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    color: #4c4c4c;
                }
                .modal-status span {
                    font-weight: 700;
                    display: block;
                }
                .modal-card {
                    padding-bottom: 2.1em;
                }
                .modal-card-image {
                  margin: 1em auto 0.5em;
                  width: 64px;
                  height: 64px;
                  background: #f2f2f2;
                  border-radius: 50px;
                }
                .modal-card-image img {
                    margin-top: 0.5em;
                    width: 30px;
                }
                .modal-card-name {
                    font-family: 'Santander Text', Arial, Helvetica, sans-serif;
                    font-weight: 700;
                    font-size: 14px;
                    color: #191919;
                }
                .modal-card-number {
                    font-family: 'Santander Text', Arial, Helvetica, sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    color: #595959;
                }
                .modal-operation {
                  padding: 0.6em 1.5em;
                  border-top: 2px dashed #D9D9D9;
                  border-bottom: 2px dashed #D9D9D9;
                }
                .modal-operation-row {
                    width: 100%;
                    display: flex;
                }
                .modal-operation-title, .modal-operation-data {
                    width: 50%;
                    font-family: 'Santander Text', Arial, Helvetica, sans-serif;
                    font-weight: 400;
                    font-size: 14px;
                    padding: 1.2em 0;
                    color: #000;
                }
                .modal-operation-data {
                    text-align: right;
                }
                </style>
              </defs>
              <foreignObject width="${this.ticketWidth}" height="${this.ticketHeight}">
                  <div xmlns="http://www.w3.org/1999/xhtml">
                    <div class="modal">
                        <div class="modal-head">
                            <div class="modal-title">
                                <h3>Comprobante</h3>
                            </div>
                            <div class="modal-status">
                                <p>Diferiste ${this.ticketData.paymentTotalAmount} a <br><span>${this.ticketData.month} meses ${(this.ticketData.paymentAnualRate === 0) ? 'sin' : 'con' } intereses</span></p>
                            </div>
                            <div class="modal-card">
                                <div class="modal-card-image">
                                    <img src="${this.cardImage}" />
                                </div>
                                <div class="modal-card-name">${this.storage.cardName}</div>
                                <div class="modal-card-number">${this.storage.cardType}  ${this.storage.cardNumber}</div>
                            </div>
                        </div>
                        <div class="modal-operation">
                          <div class="modal-operation-row">
                              <div class="modal-operation-title">Fecha y hora de operación</div>
                              <div class="modal-operation-data">${this.ticketData.datetime}</div>
                          </div>
                          <div class="modal-operation-row">
                              <div class="modal-operation-title">Ref. Super Móvil</div>
                              <div class="modal-operation-data">${this.ticketData.invoice}</div>
                          </div>
                          <div class="modal-operation-row">
                              <div class="modal-operation-title">Tasa de interés anual</div>
                              <div class="modal-operation-data">${this.ticketData.paymentAnualRate}%</div>
                          </div>
                          <div class="modal-operation-row">
                              <div class="modal-operation-title">Tasa de interés mensual</div>
                              <div class="modal-operation-data">${this.ticketData.paymentMonthRate}%</div>
                          </div>
                          <div class="modal-operation-row">
                              <div class="modal-operation-title">${(this.paymentAnualRate === 0) ? 'Total a pagar sin intereses' : 'Total a pagar con' }<br/>${(this.paymentAnualRate === 0) ? '' : 'intereses e IVA incluidos' }</div>
                              <div class="modal-operation-data">${this.ticketData.paymentTotalRate}</div>
                          </div>
                          <div class="modal-operation-row">
                              <div class="modal-operation-title">${(this.paymentAnualRate === 0) ? 'Pago mensual sin intereses' : 'Pago mensual con' }<br/>${ (this.paymentAnualRate === 0) ? '' : 'intereses e IVA incluidos' }</div>
                              <div class="modal-operation-data">${this.ticketData.paymentTotalMonth}</div>
                          </div>
                          ${paymentsList}
                          <!--<div class="modal-operation-row">
                              <div class="modal-operation-title">${this.ticketData.numPayments} ${(this.ticketData.numPayments === 1) ? 'compra diferida a' : 'compras diferidas a' }</div>
                              <div class="modal-operation-data">${this.ticketData.month} ${(this.paymentAnualRate === 0) ? 'MSI' : 'MCI'}</div>
                          </div>-->
                      </div>
                    </div>
                  </div>
              </foreignObject>
            </svg>
          `);
          });
        });
      }
    });
  }

  convertImage(urlImage : any, callback : any) {
    let img = new Image();
    img.onload = function() {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx?.drawImage(img, 0, 0);
      //console.log(canvas.toDataURL());
      callback(canvas.toDataURL());
    }
    img.src = urlImage;
  }

  saveTicket() : void {
    //console.log(this.ticket);
    console.log(this.img.width, this.img.height);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    ctx?.drawImage(this.img, 0, 0, canvas.width, canvas.height);
    let link = document.createElement('a');
    link.download = 'ticket.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  shareTicket() : void {
    try {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = this.img.width;
      canvas.height = this.img.height;
      ctx?.drawImage(this.img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob : any) => {
        let file =  new File([blob], 'ticket.png', { type: 'image/png' });
        navigator.share({
          files: [file],
          title: "Santander",
          text: "Ticket prueba!!"
        });
      }, 'image/png');
    } catch (error) {
      console.log(error);
    }
  }

  close() : void {
    this.router.navigate(['/']);
  }
}
