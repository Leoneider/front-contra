import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCOP'
})
export class CurrencyColPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString();
  }

}
