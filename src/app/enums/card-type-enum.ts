export class CardType {
    public static Heart: number = 1;
    public static Spades: number = 2;
    public static Diamond: number = 3;
    public static Club: number = 4;

    public static getTypes() {
        var values: number[] = Object.keys(CardType).map(value => {
            return CardType[value as keyof CardType];
        });
        return values;
    }

    public static getOppositeTypes(type: number) {
        switch(type) {
            case CardType.Heart:
            case CardType.Diamond:
                return [
                    CardType.Spades,
                    CardType.Club
                ];
            default:
                return [
                    CardType.Heart,
                    CardType.Diamond
                ];
        }
    }
}
