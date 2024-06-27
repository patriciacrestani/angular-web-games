import { Game } from "../classes/game";

export class GamesEnum {
    public static Solitaire: Game = {
        id: 1,
        title: "Solitaire",
        image: "assets/images/games/solitaire.jpg",
        url: "/solitaire"
    };

    public static Minesweeper: Game = {
        id: 2,
        title: "Minesweeper",
        image: "assets/images/games/solitaire.jpg",
        url: "/minesweeper"
    };

    public static getGames(): Game[] {
        var games: Game[] = Object.keys(GamesEnum).map(game => {
            return GamesEnum[game as keyof GamesEnum];
        });
        return games;
    }
}

