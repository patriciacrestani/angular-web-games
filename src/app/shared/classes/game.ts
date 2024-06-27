export class Game {
    id: number;
    title: string;
    class: string;
    image: string;
    url: string;

    constructor(id: number, title: string, cssclass: string, image: string, url: string) {
        this.id = id;
        this.title = title;
        this.class = cssclass;
        this.image = image;
        this.url = url;
    }
}