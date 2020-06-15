import * as PIXI from 'pixi.js';

import {IGameObject} from "./IGameObject"
import {Vector2,Dimensions2} from "../util/Math"


export  class Player implements IGameObject {

  color:number = 0xFFF
  graphics = new PIXI.Graphics(null);

  position:Vector2
  dimensions:Dimensions2 = new Dimensions2(Player.DEFAULT_WIDTH, Player.DEFAULT_HEIGHT)
  movmentVector:Vector2 = new Vector2(0, 0)
  static DEFAULT_HEIGHT:number = 20
  static DEFAULT_WIDTH:number = 40
  DefaultMovementSpeed:number = 7


  constructor(app: PIXI.Application, position: Vector2) {
    this.position = position
    app.stage.addChild(this.graphics);
  }

  draw(app:PIXI.Application) {
    this.graphics.clear();

    this.graphics.beginFill(this.color); // Red
    this.graphics.drawRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height); // drawCircle(x, y, radius)
    this.graphics.endFill();
  }

  update(elapsedUnit:number) {
    this.position.x += this.movmentVector.x * elapsedUnit
    this.position.y += this.movmentVector.y * elapsedUnit
  }

  clamp(gameWidth:number, gameHeight:number) {
    if (this.position.x < 0) {
      this.position.x = 0
      return
    }
    else if (this.position.x > (gameWidth - this.dimensions.width)) {
      this.position.x = gameWidth - this.dimensions.width
      return
    }
    else if (this.position.y < 0) {
      this.position.y = 0
      return
    }
    else if (this.position.y > (gameHeight - this.dimensions.height)) {
      this.position.y = gameHeight - this.dimensions.height
      return
    }
  }

  midpoint() {
    return new Vector2(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2)
  }


  //todo
  explode() {
    this.color = 0xF00
  }

}







