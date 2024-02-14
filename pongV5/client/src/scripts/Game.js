import Ball from './Ball.js';
import Paddle from './Paddle' ; 

 const SOCKET = io();
 let FORCED = false 
 let FIRST = false ; 
 export {SOCKET} ; 
 export {FIRST} ;
 SOCKET.on('first', () =>FIRST = true );
 SOCKET.on('redirect' , function(direction ) {
   window.location.href = direction ; 
 })
 SOCKET.on('start', () =>FORCED = true );

 setInterval(() => {if (FIRST) {
  document.getElementById("player").innerHTML = 'First' ; 
}
if (!FIRST){
  document.getElementById("player").innerHTML = 'Second' ; 

}
}, 1 )  ; // here we do a setinterval because the FIRST is at false at the first time , than it goes to true 
// it take some time to do that so with 1ms delay we can call to change it 

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
  otherup(){
    if (FIRST){
      this.paddle2.moveUp() ; 
    }
    else {
      this.paddle.moveUp() ; 
    }
  }
  otherdown(){
    if (FIRST){
      this.paddle2.moveDown() ; 
    }
    else {
      this.paddle.moveDown() ; 
    }
  }
  updateball(newball){
    this.ball = newball ; 
  }
  otherstop(){
    if (FIRST){
      this.paddle2.stopMoving() ; 
    }
    else {
      this.paddle.stopMoving() ; 
    }
  }
  startsignal(){
    if (FIRST){
      SOCKET.emit('startgame'); 
    }
  }
  // true iff game is started
  /** start and stop a game
  * @param {Game} theGame - the game to start and stop
  */
  startGame(){
    if (FIRST ||  FORCED ) {
      if (!this.started) {
        this.start();
        document.getElementById('start').value = 'stop';
      }
      else {
        document.getElementById('start').value = 'jouer';
        this.stop();
    }

  }

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
    FORCED = false ; 
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
    this.startGame() ; 
  }

  keyDownActionHandler(event) {
    switch (event.key) {
       case "ArrowUp" :
       case "Up" :
        if(FIRST) {
          this.paddle.moveUp() ;
          SOCKET.emit("firstup") ;
         }
         else {
           this.paddle2.moveUp() ; 
           SOCKET.emit("secondup") ;
         }
           break ;
       case "ArrowDown" :
       case "Down" :
           if(FIRST) {
             this.paddle.moveDown() ;
             SOCKET.emit("firstdown") ;
            }
            else {
              this.paddle2.moveDown() ; 
              SOCKET.emit("seconddown") ;
            }
           
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
            if (FIRST) {
              this.paddle.stopMoving(); 
              SOCKET.emit("firststop") ; 
            }
            else {
              this.paddle2.stopMoving(); 
              console.log('stopped 2 ') ; 
              SOCKET.emit("secondstop") ; 
            }
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

