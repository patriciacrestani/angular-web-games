import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Card } from './classes/card';
import { CardType } from './enums/card-type-enum';
import { CardValue } from './enums/card-value-enum';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardId } from './enums/card-id-enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DragDropModule],
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
  cardsIds: number[] = []

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
    return this.clubDeck && this.clubDeck.length > 1;
  }

  get lastClubDeckCard(): Card {
    return this.clubDeck[this.clubDeck.length - 1];
  }

  hasSpadesDeck(): boolean {
    return this.spadesDeck && this.spadesDeck.length > 1;
  }

  get lastSpadesDeckCard(): Card {
    return this.spadesDeck[this.spadesDeck.length - 1];
  }

  hasHeartDeck(): boolean {
    return this.heartDeck && this.heartDeck.length > 1;
  }

  get lastHeartDeckCard(): Card {
    return this.heartDeck[this.heartDeck.length - 1];
  }

  hasDiamondDeck(): boolean {
    return this.diamondDeck && this.diamondDeck.length > 1;
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
    
    this.setGame();
  }

  getRandomId(maxNumber: number) {
    let randomIndex: number = Math.floor(Math.random() * maxNumber);
    let randomId = this.cardsIds[randomIndex];
    this.cardsIds.splice(randomIndex, 1);
    return randomId;
  }
  
  shuffleCards(cards: Card[]): Card[] { 
    for (let i = cards.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [cards[i], cards[j]] = [cards[j], cards[i]]; 
    } 
    return cards; 
  }; 

  setStock() {
    let stockAux: Card[] = [];
    for(let i = 0; i < this.cardsIds.length; i++){
      let cardFromRandomId = this.deck.find(card => card.id == this.cardsIds[i]);
      
      if(cardFromRandomId) {
        stockAux.push(cardFromRandomId);
      }
    }
    this.stock = this.shuffleCards(stockAux);
  }

  setColumn(columnNumber: number) {
    let randomId: number;
    let column: Card[] = [];

    for(let i = columnNumber; i > 0; i--){
      randomId = this.getRandomId(this.cardsIds.length - 1);

      let cardFromRandomId = this.deck.find(card => card.id == randomId);
      
      if(cardFromRandomId) {
        column.push(cardFromRandomId);
      }
    }

    switch(columnNumber) {
      case 1:
        this.firstColumn = [...column];
        this.unblockLastCard(this.firstColumn);
        break;
      case 2:
        this.secondColumn = [...column];
        this.unblockLastCard(this.secondColumn);
        break;
      case 3:
        this.thirdColumn = [...column];
        this.unblockLastCard(this.thirdColumn);
        break;
      case 4:
        this.fourthColumn = [...column];
        this.unblockLastCard(this.fourthColumn);
        break;
      case 5:
        this.fifthColumn = [...column];
        this.unblockLastCard(this.fifthColumn);
        break;
      case 6:
        this.sixthColumn = [...column];
        this.unblockLastCard(this.sixthColumn);
        break;
      case 7:
        this.seventhColumn = [...column];
        this.unblockLastCard(this.seventhColumn);
        break; 
    }
  }

  setTypesDecks() {
    this.heartDeck.push(new Card(CardType.Heart, 0));
    this.diamondDeck.push(new Card(CardType.Diamond, 0));
    this.spadesDeck.push(new Card(CardType.Spades, 0));
    this.clubDeck.push(new Card(CardType.Club, 0));
  }

  unblockLastCard(column: Card[]) {
    if(column.length == 0) {
      return;
    }
    column[column.length - 1].unblockCard();
  }

  setGame() {
    console.log(this.deck);
    this.cardsIds = [...CardId.getIds()];
    console.log(this.deck);
    let count = 7;

    while(count != 0) {
      this.setColumn(count);
      count--;
    }

    this.setStock();
    this.setTypesDecks();
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

  transferCard(previousColumn: Card[], currentColumn: Card[], previousCardIndex: number) {
    let transferedCard = Object.assign({}, previousColumn[previousCardIndex]);
    previousColumn.splice(previousCardIndex, 1);
    currentColumn.push(transferedCard);
  }

  checkStock(list: CdkDropList) {
    return list.id == "cdk-drop-list-0";
  }

  sortPredicate(index: number, card: CdkDrag<Card>, dropList: CdkDropList<Card[]>): boolean{
    return (index == (dropList.data.length));
  }

  deckPredicate(cardDropped: CdkDrag<any>, dropList: CdkDropList<any>): boolean{
    return (cardDropped.data.type == dropList.data[dropList.data.length -1].type);
  }

  checkCardDraggable(card: Card, cardIndex: number, column: Card[]): boolean {
    if(card.blocked) {
      return true;
    }

    if(cardIndex != (column.length - 1)) {
      return true;
    }

    return false;
  }

  drop(event: CdkDragDrop<Card[], Card[], Card>) {
    console.log("drop", event);
    if (event.previousContainer === event.container) {
      return;
    }

    let cardDropped: Card = event.item.data;
    let lastCardDropContainer: Card = event.container.data[event.container.data.length - 1];

    if(lastCardDropContainer) {
      if(!lastCardDropContainer.checkOppositeType(cardDropped.type)){
        console.log("not opposite value");
        return;
      }
  
      if(!lastCardDropContainer.checkPreviousValue(cardDropped.value)){
        console.log("not previous value");
        return;
      }
    }


    let previousIndex = event.previousIndex;

    if(this.checkStock(event.previousContainer)) {
      let previousIndex = event.previousIndex;
      previousIndex = this.stock.findIndex(c => c.id == cardDropped.id);
      console.log("stock", this.stock);
      console.log("carta", cardDropped);
      console.log("index in stock", this.stock.findIndex(c => c.id == cardDropped.id));
      console.log("previousIndex", previousIndex);

      transferArrayItem(
        this.stock,
        event.container.data,
        previousIndex,
        event.container.data.length
      );
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    if(!this.checkStock(event.previousContainer)) {
      this.unblockLastCard(event.previousContainer.data);
    }
  }

  dropDeck(event: CdkDragDrop<Card[], Card[], Card>) {
    console.log("dropDeck", event);
    let cardDropped: Card = event.item.data;
    let lastCardDeck: Card = event.container.data[event.container.data.length - 1];

    if(lastCardDeck.type != cardDropped.type){
      console.log("different type");
      return;
    }

    if(!lastCardDeck.checkNextValue(cardDropped.value)){
      console.log("not next value");
      return;
    }
    
    if(this.checkStock(event.previousContainer)) {
      let previousIndex = event.previousIndex;
      previousIndex = this.stock.findIndex(c => c.id == cardDropped.id);
      console.log("stock", this.stock);
      console.log("carta", cardDropped);
      console.log("index in stock", this.stock.findIndex(c => c.id == cardDropped.id));
      console.log("previousIndex", previousIndex);

      transferArrayItem(
        this.stock,
        event.container.data,
        previousIndex,
        event.container.data.length
      );
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.container.data.length
    );

    if(!this.checkStock(event.previousContainer)) {
      this.unblockLastCard(event.previousContainer.data);
    }
  }

  blockDrop() {
    return false;
  }

  undo() {
    let index = 0;
    if(this.hasUnblockedStock()) {
      index = this.unblockedStock.length - 1;
    }
    this.stock[index].blockCard();
  }

  blockAllDeck() {
    this.deck.forEach(card => card.blockCard());
  }

  newGame() {
    this.stock = [];
    this.clubDeck = [];
    this.spadesDeck = [];
    this.heartDeck = [];
    this.diamondDeck = [];
    this.firstColumn = [];
    this.secondColumn = [];
    this.thirdColumn = [];
    this.fourthColumn = [];
    this.fifthColumn = [];
    this.sixthColumn = [];
    this.seventhColumn = [];
    this.cardsIds = CardId.getIds();
    this.blockAllDeck();
    this.setGame();
  }
}
