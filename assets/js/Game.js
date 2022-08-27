//this file contains the object used to store the game's state

let Game = {
    numberOfDecks:Math.floor(Math.random()*(7-1) + 1),
    chips: 100,
    currentBet: 0, 
    dealer: new Dealer(this.numberOfDecks),
    player: new Player(),
    resetGameState: function () {
        this.dealer= new Dealer(this.numberOfDecks);
        this.player= new Player();
        this.currentBet = 0;
    },
    startGame: function () {
        //dealer gives player two cards face up
        this.player.addCardToHand(this.dealer.dealCard());
        this.player.addCardToHand(this.dealer.dealCard());
        //dealer gives themselves two cards, one face up, one face down
        this.dealer.addCardToHand(this.dealer.dealCard())
        this.dealer.addCardToHand(this.dealer.dealCard());
    },
    move: function(move) {
        //give the player another card if they hit
        if(move === "hit"){
            this.dealer.reShuffleDeck();
            this.player.addCardToHand(this.dealer.dealCard());
            updateBoard(true);
        }
        if(move === "stand"){
            //player's turn ends if they stand
            this.dealerMove();
        }
        
    },
    dealerMove: function(){
        //dealer must hit if they're card total is less than 17
        updateBoard(false);
        while(this.dealer.calculateHandValue() < 17 && this.dealer.calculateHandValue() > 0){
            this.dealer.addCardToHand(this.dealer.dealCard());
            updateBoard(false);
            //console.log("dealer drew a card");
        }
        this.endGame();
    },
    endGame: function(){
        displayGameMove();
        if(this.playerWon() === "win"){
            //print win, win bet
            this.chips += this.currentBet;
            gameOverText("You won!");
        }
        else if(this.playerWon() === "tie"){
            //print tie, no impact on chip count
            gameOverText("You tied!");
        }
        else{
            //print lose, lose bet
            this.chips -= this.currentBet;
            gameOverText("You lost!");

        }
        updateAvailChips(Game.chips);
        updateBetLimit(Game.chips);
    },
    playerWon: function(){
        let dealerScore = this.dealer.calculateHandValue();
        let playerScore = this.player.calculateHandValue();
        let result = "";
        if(playerScore < 0){
            result = "lose";
        }
        else if(playerScore === dealerScore){
            result = "tie";
        }
        else if(playerScore > dealerScore){
            result = "win";
        }
        else{
            result = "lose";
        }
        return result;
    },
    setBet: function(newValue) {
        this.currentBet = newValue;
    }
};







