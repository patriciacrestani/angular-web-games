import { Game } from "../classes/game";

export class GamesEnum {
    public static Solitaire: Game = {
        id: 1,
        title: "Solitaire",
        class: "solitaire",
        image: "assets/images/games/solitaire.png",
        url: "/solitaire"
    };

    public static Minesweeper: Game = {
        id: 2,
        title: "Minesweeper",
        class: "minesweeper",
        image: "assets/images/games/minesweeper.png",
        url: "/minesweeper"
    };

    public static getGames(): Game[] {
        var games: Game[] = Object.keys(GamesEnum).map(game => {
            return GamesEnum[game as keyof GamesEnum];
        });
        return games;
    }
}

