import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstMayus'
})
export class FirstMayusPipe implements PipeTransform {

  transform(texto: string): string {
    return texto[0].toUpperCase() + texto.substr(1).toLowerCase();
  }

}
