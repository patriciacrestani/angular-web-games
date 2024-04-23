export class CardValue {
    public static Ace: number = 1;
    public static Two: number = 2;
    public static Three: number = 3;
    public static Four: number = 4;
    public static Five: number = 5;
    public static Six: number = 6;
    public static Seven: number = 7;
    public static Eight: number = 8;
    public static Nine: number = 9;
    public static Ten: number = 10;
    public static Jack: number = 11;
    public static Queen: number = 12;
    public static King: number = 13;

    public static getValues(): number[] {
        var values: number[] = Object.keys(CardValue).map(value => {
            return CardValue[value as keyof CardValue];
        })
        return values;
    }
}

