import {Component, OnInit} from '@angular/core';
import {RangePipe} from './range.pipe';

type TileType = 'floor' | 'wall' | 'door';
type TileTemplateCode = 'E' | 'U' | 'A' | 'BA' | 'Q' | 'IA' | 'F' | 'G';

interface Tile {
  x: number;
  y: number;
  r: number;
  type: TileType;
  template: TileTemplateCode;
}

interface TileTemplateModel {
  shape: 'rect' | 'slice' | 'curve';
  w: number;
  h: number;
  cw: number;
  ch: number;
  clips?: { x: number, y: number, r: number }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  grid: number = 32;
  sizeX: number = 26;
  sizeY: number = 32;
  showBackgroundGrid: boolean = true;

  listing: Tile[] = [
    // @formatter:off
    {x:  2, y:  2, r: 0, type: 'floor', template: 'E'},
    {x:  2, y:  6, r: 0, type: 'floor', template: 'E'},
    {x:  2, y: 11, r: 0, type: 'floor', template: 'U'},
    {x:  2, y: 19, r: 3, type: 'floor', template: 'F'},
    {x:  6, y: 19, r: 2, type: 'floor', template: 'F'},
    {x:  7, y:  2, r: 0, type: 'floor', template: 'E'},

    {x:  2, y: 10, r: 0, type: 'door', template: 'A'},
    {x:  6, y:  2, r: 1, type: 'door', template: 'A'},

    {x:  1, y:  1, r: 0, type: 'wall', template: 'IA'},
    {x:  1, y:  2, r: 1, type: 'wall', template: 'Q'},
    {x:  1, y: 10, r: 0, type: 'wall', template: 'IA'},
    {x:  1, y: 11, r: 1, type: 'wall', template: 'Q'},
    {x:  1, y: 19, r: 3, type: 'wall', template: 'G'},
    {x:  2, y:  1, r: 0, type: 'wall', template: 'A'},
    {x:  6, y:  1, r: 0, type: 'wall', template: 'IA'},
    {x:  6, y:  6, r: 1, type: 'wall', template: 'A'},
    {x:  6, y: 10, r: 0, type: 'wall', template: 'A'},
    {x:  6, y: 19, r: 2, type: 'wall', template: 'G'},
    {x:  7, y:  1, r: 0, type: 'wall', template: 'A'},
    {x:  7, y:  6, r: 0, type: 'wall', template: 'A'},
    {x: 10, y: 10, r: 0, type: 'wall', template: 'IA'},
    {x: 10, y: 11, r: 1, type: 'wall', template: 'Q'},
    // @formatter:on
  ];

  // @formatter:off
  readonly tileTypeColors: { [key: string]: string } = {
    'door':  '#bf9375',
    'floor': '#cfc9a1',
    'wall':  '#5488a6',
  };
  readonly tileTypeTextColors: { [key: string]: string } = {
    'door':  '#565146',
    'floor': '#565146',
    'wall':  '#d8e2f0',
  };
  readonly tileTemplateSizes: { [key: string]: TileTemplateModel } = {
    'A':  {shape: 'rect',  w: 4, h: 1, cw: 0.500, ch: 0.500, clips: [1, 2, 3].map(x => ({x, y: 1, r: 2}))},
    'BA': {shape: 'rect',  w: 3, h: 1, cw: 0.500, ch: 0.500},
    'E':  this.rect(4,4),
    'IA': {shape: 'rect',  w: 1, h: 1, cw: 0.500, ch: 0.500},
    'Q':  {shape: 'rect',  w: 8, h: 1, cw: 0.500, ch: 0.500},
    'U':  {shape: 'rect',  w: 8, h: 8, cw: 0.500, ch: 0.500},
    'F':  {shape: 'slice', w: 4, h: 4, cw: 0.500, ch: 0.500},
    'G':  {shape: 'curve', w: 5, h: 5, cw: 0.359, ch: 0.359},
  };
  // @formatter:on

  readonly tileBorderColor = '#575757';
  readonly gridColor = '#c8d0e0';
  readonly floorGridOpacity = 0.12;
  readonly gridOpacity = 1;
  readonly margin = 1;
  readonly border = 3;
  readonly clipSize = 0.75;

  ngOnInit(): void {
  }

  private rect(w: number, h: number): TileTemplateModel {
    return {
      shape: 'rect',
      w: w,
      h: h,
      cw: 1 / 2,
      ch: 1 / 2,
      clips: [...RangePipe.range(1, w).map(x => ({x, y: 0, r: 0})), ...[1, 2, 3].map(y => ({x: 4, y: y, r: 1}))]
    };
  }
}
