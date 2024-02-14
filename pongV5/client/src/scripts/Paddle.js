
import Mobile from "./Mobile.js" ;
import MoveState from "./stat.js" ;
const PADDLE_SRC = './images/paddle.png' ; 
export default class Paddle extends Mobile{
    
    constructor(a,b){
        super(a,b , PADDLE_SRC);
        this.moving = MoveState.NONE ;
      }
      moveUp(){
        this.shift = -8 ;
        this.moving = MoveState.UP ;
      }
      moveDown(){
        this.shift = 8 ;
        this.moving = MoveState.DOWN
      }
      Up(){
        return this.moving === MoveState.UP ;
        }
      Down(){
        return this.moving === MoveState.DOWN ;
      }
      stopMoving(){
        this.shift = 8 ;
        this.moving = MoveState.NONE ;
      }
      move(box){
        if(this.Up()){
          this.y = Math.max(0 , this.y+this.shift) ;
        }
        if(this.Down()) {
          this.y = Math.min(box.height - 40 , this.y + this.shift)  ;
        }
}
}
