import Deck from "./deck";
import Player from "./Player"

class Dealer extends Player{
    deck;
    constructor(numberOfDecks){
        super();
        deck = new Deck(numberOfDecks);
    }
    dealCard(){
        return this.deck.removeCardFromTopOfDeck();
    }
    shuffleDeck(){
        this.deck.shuffleDeck();
        //adds reshuffle card to bottom half of deck
        this.deck.cutDeck();
    }
    reShuffleDeck(){
        if(this.deck.isnNextCardReshuffle()){
            //take reshuffle card off of deck.
            this.deck.removeCardFromTopOfDeck();
            //shuffles deck and adds reshuffle card back in.
            this.shuffleDeck();
        }
    }
}

export default Dealer;