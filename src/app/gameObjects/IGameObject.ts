import * as PIXI from 'pixi.js';

import {Dimensions2,Vector2} from '../util/Math'

export interface IGameObject {
  draw(app:PIXI.Application):void
  update(elapsedUnit: number):void
  position: Vector2
  dimensions: Dimensions2
}
