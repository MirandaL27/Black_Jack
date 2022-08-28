//this file contains functions for DOM Manipulation

let newGameEl = document.querySelector(".newGame");
let gameOverEl = document.querySelector(".gameOver");
let gameBoardEl = document.querySelector(".gameBoard");
let bodyEl = document.querySelector("body");
let winStateEl = document.querySelector(".winState");
let playerHandScoreEl = document.querySelector(".playerHandScore");
let dealerCardsEl  = document.querySelector(".dealerCards");
let playerCardsEl = document.querySelector(".playerCards");
let bettingEl = document.querySelector(".betting");
let availChipsEl = document.querySelector(".availChips");
let currentBetEl = document.querySelector(".currentBet");
let chipsEl = document.querySelector(".chips");
let betLableEl = document.querySelector(".betLable");

bodyEl.addEventListener("click", handleButtonPresses);
//displayNewGame();

function updateBoard(hideDealerCard){
    updateCurrentBet(Game.currentBet);
    //clear out the old player card elements first
    while (playerCardsEl.firstChild) {
        playerCardsEl.removeChild(playerCardsEl.lastChild);
      }
      //add elements for each of the player's cards.
    for(let i=0;i<Game.player.hand.length;i++){
        let newDiv = document.createElement("div");
        let newEl = document.createElement("p");
        newEl.textContent = Game.player.hand[i].cardName;
        let newImg = document.createElement("img");
        newImg.src = Game.player.hand[i].cardFileName;
        newDiv.appendChild(newImg);
        newDiv.appendChild(newEl);
        playerCardsEl.appendChild(newDiv);
    }
    //update the player's hand score
    playerHandScoreEl.textContent = `Score: ${Game.player.calculateHandValue()}`
    //clear out the old dealer card elements first
    while (dealerCardsEl.firstChild) {
        dealerCardsEl.removeChild(dealerCardsEl.lastChild);
      }
      //add elements for each of the dealer's cards.
    for(let i=0;i<Game.dealer.hand.length;i++){
        let newDiv = document.createElement("div");
        let newEl = document.createElement("p");
        let newImg = document.createElement("img");
        if(hideDealerCard && i>0){
            newEl.textContent = "???";
            newImg.src = './assets/images/card_back.png';
        }
        else{
            newEl.textContent = Game.dealer.hand[i].cardName;
            newImg.src = Game.player.hand[i].cardFileName;
        }
        newDiv.appendChild(newImg);
        newDiv.appendChild(newEl);
        dealerCardsEl.appendChild(newDiv);
    }
    
}
function updateBetLimit(newValue){
    if(newValue > 500){
        newValue = 500;
    }
    chipsEl.max = `${newValue}`;
    betLableEl.textContent = `Chips (between 2 and ${newValue}):`
}

function updateAvailChips(newValue){
    availChipsEl.textContent = newValue;
}
function updateCurrentBet(newValue){
    currentBetEl.textContent = newValue;
}

function gameOverText(result){
    winStateEl.textContent = result;
}
function reset(){
    //reset the board back to new game screen
    displayNewGame();
    //reset game object
    Game.resetGameState();
    updateCurrentBet(Game.currentBet);
}
function displayNewGame(){
    newGameEl.style.removeProperty('display');
    gameOverEl.style.display = "none";
    gameBoardEl.style.display = "none";
    bettingEl.style.display = "none";
}
function displayBoard(){
    gameBoardEl.style.removeProperty('display');
    gameOverEl.style.display = "none";
    newGameEl.style.display = "none";
    bettingEl.style.display = "none";
}
function displayGameMove(){
    gameOverEl.style.removeProperty('display');
    newGameEl.style.display = "none";
    bettingEl.style.display = "none";
    //gameBoardEl.style.display = "none";//commented out for testing purposes, make sure to put back when finished!
}
function displayBettingBoard(){
    bettingEl.style.removeProperty("display");
    gameOverEl.style.display = "none";
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
        //go to betting screen
        displayBettingBoard();
        
    }
    else if(event.target.className === "scores"){
        //see high scores
        scores();
    }
    else if(event.target.className === "bet"){
        //make a bet and start game
        Game.setBet(parseInt(chipsEl.value));
        Game.startGame();
        displayBoard();
        updateBoard(true);
    }

}

