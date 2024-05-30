import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountPayment'
})
export class AmountPaymentPipe implements PipeTransform {

  transform(value: number): string {
    return `${value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`;
  }

}
