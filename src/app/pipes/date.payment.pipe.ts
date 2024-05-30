import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePayment'
})
export class DatePaymentPipe implements PipeTransform {

  transform(value: string): string {
    let listOfMonths = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    let day = new Date(value).getDate();
    let month = listOfMonths[new Date(value).getMonth()];
    let year = new Date(value).getFullYear();
    return `${day}/${month}/${year}`;
  }

}
