import Card from "./Card";
import Reshuffle from "./Reshuffle";
class Deck {
    cards;
    numberOfDecks;
    constructor(numberOfDecks = 6) {
        cards = [];
        this.numberOfDecks = numberOfDecks;
    }
    makeCardDeck() {
        //adds cards to the deck
        //13 denominations
        //each denomination = numberOfDecks*4 suits
        const denominations = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
        for (let i=0;i<13;i++) {
            //13 denominations
            for(let j=0;j<this.numberOfDecks*4; j++){
                let newCard = new Card();
                //spades
                if(0 <= j < this.numberOfDecks){
                    newCard.setCardProperties("spades", denominations[i]);
                }
                //clubs
                else if(this.numberOfDecks <= j < this.numberOfDecks*2){
                    newCard.setCardProperties("clubs", denominations[i]);
                }
                //hearts
                else if(this.numberOfDecks*2 <= j < this.numberOfDecks*3){
                    newCard.setCardProperties("clubs", denominations[i]);
                }
                //diamonds
                else if(this.numberOfDecks*3 <= j < this.numberOfDecks*4){
                    newCard.setCardProperties("clubs", denominations[i]);
                }
                //add card to array
                this.cards.push(newCard);
            }
        }
    }
    shuffleDeck() {
        //randomize the cards in the deck
        //use map to add a random value between  0 and 1 to each element
        //sort the values based on the new random value
        //use map again to change the array back to how it was before the first map
        cards.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    }
    cutDeck(){
        //choose a random place in the second half of the card array to place the reshuffle card.
        let end = this.numberOfDecks*52;
        let start = end/2;
        let index = Math.floor(Math.random *(end-start) + start);
        this.cards.splice(index,0,new Reshuffle());
    }
    removeReshuffleCard(){
        let index = this.cards.findIndex((elem) => elem.isReshuffle);
        this.card.splice(index, 1);
    }
    removeCardFromTopOfDeck(){
        return this.cards.unShift();
    }
    isNextCardReShuffle(){
        return (this.cards[0].isReshuffle);
    }
}
export default Deck;