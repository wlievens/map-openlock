import {Component, OnInit} from '@angular/core';
import {RangePipe} from './range.pipe';

type TileType = 'floor' | 'wall' | 'door';
type TileTemplateCode = 'E' | 'R' | 'I' | 'QE' | 'U' | 'A' | 'BA' | 'Q' | 'IA' | 'F' | 'G';
type TileShape = 'rect' | 'slice' | 'curve';

interface Tile {
  x: number;
  y: number;
  r: number;
  type: TileType;
  template: TileTemplateCode;
}

interface TileTemplateModel {
  shape: TileShape;
  w: number;
  h: number;
  cw: number;
  ch: number;
  clips?: { x: number, y: number, r: number, vertical: boolean }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  grid = 32;
  sizeX = 26;
  sizeY = 32;
  showBackgroundGrid = true;

  listing: Tile[] = [
    // @formatter:off
    {x:  2, y:  2, r: 0, type: 'floor', template: 'E'},
    {x:  2, y:  6, r: 0, type: 'floor', template: 'E'},
    {x:  2, y: 11, r: 0, type: 'floor', template: 'U'},
    {x:  2, y: 19, r: 3, type: 'floor', template: 'F'},
    {x:  6, y: 19, r: 2, type: 'floor', template: 'F'},
    {x:  7, y:  2, r: 0, type: 'floor', template: 'R'},

    {x:  2, y: 10, r: 0, type: 'door', template: 'A'},
    {x:  6, y:  2, r: 1, type: 'door', template: 'A'},

    {x:  1, y:  1, r: 0, type: 'wall', template: 'IA'},
    {x:  1, y:  9, r: 3, type: 'wall', template: 'Q'},
    {x:  1, y: 10, r: 0, type: 'wall', template: 'IA'},
    {x:  1, y: 18, r: 3, type: 'wall', template: 'Q'},
    {x:  1, y: 19, r: 3, type: 'wall', template: 'G'},
    {x:  2, y:  1, r: 0, type: 'wall', template: 'A'},
    {x:  6, y:  1, r: 0, type: 'wall', template: 'IA'},
    {x:  6, y:  6, r: 1, type: 'wall', template: 'A'},
    {x:  6, y: 10, r: 0, type: 'wall', template: 'A'},
    {x:  6, y: 19, r: 2, type: 'wall', template: 'G'},
    {x:  7, y:  1, r: 0, type: 'wall', template: 'A'},
    {x: 10, y:  6, r: 2, type: 'wall', template: 'A'},
    {x: 10, y: 10, r: 0, type: 'wall', template: 'IA'},
    {x: 10, y: 11, r: 1, type: 'wall', template: 'Q'},
    // @formatter:on
  ];

  // @formatter:off
  readonly tileTypeColors: { [key: string]: string } = {
    door:  '#bf9375',
    floor: '#cfc9a1',
    wall:  '#5488a6',
  };
  readonly tileTypeTextColors: { [key: string]: string } = {
    door:  '#565146',
    floor: '#565146',
    wall:  '#d8e2f0',
  };
  readonly tileTemplateSizes: { [key: string]: TileTemplateModel } = {
    A:  {shape: 'rect',  w: 4, h: 1, cw: 0.500, ch: 0.500, clips: [...[1, 2, 3].map(x => ({x, y: 1, r: 2, vertical: false})), {x: 0, y: 0.5, r: 3, vertical: true}, {x: 4, y: 0.5, r: 1, vertical: true}]},
    BA: {shape: 'rect',  w: 3, h: 1, cw: 0.500, ch: 0.500, clips: []},
    F:  {shape: 'slice', w: 4, h: 4, cw: 0.500, ch: 0.500, clips: [...[1, 2, 3].map(x => ({x, y: 4, r: 2, vertical: false})), ...[1, 2, 3].map(y => ({x: 4, y, r: 1, vertical: false})), {x: 1.18, y: 1.18, r: 3.5, vertical: false}]},
    G:  {shape: 'curve', w: 5, h: 5, cw: 0.359, ch: 0.359, clips: [{x: 5, y: 0.5, r: 1, vertical: true}, {x: 0.5, y: 5, r: 2, vertical: true}, {x: 2.18, y: 2.18, r: 1.5, vertical: false}]},
    I:  {shape: 'rect',  w: 1, h: 1, cw: 0.500, ch: 0.500, clips: [{x: 0.5, y: 1, r: 2, vertical: false}]},
    IA: {shape: 'rect',  w: 1, h: 1, cw: 0.500, ch: 0.500, clips: [{x: 0.5, y: 1, r: 2, vertical: true}]},
    Q:  this.linear('rect', 8, 1),
    E:  this.regular('rect', 4, 4),
    QE: this.regular('rect', 8, 2),
    R:  this.regular('rect', 8, 4),
    U:  this.regular('rect', 8, 8),
  };
  // @formatter:on

  readonly tileBorderColor = '#575757';
  readonly gridColor = '#c8d0e0';
  readonly floorGridOpacity = 0.12;
  readonly gridOpacity = 1;
  readonly margin = 1;
  readonly border = 3;
  readonly clipSizeHorizontal = 0.60;
  readonly clipSizeVertical = this.clipSizeHorizontal / 3;

  ngOnInit(): void {
  }

  private regular(shape: TileShape, w: number, h: number): TileTemplateModel {
    return {
      shape, w, h,
      cw: 1 / 2, ch: 1 / 2,
      clips: [
        ...RangePipe.range(1, w - 1).map(x => ({x, y: 0, r: 0, vertical: false})),
        ...RangePipe.range(1, h - 1).map(y => ({x: w, y, r: 1, vertical: false})),
        ...RangePipe.range(1, w - 1).map(x => ({x, y: h, r: 2, vertical: false})),
        ...RangePipe.range(1, h - 1).map(y => ({x: 0, y, r: 3, vertical: false})),
      ]
    };
  }

  private linear(shape: TileShape, w: number, h: number): TileTemplateModel {
    return {
      shape, w, h,
      cw: 1 / 2, ch: 1 / 2,
      clips: [
        ...RangePipe.range(1, w - 1).map(x => ({x, y: h, r: 2, vertical: false})),
        {x: w, y: 0.5, r: 1, vertical: true},
        {x: 0, y: 0.5, r: 3, vertical: true},
      ]
    };
  }
}
