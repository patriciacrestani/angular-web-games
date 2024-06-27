import { Component } from '@angular/core';
import { Game } from '../shared/classes/game';
import { GamesEnum } from '../shared/enums/games-enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  games: Game[] = [];

  constructor() {
    this.games = GamesEnum.getGames();
  }

  checkGameList(): boolean {
    return this.games && this.games.length > 0;
  }
}
