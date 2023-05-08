export default class cards {
    constructor(alias, nType, cardNumber, magnitude, mCost, sprite, annotation, caption) {
        this.name = alias;
        this.nID = nType;
        this.cNum = cardNumber;
        this.mag = magnitude;
        this.cost = mCost;
        this.spriteImage = sprite;
        this.ann = annotation;
        this.cap = caption;
    }
}