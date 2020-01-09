import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'min'
})
export class MinPipe implements PipeTransform {
  transform(value: number[] | undefined): number | undefined {
    if (!value || !value.length) {
      return undefined;
    }
    let min = value[0];
    for (let n = 1; n < value.length; ++n) {
      const element = value[n];
      if (element < min) {
        min = element;
      }
    }
    return min;
  }
}
