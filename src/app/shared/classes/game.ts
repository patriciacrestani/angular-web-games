export class Game {
    id: number;
    title: string;
    image: string;
    url: string;

    constructor(id: number, title: string, image: string, url: string) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.url = url;
    }
}