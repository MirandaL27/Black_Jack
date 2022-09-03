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
let recordScoreEl = document.querySelector(".recordScore");
let highScoresEl = document.querySelector(".highScores");
let scoreContainerEl = document.querySelector(".score-container");
let hitButtonEl = document.querySelector(".hitButton");
let standButtonEl = document.querySelector(".standButton");
let goToRecordButtonEl = document.querySelector(".goToRecord");
let makeAnotherBetButtonEl = document.querySelector(".continueButton");

bodyEl.addEventListener("click", handleButtonPresses);

function updateBoard(hideDealerCard){
    updateCurrentBet(Game.currentBet);
    //clear out the old player card elements first
    while (playerCardsEl.firstChild) {
        playerCardsEl.removeChild(playerCardsEl.lastChild);
      }
      //add elements for each of the player's cards.
    for(let i=0;i<Game.player.hand.length;i++){
        let newDiv = document.createElement("div");
        newDiv.className="container-div";
        let newEl = document.createElement("p");
        newEl.textContent = Game.player.hand[i].cardName;
        let newImg = document.createElement("img");
        newImg.src = Game.player.hand[i].cardFileName;
        newDiv.appendChild(newImg);
        newDiv.appendChild(newEl);
        playerCardsEl.appendChild(newDiv);
    }
    //update the player's hand score
    let score = Game.player.calculateHandValue();
    playerHandScoreEl.textContent = `Score: ${(score > 0 ? score : "Bust")}`
    //clear out the old dealer card elements first
    while (dealerCardsEl.firstChild) {
        dealerCardsEl.removeChild(dealerCardsEl.lastChild);
      }
      //add elements for each of the dealer's cards.
    for(let i=0;i<Game.dealer.hand.length;i++){
        let newDiv = document.createElement("div");
        newDiv.className="container-div";
        let newEl = document.createElement("p");
        let newImg = document.createElement("img");
        if(hideDealerCard && i>0){
            newEl.textContent = "???";
            newImg.src = './assets/images/card_back.png';
        }
        else{
            newEl.textContent = Game.dealer.hand[i].cardName;
            newImg.src = Game.dealer.hand[i].cardFileName;
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
    chipsEl.value = '';
    chipsEl.max = `${newValue}`;
    betLableEl.textContent = `Chips (between 2 and ${newValue}):`
}

function updateAvailChips(newValue){
    availChipsEl.textContent = newValue;
}
function updateCurrentBet(newValue){
    currentBetEl.textContent = newValue;
}

function disableMoveButtons(){
    //disable hit and stand buttons
    hitButtonEl.disabled = "true";
    standButtonEl.disabled = "true";
}
function enableMoveButtons() {
    //enable hit and stand buttons
    hitButtonEl.removeAttribute("disabled");
    standButtonEl.removeAttribute("disabled");
}

function disableEndGameButtons(){
    //disable "Record Score and Quit" and "Make Another Bet" buttons 
    goToRecordButtonEl.disabled = "true";
    makeAnotherBetButtonEl.disabled = "true";
}
function enableEndGameButtons(){
    //enable "Record Score and Quit" and "Make Another Bet" buttons 
    goToRecordButtonEl.removeAttribute("disabled");
    makeAnotherBetButtonEl.removeAttribute("disabled");
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
    recordScoreEl.style.display = "none";
    highScoresEl.style.display = "none";
}
function displayBoard(){
    gameBoardEl.style.removeProperty('display');
    gameOverEl.style.display = "none";
    newGameEl.style.display = "none";
    bettingEl.style.display = "none";
    recordScoreEl.style.display = "none";
    highScoresEl.style.display = "none";
}
function displayGameOver(){
    gameOverEl.style.removeProperty('display');
    newGameEl.style.display = "none";
    bettingEl.style.display = "none";
    recordScoreEl.style.display = "none";
    highScoresEl.style.display = "none";
    gameBoardEl.style.removeProperty("display");
}
function displayBettingBoard(){
    bettingEl.style.removeProperty("display");
    gameOverEl.style.display = "none";
    newGameEl.style.display = "none";
    gameBoardEl.style.display = "none";
    recordScoreEl.style.display = "none";
    highScoresEl.style.display = "none";
}
function displayRecordScore(){
    recordScoreEl.style.removeProperty("display");
    bettingEl.style.display = "none";
    gameOverEl.style.display = "none";
    newGameEl.style.display = "none";
    gameBoardEl.style.display = "none";
    highScoresEl.style.display = "none";
}
function displayScores(){
    highScoresEl.style.removeProperty("display");
    recordScoreEl.style.display = "none";
    bettingEl.style.display = "none";
    gameOverEl.style.display = "none";
    newGameEl.style.display = "none";
    gameBoardEl.style.display = "none";
}

function scores(){
    //clear out old high scores first
    while (scoreContainerEl.firstChild) {
        scoreContainerEl.removeChild(scoreContainerEl.lastChild);
    }
    let arr = JSON.parse(localStorage.getItem("blackJackScores"));
    console.log(arr);
    if(arr){
        arr.forEach(elem => {
            //loop through the array of high scores and display them
            let newDiv = document.createElement("div");
            newDiv.className = "score";
            let pEl = document.createElement("p");
            pEl.textContent = `${elem.name}: `;
            let spanEl = document.createElement("span");
            spanEl.textContent = elem.value;
            pEl.appendChild(spanEl);
            newDiv.appendChild(pEl);
            scoreContainerEl.appendChild(newDiv)
        });
    }
}
function storeScore(){
    //get array of scores that are already in localStorage
    let arr = JSON.parse(localStorage.getItem("blackJackScores"));
    if(!arr){
        arr = [];
    }
    //get name from html and the score from game.chips
    console.log(document.querySelector(".name").value, document.querySelector(".name"));
    let obj = {name: document.querySelector(".name").value, value: Game.chips}
    //add obj to end of arr
    arr.push(obj);
    //put the updated array back into local storage
    localStorage.setItem("blackJackScores", JSON.stringify(arr));
}
function clearHighScores(){
    localStorage.removeItem("blackJackScores");
}

function validateBetAmount(value){
    if(value < 2 || value > Game.chips){
        return false;
    }
    return true;
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
        Game.resetInitialChipAmount();
        updateAvailChips(Game.chips);
        updateBetLimit(Game.chips);
    }
    else if(event.target.className === "goToRecord"){
        //go to record high score screen and then quit
        displayRecordScore();
    }
    else if(event.target.className === "continueButton"){
        //place another bet
        Game.resetGameState();
        updateCurrentBet(Game.currentBet);
        displayBettingBoard();
    }
    else if(event.target.className === "scoreButton"){
        //record score and then quit
        storeScore();
        displayScores();
        scores();
        Game.resetGameState();
        updateCurrentBet(Game.currentBet);
        Game.resetInitialChipAmount();
        updateAvailChips(Game.chips);
        updateBetLimit(Game.chips);
    }
    else if(event.target.className === "clearHighScores"){
        //clear all high scores
        clearHighScores();
        scores();
    }
    else if(event.target.className === "backFromScores"){
        //go back to new game screen from high score screen
        displayNewGame();
    }
    else if(event.target.className === "start"){
        //go to betting screen
        displayBettingBoard();
        
    }
    else if(event.target.className === "scores"){
        //see high scores
        displayScores();
        scores();
    }
    else if(event.target.className === "bet"){
        //make a bet and start game
        //validate bet amount: must be between 2 and # of available chips
        if(validateBetAmount(parseInt(chipsEl.value))){
            Game.setBet(parseInt(chipsEl.value));
            Game.startGame();
            if(!Game.roundIsEnded){
                displayBoard();
                updateBoard(true);
            }
            else{
                displayGameOver();
                updateBoard(false);
            }
        }
        else{
            //bet amount is not valid, alert player
            alert(`Bet amount must be between 2 and ${Game.chips}`);
        }
    }

}

