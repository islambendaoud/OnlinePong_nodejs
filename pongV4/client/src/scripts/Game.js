import Ball from './Ball.js';
import Paddle from './Paddle' ; 
import {startGame} from './startstop.js' ; 
/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {
  first = 0 ; 
  second = 0 ; 
  started = false ; 
  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(5,Math.floor(this.canvas.height/2)) ;
    this.paddle2 = new Paddle(this.canvas.width -33,Math.floor(this.canvas.height/2))
    this.ctxt = this.canvas.getContext("2d"); 
    this.raf = window.requestAnimationFrame(this.drawpaddle.bind(this)); 

  }

  /** start this game animation */
  start() {
    this.started = true ; 
    this.animate();
  }
  /** stop this game animation */
  stop() {
    this.started = false ; 
    window.cancelAnimationFrame(this.raf);
  }
  add(n){
    if (n == 1) {
      this.first = this.first+ 1 ; 
      document.getElementById('score1').innerHTML= this.first.toString();
    }
    if (n == 2) {
      this.second = this.second+ 1 ; 
      document.getElementById('score2').innerHTML = this.second.toString();
    }
    console.log("here") ; 
    startGame(this) ; 
  }

  keyDownActionHandler(event) {
    switch (event.key) {
       case "ArrowUp" :
       case "Up" :
           this.paddle.moveUp() ;
           this.paddle2.moveUp() ; 
           break ;
       case "ArrowDown" :
       case "Down" :
           this.paddle.moveDown() ;
           this.paddle2.moveDown() ; 
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
            this.paddle2.stopMoving() ; 
            break;
        default: return;
    }
    event.preventDefault();
}
  drawpaddle(){
    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paddle.draw(this.ctxt) ;
    this.paddle2.draw(this.ctxt) ; 
  }
  /** animate the game : move and draw */
  animate() {
    if (this.started){
      this.moveAndDraw();
      this.raf = window.requestAnimationFrame(this.animate.bind(this));
    }
    
  }
  /** move then draw the bouncing ball */
  moveAndDraw() {
    this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.ball.move();
    this.ball.paddleitleft(this.paddle) ;
    this.ball.paddleitright(this.paddle2) ; 
    this.ball.draw(this.ctxt);
    this.paddle.move(this.canvas) ;
    this.paddle.draw(this.ctxt) ;
    this.paddle2.move(this.canvas) ;
    this.paddle2.draw(this.ctxt) ;

  }

}

