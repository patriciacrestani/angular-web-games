import { CardTypeEnum } from "../enums/card-type-enum";
import { CardValueEnum } from "../enums/card-value-enum";

export class Card {
    id: number;
    type: number;
    value: number;
    nextValue: number;
    previousValue: number;
    typesAllowed: number[];
    blocked: boolean;
    nextCard: Card | null;
    previousCard: Card | null;
    image: string;

    constructor(type: number, value: number) {
        this.type = type;
        this.blocked = true;
        this.typesAllowed = CardTypeEnum.getOppositeTypes(type);
        this.value = value;
        this.nextCard = null;
        this.previousCard = null;
        this.id = Number(type.toString() + value.toString());
        
        if(value == CardValueEnum.Ace) {
            this.previousValue = CardValueEnum.King;
        } else {
            this.previousValue = value - 1;
        }

        if(value == CardValueEnum.King) {
            this.nextValue = CardValueEnum.Ace;
        } else {
            this.nextValue = value + 1;
        }

        this.image = "assets/images/cards/" + type.toString() + value.toString() + ".png";
    }

    mapCard(card: any) {
        return new Card(card.type, card.value);
    }

    blockCard() {
        this.blocked = true;
    }

    unblockCard() {
        this.blocked = false;
    }

    addNextCard(card: Card) {
        this.nextCard = card;
    }

    addPreviousCard(card: Card) {
        this.previousCard = card;
    }

    checkOppositeType(type: number): boolean{
        return this.typesAllowed.some(t => t === type);
    }

    checkPreviousValue(value: number): boolean{
        return (this.previousValue == value);
    }

    checkNextValue(value: number): boolean{
        return (this.nextValue == value);
    }
}