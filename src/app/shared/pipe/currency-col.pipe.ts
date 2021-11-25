import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCOP'
})
export class CurrencyColPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe){

  }

  

  transform(value: number): string {
    return  this.currencyPipe.transform(value, 'COP', 'symbol', '1.0-0');
  }

}
