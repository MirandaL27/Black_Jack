class Player {
    hand;
    value;
    constructor(){
        hand = [];
        value = 0;
    }
    addCardToHand(card){
        this.hand.push(card);
    }
    calculateHandValue(){
        let total = 0;
        for(let i=0;i<hand.length;i++){
            total+=this.hand[i].value;
        }
        if(total > 21){
            let numberOfAces = hand.filter((elem) => elem.denomination === "ace");
            for(let i=0;i<numberOfAces;i++){
                total -= 10;
                if(total<21){
                    return total;
                }
            }
        }
        //bust
        return -1;
    }
    setValue(){
        this.value = this.calculateHandValue();
    }
}

export default Player;