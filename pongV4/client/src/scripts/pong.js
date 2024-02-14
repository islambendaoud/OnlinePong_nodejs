'use strict';

import Game from './Game.js';
import {startGame} from './startstop.js' ; 
const init = () => {
  const theField = document.getElementById("field");
  const theGame = new Game(theField);
  theGame.drawpaddle() ; 
  window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
  window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
  document.getElementById('start').addEventListener("click", () => startGame(theGame) );
  document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      startGame(theGame);
      }
    })
    
}

window.addEventListener("load",init);


