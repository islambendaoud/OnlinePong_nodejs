'use strict';
import Game from './Game.js';
import {SOCKET} from './Game.js';
const theField = document.getElementById("field");
const theGame = new Game(theField);
SOCKET.on("start" ,() => theGame.startGame());
SOCKET.on("up" , ()=> theGame.otherup()) ; 
SOCKET.on("down" , ()=> theGame.otherdown()) ; 
SOCKET.on("stop" , ()=> theGame.otherstop()) ; 
SOCKET.on("updateball", cords => theGame.ball.update(cords)) ; 
const init = () => {
  theGame.drawpaddle() ; 
  window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
  window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
  document.getElementById('start').addEventListener("click", () => {theGame.startsignal() ; });
 
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      theGame.startsignal();
      }
    }) ;
    
}
window.addEventListener("load",init);

