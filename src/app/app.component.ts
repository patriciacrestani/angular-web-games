import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Card } from './classes/card';
import { CardType } from './enums/card-type-enum';
import { CardValue } from './enums/card-value-enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Solitaire';
  deck: Card[] = [];
  stock: Card[] = [];
  clubDeck: Card[] = [];
  spadesDeck: Card[] = [];
  heartDeck: Card[] = [];
  diamondDeck: Card[] = [];
  firstColumn: Card[] = [];
  secondColumn: Card[] = [];
  thirdColumn: Card[] = [];
  fourthColumn: Card[] = [];
  fifthColumn: Card[] = [];
  sixthColumn: Card[] = [];
  seventhColumn: Card[] = [];
  randomNumbersControl: number[] = [];

  constructor() {
    this.setDeck();
  }

  get unblockedStock(): Card[] {
    if(!this.hasStock() || !this.hasUnblockedStock()) {
      return [];
    }
    return this.stock.filter(card => !card.blocked);
  }

  get blockedStock(): Card[] {
    if(!this.hasStock() || !this.hasBlockedStock()) {
      return [];
    }
    return this.stock.filter(card => card.blocked);
  }
  
  get lastUnblockedStockCard(): Card {
    return this.unblockedStock[this.unblockedStock.length - 1];
  }

  hasStock(): boolean {
    return this.stock && this.stock.length > 0;
  }

  hasBlockedStock(): boolean {
    return this.hasStock() && this.stock.some(card => card.blocked);
  }

  hasUnblockedStock(): boolean {
    return this.hasStock() && this.stock.some(card => !card.blocked);
  }

  hasClubDeck(): boolean {
    return this.clubDeck && this.clubDeck.length > 0;
  }

  get lastClubDeckCard(): Card {
    return this.clubDeck[this.clubDeck.length - 1];
  }

  hasSpadesDeck(): boolean {
    return this.spadesDeck && this.spadesDeck.length > 0;
  }

  get lastSpadesDeckCard(): Card {
    return this.spadesDeck[this.spadesDeck.length - 1];
  }

  hasHeartDeck(): boolean {
    return this.heartDeck && this.heartDeck.length > 0;
  }

  get lastHeartDeckCard(): Card {
    return this.heartDeck[this.heartDeck.length - 1];
  }

  hasDiamondDeck(): boolean {
    return this.diamondDeck && this.diamondDeck.length > 0;
  }

  get lastDiamondDeckCard(): Card {
    return this.diamondDeck[this.diamondDeck.length - 1];
  }

  setDeck() {
    const types: number[] = CardType.getTypes();
    const values: number[] = CardValue.getValues();

    this.deck = [];

    types.forEach(type => {
      let carta;
      values.forEach(value => {
        carta = new Card(type, value);
        this.deck.push(carta);
      });
    });
    
    console.log(this.deck);
    this.setGame();
  }

  getRandomNumber(maxNumber: number) {
    return Math.floor(Math.random() * maxNumber);
  }

  controlRandomNumbers(number: number): boolean {
    if(!this.randomNumbersControl || this.randomNumbersControl.length <= 0) {
      this.randomNumbersControl = [];
      this.randomNumbersControl.push(number);
      return false;
    }

    if(this.randomNumbersControl.find(num => num == number)) {
      return true;
    }

    this.randomNumbersControl.push(number);
    return false;
  }

  setStock() {
    for(let i = 0; i < this.deck.length; i++){
      if(this.randomNumbersControl.find(indice => indice == i)) {
        continue;
      }
      this.stock.push(this.deck[i]);
    }
  }

  setColumn(columnNumber: number) {
    let randomNumber;
    let column = [];

    for(let i = columnNumber; i > 0; i--){
      randomNumber = this.getRandomNumber(52);
      console.log(randomNumber);
      while(this.controlRandomNumbers(randomNumber)) {
        randomNumber = this.getRandomNumber(52);
      }

      column.push(this.deck[randomNumber]);
    }

    switch(columnNumber) {
      case 1:
        this.firstColumn = [...column];
        this.firstColumn[columnNumber - 1].unblockCard();
        break;
      case 2:
        this.secondColumn = [...column];
        this.secondColumn[columnNumber - 1].unblockCard();
        break;
      case 3:
        this.thirdColumn = [...column];
        this.thirdColumn[columnNumber - 1].unblockCard();
        break;
      case 4:
        this.fourthColumn = [...column];
        this.fourthColumn[columnNumber - 1].unblockCard();
        break;
      case 5:
        this.fifthColumn = [...column];
        this.fifthColumn[columnNumber - 1].unblockCard();
        break;
      case 6:
        this.sixthColumn = [...column];
        this.sixthColumn[columnNumber - 1].unblockCard();
        break;
      case 7:
        this.seventhColumn = [...column];
        this.seventhColumn[columnNumber - 1].unblockCard();
        break; 
    }
  }

  setGame() {
    let count = 7;

    while(count != 0) {
      this.setColumn(count);
      count--;
    }

    this.setStock();
  }

  unblockStockCard() {
    let index = 0;
    if(this.hasUnblockedStock()) {
      index = this.unblockedStock.length;
    }
    this.stock[index].unblockCard();
  }

  blockAllStockCards() {
    this.stock.forEach(card => {
      card.blockCard();
    });
  }

  getCardImage(card: Card) {
    if(card.blocked) {
      return "assets/images/cards/back.png";
    }

    return card.image;
  }
}
