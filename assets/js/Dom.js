//this file contains functions for DOM Manipulation

let newGameEl = document.querySelector(".newGame");
let gameOverEl = document.querySelector(".gameOver");
let gameBoardEl = document.querySelector(".gameBoard");
let bodyEl = document.querySelector("body");
let winStateEl = document.querySelector(".winState");
let playerHandScoreEl = document.querySelector(".playerHandScore");
let dealerCardsEl  = document.querySelector(".dealerCards");
let playerCardsEl = document.querySelector(".playerCards");

bodyEl.addEventListener("click", handleButtonPresses);
displayNewGame();

function updateBoard(){
    //clear out the old player card elements first
    while (playerCardsEl.firstChild) {
        playerCardsEl.removeChild(playerCardsEl.lastChild);
      }
      //add elements for each of the player's cards.
    for(let i=0;i<Game.player.hand.length;i++){
        let newEl = document.createElement("p");
        newEl.textContent = Game.player.hand[i].cardName;
        playerCardsEl.appendChild(newEl);
    }
    //update the player's hand score
    playerHandScoreEl.textContent = `Score: ${Game.player.calculateHandValue()}`
    //clear out the old dealer card elements first
    while (dealerCardsEl.firstChild) {
        dealerCardsEl.removeChild(dealerCardsEl.lastChild);
      }
      //add elements for each of the dealer's cards.
    for(let i=0;i<Game.dealer.hand.length;i++){
        let newEl = document.createElement("p");
        newEl.textContent = Game.dealer.hand[i].cardName;
        dealerCardsEl.appendChild(newEl);
    }
    
}

function gameOverText(result){
    winStateEl.textContent = result;
}
function reset(){
    //reset the board back to new game screen
    displayNewGame();
    //reset game object
    Game.resetGameState();
}
function displayNewGame(){
    newGameEl.style.removeProperty('display');
    gameOverEl.style.display = "none";
    gameBoardEl.style.display = "none";
}
function displayBoard(){
    gameBoardEl.style.removeProperty('display');
    gameOverEl.style.display = "none";
    newGameEl.style.display = "none";
}
function displayGameMove(){
    gameOverEl.style.removeProperty('display');
    newGameEl.style.display = "none";
    gameBoardEl.style.display = "none";
}
function scores(){

}

function handleButtonPresses(event){
    if(event.target.className === "hitButton"){
        //player hit
        Game.move("hit");
    }
    else if(event.target.className === "standButton"){
        //player stand
        Game.move("stand");
    }
    else if(event.target.className === "quitButton"){
        // quit game (appears after game ends)
        reset();
    }
    else if(event.target.className === "scoreButton"){
        //record score (appears after game ends)
        scores();
    }
    else if(event.target.className === "start"){
        //start game
        Game.startGame();
        displayBoard();
        updateBoard();
    }
    else if(event.target.className === "scores"){
        //see high scores
        scores();
    }

}

