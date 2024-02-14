import Mobile from './Mobile.js';
import {SOCKET} from './Game.js';

// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;
const SUMXY = 12 ; 

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {
  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }


  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      this.shiftY = - this.shiftY;    // rebond en haut ou en bas
    }
    else if (this.x + this.width >= this.theGame.canvas.width ) {  
      
      this.x = 300 ; 
      this.y = 300 ; 
      this.theGame.add(1);
      console.log("here 1" ) ; 
    }
    else if (this.x <= 0){
       
      this.x = 300 ; 
      this.y = 300 ; 
      this.theGame.add(2) ;
      console.log("here 2" ) ; 
       
    }
    super.move();
  }
  paddleitleft(paddle){
    let p1 = [Math.max(this.x,paddle.x),Math.max(this.y,paddle.y)]  ;
    let p2 = [Math.min(this.x+24 , paddle.x+24 ),Math.min(this.y+24 , paddle.y +72 )] ;
    if (p1[0] < p2[0] && p1[1] < p2[1]){
      if (0<paddle.y - this.y <Math.floor(72/6) ) {
        this.shiftY =  this.shiftY +1; 
        if (this.shiftY>0){ // car la somme des valeurs absolue est 12 
          this.shiftX = SUMXY -  this.shiftY ; 
        }
        else {
          this.shiftX = SUMXY + this.shiftY ; 
        }
  
      }
      else if (Math.floor(72/6) < paddle.y - this.y <2*Math.floor(72/6)){
        this.shiftY =this.shiftY  -1 ; 
        if (this.shiftY>0){
          this.shiftX = SUMXY -  this.shiftY ; 
        }
        else {
          this.shiftX = SUMXY + this.shiftY ; 
        }
      }
      else if (2*Math.floor(72/6) < paddle.y - this.y <4*Math.floor(72/6)){ // 2 car on'est dans le 0 et les deux zzros sont zgaux 
        this.shiftY = this.shiftY -2;                                       // et aussi la valeur de  shiftX doit ettre toujours vers (positive) la droite pour que 
        if (this.shiftY>0){                                                  //ça déplace vers la droite
          this.shiftX = SUMXY -  this.shiftY ; 
        }
        else {
          this.shiftX = SUMXY + this.shiftY ; 
        } 
      }
      else if (4*Math.floor(72/6)<paddle.y - this.y <5*Math.floor(72/6)){
        this.shiftY = this.shiftY  -1;
        if (this.shiftY>0){
          this.shiftX = SUMXY -  this.shiftY ; 
        }
        else {
          this.shiftX = SUMXY + this.shiftY ; 
        }
      }
      else if (5*Math.floor(72/6)<paddle.y - this.y <72){
        this.shiftY = this.shiftY +1; 
        if (this.shiftY>0){
          this.shiftX = SUMXY -  this.shiftY ; 
        }
        else {
          this.shiftX = SUMXY + this.shiftY ; 
        }
      }
       
      }
      SOCKET.emit("signalballtouched" , [this.shiftX , this.x , this.shiftY , this.y]) ; 
    }
    paddleitright(paddle){
      let p1 = [Math.max(this.x,paddle.x),Math.max(this.y,paddle.y)]  ;
      let p2 = [Math.min(this.x+24 , paddle.x+24 ),Math.min(this.y+24 , paddle.y +72 )] ;
      if (p1[0] < p2[0] && p1[1] < p2[1]){
      if (0<paddle.y - this.y <Math.floor(72/6) ) {
        this.shiftY =  this.shiftY +1; 
        if (this.shiftY>0){ // car la somme des valeurs absolue est 12 
          this.shiftX = -SUMXY + this.shiftY ; 
        }
        else {
          this.shiftX = - SUMXY - this.shiftY ; 
        }
  
      }
      else if (Math.floor(72/6) < paddle.y - this.y <2*Math.floor(72/6)){
        this.shiftY =this.shiftY  -1 ; 
        if (this.shiftY>0){
          this.shiftX = -SUMXY +  this.shiftY ; 
        }
        else {
          this.shiftX = -SUMXY - this.shiftY ; 
        }
      }
      else if (2*Math.floor(72/6) < paddle.y - this.y <4*Math.floor(72/6)){ // 2 car on'est dans le 0 et les deux zzros sont zgaux 
        this.shiftY = this.shiftY -2;                                       // et aussi la valeur de  shiftX doit ettre toujours negative pour ce deplacer vers la droite pour que 
        if (this.shiftY>0){                                                
          this.shiftX = -SUMXY +  this.shiftY ; 
        }
        else {
          this.shiftX = -SUMXY - this.shiftY ; 
        } 
      }
      else if (4*Math.floor(72/6)<paddle.y - this.y <5*Math.floor(72/6)){
        this.shiftY = this.shiftY  -1;
        if (this.shiftY>0){
          this.shiftX = -SUMXY +  this.shiftY ; 
        }
        else {
          this.shiftX = -SUMXY - this.shiftY ; 
        }
      }
      else if (5*Math.floor(72/6)<paddle.y - this.y <72){
        this.shiftY = this.shiftY +1; 
        if (this.shiftY>0){
          this.shiftX = -SUMXY +  this.shiftY ; 
        }
        else {
          this.shiftX = -SUMXY - this.shiftY ; 
        }
      }
       
      }
      SOCKET.emit("signalballtouched" , [this.shiftX , this.x , this.shiftY , this.y]) ; 
      }
      update(list){
        this.x = list[1]; 
        this.shiftX = list[0]; 
        this.y = list[3]; 
        this.shiftY = list[2]; 
      }
  }


