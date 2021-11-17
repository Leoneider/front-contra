import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCol'
})
export class CurrencyColPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString();
  }

}
