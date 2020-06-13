import {Player} from "./gameObjects/Player"
import {Vector2} from "./util/Math"
import {GAME_DEFAULTS, KEYS} from "./Common"

export class Game {
  static MAX_CANVAS_WIDTH: number = 600
  static ASPECT_RATIO: number = 1 // keep it square for now


  player: Player
  playerOffsetHeight: number = 20

  canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')

  context2D: CanvasRenderingContext2D

  spaceColor: string = "black"

  //for the key events
  rightDown: boolean = false
  leftDown: boolean = false
  upDown: boolean = false
  downDown: boolean = false
  space: boolean = false

  lastFrame: number = this.timestamp() //init to current time

  update() {
    var start = this.timestamp()
    var elapsedTime: number = start - this.lastFrame

    // get the current time as seconds then multiple by the game speed to get a sensible number for multiplying velocities per frame
    var elapsedReduced: number = (elapsedTime / 1000.0) * GAME_DEFAULTS.GAME_SPEED

    this.updatePlayer(elapsedReduced)
    this.draw()

    this.lastFrame = start
  }

  timestamp(): number {
    return new Date().getTime()
  }

  /**
   * Basically we figure out the best width for our canvas at start up.
   */
  constructor() {
    this.context2D = this.canvas.getContext("2d")
    this.canvas.width = Game.MAX_CANVAS_WIDTH
    this.canvas.height = this.canvas.width / Game.ASPECT_RATIO

    this.initGame()
  }

  onKeyDown(evt:any) {
    if (evt.keyCode == KEYS.RIGHT) this.rightDown = true
    else if (evt.keyCode == KEYS.LEFT) this.leftDown = true
    else if (evt.keyCode == KEYS.UP) this.upDown = true
    else if (evt.keyCode == KEYS.DOWN) this.downDown = true
  }

  onKeyUp(evt:any) {
    if (evt.keyCode == KEYS.RIGHT) this.rightDown = false
    if (evt.keyCode == KEYS.LEFT) this.leftDown = false
    if (evt.keyCode == KEYS.UP) this.upDown = false
    if (evt.keyCode == KEYS.DOWN) this.downDown = false
    if (evt.keyCode == KEYS.SPACE) this.space = false
  }

  initGame() {
    //bottom middle
    this.player = new Player(new Vector2(Game.MAX_CANVAS_WIDTH / 2,
      this.canvas.height - this.playerOffsetHeight - Player.DEFAULT_HEIGHT))
  }

  drawBackground() {
    var self = this
    self.context2D.fillStyle = self.spaceColor
    self.context2D.fillRect(0, 0, Game.MAX_CANVAS_WIDTH, this.canvas.height)
  }

  draw() {
    this.drawBackground()
    this.player.draw(this.context2D)
  }


  updatePlayer(elapsedTime: number) {
    if (this.leftDown) {
      this.player.movmentVector.x = -this.player.DefaultMovementSpeed
    }
    else if (this.rightDown) {
      this.player.movmentVector.x = this.player.DefaultMovementSpeed
    }
    else {
      this.player.movmentVector.x = 0
    }
    this.player.update(elapsedTime)
    this.player.clamp(Game.MAX_CANVAS_WIDTH, this.canvas.height)
  }
}
