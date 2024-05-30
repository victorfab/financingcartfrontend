import { Injectable } from '@angular/core';
declare let FinancingSuperMovil: any;
@Injectable({
  providedIn: 'root'
})
export class ShowTransactionTicketService {

  constructor() { }

  showTransactionTicket(purchasesDeferred: any[], months: any) {
    let content:{
      totalDeferred:number,
      monthsToBeDeferred: number,
      dateTime: string,
      superMovilReference: number,
      monthlyInterest: number,
      yearlyInterest: number,
      totalToPay: number,
      monthlyPayment: number,
      transactions: string[]
    } = {
      totalDeferred:0,
      monthsToBeDeferred: months,
      dateTime: new Date().toISOString(),
      superMovilReference: Math.floor(Math.random() * 1000000000),
      monthlyInterest: 0,
      yearlyInterest: 0,
      totalToPay: 0,
      monthlyPayment: 0,
      transactions: []
    };
    purchasesDeferred.forEach((purch:
     {
       amount:number,
       date: string,
       id:number,
       mci:string,
       month: string,
       offer: boolean,
       offerIdTest: number,
       rate: number,
       title: string,
       total: number,
       type: string,
     }) => {
      content.totalDeferred += purch.amount;
      content.transactions.push(purch.title);
      content.monthlyInterest += purch.rate;
      content.yearlyInterest += purch.rate;
      content.totalToPay += purch.total;
    });
    content.monthlyInterest = Number(((content.monthlyInterest / purchasesDeferred.length) * 100).toFixed(2));
    content.yearlyInterest = Number(((content.monthlyInterest) * 12).toFixed(2));
    content.totalDeferred = Number(content.totalDeferred.toFixed(2));
    content.totalToPay = Number(content.totalToPay.toFixed(2));
    content.monthlyPayment = Number((content.totalToPay / months).toFixed(2));

    let ticketContent: {
      totalDeferred:string,
      monthsToBeDeferred: string,
      dateTime: string,
      superMovilReference: string,
      monthlyInterest: string,
      yearlyInterest: string,
      totalToPay: string,
      monthlyPayment: string,
      transactions: string[]
    } = {
      totalDeferred:content.totalDeferred.toString(),
      monthsToBeDeferred: content.monthsToBeDeferred.toString(),
      dateTime: content.dateTime,
      superMovilReference: content.superMovilReference.toString(),
      monthlyInterest: content.monthlyInterest.toString(),
      yearlyInterest: content.yearlyInterest.toString(),
      totalToPay: content.totalToPay.toString(),
      monthlyPayment: content.monthlyPayment.toString(),
      transactions: content.transactions
    };

    const params={
      name: 'showTransactionTicket',
      parameters: {"ticketContent": ticketContent},
      callbackName: 'nativeTicketResponse'
    };
    console.log('showTransactionTicket', JSON.stringify(params));
    if(typeof FinancingSuperMovil !== 'undefined'){
      // Flujo Android
      FinancingSuperMovil.showTransactionTicket(JSON.stringify(params));
    } else if((window as any).webkit !== undefined && (window as any).webkit.messageHandlers.FinancingSuperMovil !== undefined) {
      // Flujo IOS
      (window as any).webkit.messageHandlers.FinancingSuperMovil.postMessage(JSON.stringify(params));
    }
  }
}
