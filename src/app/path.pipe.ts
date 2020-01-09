import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {
  transform(value: { shape: string, w: number, h: number }, args: { grid: number, inset: number }): string {
    const {shape, w, h} = value;
    const {grid, inset} = args;
    const gw = w * grid;
    const gh = h * grid;
    switch (shape) {
      case 'rect': {
        return `
          M ${inset},${inset}
          L ${gw - inset},${inset}
          L ${gw - inset},${gh - inset}
          L ${inset},${gh - inset}
          Z
        `;
      }

      case 'slice': {
        return `
          M ${inset},${gh - inset}
          A ${gw - inset},${gh - inset},0,0,1,${gw - inset},${inset}
          L ${+(gw - inset)},${gh - inset}
          Z
        `;
      }

      case 'curve': {
        return `
          M ${inset},${gh - inset}
          A ${gw - inset},${gh - inset},0,0,1,${gw - inset},${inset}
          L ${gw - inset},${grid - inset}
          A ${gw - grid + inset},${gh - grid + inset},0,0,0,${grid - inset},${gh - inset}
          Z
        `;
      }
    }
    return '';
  }
}
