import Card from './Card'

class Reshuffle extends Card{
    constructor(){
        this.suit = "";
        this.denomination = "";
        this.value = 0;
        this.isReshuffle = true;
    }
}

export default Reshuffle;