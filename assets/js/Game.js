//this file contains the object used to store the game's state

let Game = {
    numberOfDecks: Math.floor(Math.random() * (7 - 1) + 1),
    chips: 100,
    currentBet: 0,
    roundIsEnded: false,
    dealer: new Dealer(this.numberOfDecks),
    player: new Player(),
    resetGameState: function () {
        this.dealer = new Dealer(this.numberOfDecks);
        this.player = new Player();
        this.currentBet = 0;
    },
    resetInitialChipAmount: function () {
        this.chips = 100;
    },
    startGame: function () {
        enableMoveButtons();
        enableEndGameButtons();
        //dealer gives player two cards face up
        this.player.addCardToHand(this.dealer.dealCard());
        this.player.addCardToHand(this.dealer.dealCard());
        //dealer gives themselves two cards, one face up, one face down
        this.dealer.addCardToHand(this.dealer.dealCard())
        this.dealer.addCardToHand(this.dealer.dealCard());
        if (this.isBlackJack()) {
            console.log("natural")
            //natural, call end game functions
            this.endGame();
            this.roundIsEnded = true;
        }
    },
    move: function (move) {
        //give the player another card if they hit
        if (move === "hit") {
            this.dealer.reShuffleDeck();
            this.player.addCardToHand(this.dealer.dealCard());
            updateBoard(true);
            if (this.player.calculateHandValue() === -1 || this.isBlackJack()) {
                //bust or blackJack, end player's turn automatically
                this.dealerMove();
            }
        }
        if (move === "stand") {
            //player's turn ends if they stand
            this.dealerMove();
        }

    },
    dealerMove: function () {
        //dealer must hit if they're card total is less than 17
        updateBoard(false);
        while (this.dealer.calculateHandValue() < 17 && this.dealer.calculateHandValue() > 0) {
            this.dealer.reShuffleDeck();
            this.dealer.addCardToHand(this.dealer.dealCard());
            updateBoard(false);
            //console.log("dealer drew a card");
        }
        this.endGame();
    },
    endGame: function () {
        displayGameOver();
        //disable hit and stand buttons
        disableMoveButtons();
        console.log(this.playerWon());
        if (this.playerWon() === "win") {
            //winning state
            if (this.isBlackJack()) {
                //check to see if player got blackjack, print blackjack, win 1.5*bet
                this.chips += Math.floor((this.currentBet) * 1.5);
                gameOverText("You got blackjack!");
            }
            else {
                //print win, win bet
                this.chips += this.currentBet;
                gameOverText("You won!");
            }
        }
        else if (this.playerWon() === "tie") {
            //print tie, no impact on chip count
            gameOverText("You tied!");
        }
        else {
            //print lose, lose bet
            this.chips -= this.currentBet;
            if (this.chips <= 0) {
                //you've run out of chips to bet, disable goToRecordScore and MakeAnotherBet buttons
                gameOverText("You've run out of chips!");
                disableEndGameButtons();   
            }
            else{
                gameOverText("You lost!");
            }
        }
        updateAvailChips(Game.chips);
        updateBetLimit(Game.chips);
    },
    playerWon: function () {
        let dealerScore = this.dealer.calculateHandValue();
        let playerScore = this.player.calculateHandValue();
        let result = "";
        if (playerScore < 0) {
            result = "lose";
        }
        else if (playerScore === dealerScore) {
            result = "tie";
        }
        else if (playerScore > dealerScore) {
            result = "win";
        }
        else {
            result = "lose";
        }
        return result;
    },
    isBlackJack: function () {
        if (this.player.calculateHandValue() === 21) {
            return true;
        }
        return false;
    },
    setBet: function (newValue) {
        this.currentBet = newValue;
    }
};







