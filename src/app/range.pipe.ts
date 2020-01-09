import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {
  public static range(offset: number, length: number): number[] {
    if (!length) {
      return [];
    }
    const array = [];
    for (let n = 0; n < length; ++n) {
      array.push(offset + n);
    }
    return array;
  }

  transform(value: number, start: number = 0): number[] {
    return RangePipe.range(start, value);
  }
}
