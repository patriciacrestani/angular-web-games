export class CardTypeEnum {
    public static Heart: number = 1;
    public static Spades: number = 2;
    public static Diamond: number = 3;
    public static Club: number = 4;

    public static getTypes() {
        var values: number[] = Object.keys(CardTypeEnum).map(value => {
            return CardTypeEnum[value as keyof CardTypeEnum];
        });
        return values;
    }

    public static getOppositeTypes(type: number) {
        switch(type) {
            case CardTypeEnum.Heart:
            case CardTypeEnum.Diamond:
                return [
                    CardTypeEnum.Spades,
                    CardTypeEnum.Club
                ];
            default:
                return [
                    CardTypeEnum.Heart,
                    CardTypeEnum.Diamond
                ];
        }
    }
}
