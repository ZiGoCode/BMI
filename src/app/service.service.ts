import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  compute(w: number, h: number, bmi: number) {

    console.log('o', w)
    const cm = h * h;
    var nw = w;
    var check = true;
    var check1 = true;
    var newBMI: number;
    if (bmi < 18.5) {
      while (check == true) {
        w += 1;
        var bmi1 = w / cm;
        if (bmi1 > 18.5) {
          check = false;
        }
        var wight = w;
      }
      newBMI = wight - nw;
    } else if (bmi > 23.0) {
      while (check1 == true) {
        w -= 1;
        var bmi2 = w / cm;
        if (bmi2 <= 22.9) {
          check1 = false;
        }
        var wight1 = w;
      }
      newBMI = wight1 - nw;
    } else return;
    return newBMI;
  }
}
