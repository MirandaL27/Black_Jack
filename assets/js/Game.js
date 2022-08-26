import Player from "./Player";
import Dealer from "./Dealer";


let Game = {
    dealer: new Dealer(Math.floor(Math.random()*(7-1) + 1)),
    player: new Player(),
    resetGameState: function () {
        this.dealer= new Dealer(Math.floor(Math.random()*(7-1) + 1));
        this.player= new Player();
    },
    startGame: function () {
        //dealer gives player two cards face up
        this.player.addCardToHand(this.dealer.dealCard());
        this.player.addCardToHand(this.dealer.dealCard());
        //dealer gives themselves two cards, one face up, one face down
        this.dealer.addCardToHand(this.dealer.dealCard())
        this.dealer.addCardToHand(this.dealer.dealCard());
    },
    endGame: function(){
        if(this.playerWon === "win"){
            //print win
        }
        else if(this.playerWon === "tie"){
            //print tie
        }
        else{
            //print lose

        }
    },
    playerWon: function(){
        let dealerScore = this.dealer.calculateHandValue();
        let playerScore = this.player.calculateHandValue();
        let result = "";
        if(playerScore > 21){
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
};

function handlePlayerMove(event){
        if(event.target.className === "hitButton"){
            //player hit
        }
        else if(event.target.className === "standButton"){
            //player stand
        }
        else if(event.target.className === "quitButton"){
            // quit game
        }
        else if(event.target.className === "scoreButton"){
            //record score
        }
        else if(event.target.className === "start"){
            //start game
        }
        else if(event.target.className === "scores"){
            //see high scores
        }

}





