import Ball from './Ball.js';
import Paddle from './Paddle' ; 

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(5,Math.floor(this.canvas.height/2)) ;
    this.ctxt = this.canvas.getContext("2d"); 
    this.raf = window.requestAnimationFrame(this.drawpaddle.bind(this)); 
  }

  /** start this game animation */
  start() {
    this.animate();
  }
  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }
  keyDownActionHandler(event) {
    switch (event.key) {
       case "ArrowUp" :
       case "Up" :
           this.paddle.moveUp() ;
           break ;
       case "ArrowDown" :
       case "Down" :
           this.paddle.moveDown() ;
           break ;
        default: return;
    }
  }
  keyUpActionHandler(event) {
    switch (event.key) {
        case "ArrowUp" :
        case "Up" :
        case "ArrowDown" :
        case "Down" :
            this.paddle.stopMoving();
            break;
        default: return;
    }
    event.preventDefault();
}
  drawpaddle(){
    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paddle.draw(this.ctxt) ;
  }
  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }
  /** move then draw the bouncing ball */
  moveAndDraw() {
    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.ball.move();
    this.ball.paddleit(this.paddle) ; 
    this.ball.draw(this.ctxt);
    this.paddle.move(this.canvas) ;
    this.paddle.draw(this.ctxt) ;

  }

}

