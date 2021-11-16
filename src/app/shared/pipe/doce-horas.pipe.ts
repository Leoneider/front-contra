import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'doceHoras'
})
export class DoceHorasPipe implements PipeTransform {

  transform(horaMilitar: number): string {
    let horaEstandar = horaMilitar;
    let periodo =  horaMilitar == 12 ? "M" : "AM" 
 
    if(horaMilitar > 12){
      horaEstandar = horaMilitar - 12
      periodo = "PM"
    }

    return `${horaEstandar} ${periodo}`;
  }

}
