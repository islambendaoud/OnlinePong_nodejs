// true iff game is started
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
export function startGame(theGame){
  if (!theGame.started) {
    theGame.start();
    document.getElementById('start').value = 'stop';
    console.log("hello from start game"); 
  }
  else {
    document.getElementById('start').value = 'jouer';
    theGame.stop();
    console.log('hello from stop game ') ; 
  }
}