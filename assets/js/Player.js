class Player {
    hand;
    value;
    constructor() {
        this.hand = [];
        this.value = 0;
    }
    addCardToHand(card) {
        this.hand.push(card);
    }
    calculateHandValue() {
        let total = 0;
        for (let i = 0; i < this.hand.length; i++) {
            total += this.hand[i].value;
        }
        if (total <= 21) {
            return total;
        }
        let numberOfAces = this.hand.filter((elem) => elem.denomination === "ace");
        for (let i = 0; i < numberOfAces; i++) {
            total -= 10;
            if (total < 21) {
                return total;
            }
        }
        //bust
        return -1;
    }
    setValue() {
        this.value = this.calculateHandValue();
    }
}

//export default Player;