class Card {
    suit;
    denomination;
    value;
    isReshuffle;
    constructor(){
        this.suit = "";
        this.denomination = "";
        this.value = 0;
        this.isReshuffle = false;
    }
    constructor(suit, denomination) {
        this.suit = suit;
        this.denomination = denomination;
        this.assignValue(denomination);
        this.isReshuffle = false;
    }
    assignValue(denomination) {
        //assigns the value of the card based on the denomination
        // 2-10 = 2-10
        // face cards = 10
        //ace default value = 11
        switch (denomination) {
            case "two":
                this.value = 2;
                break;
            case "three":
                this.value = 3;
                break;
            case "four":
                this.value = 4;
                break;
            case "five":
                this.value = 5;
                break;
            case "six":
                this.value = 6;
                break;
            case "seven":
                this.value = 7;
                break;
            case "eight":
                this.value = 8;
                break;
            case "nine":
                this.value = 9;
                break;
            case "ten":
                this.value = 10;
                break;
            case "jack":
                this.value = 10;
                break;
            case "queen":
                this.value = 10;
                break;
            case "king":
                this.value = 10;
                break;
            case "ace":
                this.value = 11;
                break;
        };
    }
    get cardName(){
        return `${this.denomination} of ${this.suit}`;
    }
    setCardProperties(suit, denomination){
        this.suit = suit;
        this.denomination = denomination;
        this.assignValue(denomination);
    }
}
export default Card;