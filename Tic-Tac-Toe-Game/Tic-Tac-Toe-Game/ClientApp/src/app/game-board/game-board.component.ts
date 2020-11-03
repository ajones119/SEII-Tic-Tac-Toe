import { Component, OnInit, Input } from '@angular/core';
import { IGameBoard, ITileSpace } from '../igame-board';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() GameType: string;

  squares: any[];
  xIsNext: boolean;
  winner: string;
  isTie: boolean;

  xWins: number;
  oWins: number;

  constructor() { }

  ngOnInit() {
    this.newGame();
    this.xWins = 0;
    this.oWins = 0;
    this.isTie = false;
    
  }

  newGame() {
    console.log("newGame init begin");
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;

    console.log("newGame init end");
  }

  get player() {
      return this.xIsNext ? 'X' : 'O';
    
  }

  makeMove(idx: number) {
    if (!this.winner) {
      console.log("makeMove start, Player: " + this.xIsNext);
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
      }

      this.winner = this.calculateWinner();
      if (this.winner == 'X') {
        this.xWins++;
      }
      else if (this.winner == 'O') {
        this.oWins++;
      }
      console.log("MakeMove End");
    }

    this.isTie = this.checkForTie();
    if (this.GameType == 'PlayerVsAI' && !this.winner && !this.isTie) {
      console.log("AI Start");
        var canMove: boolean = false;
        while (canMove == false) {
          canMove = this.makeAIMove();
        }


        this.xIsNext = !this.xIsNext;
        this.winner = this.calculateWinner();
        if (this.winner == 'X') {
          this.xWins++;
        }
        else if (this.winner == 'O') {
          this.oWins++;
        }
        console.log("Make AI Move End");

    }
    this.isTie = this.checkForTie();
    console.log("Make Move End");
  }




  makeAIMove() {
    console.log("MakeAIMove start");
    var index: number = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    console.log("AI Check Square " + index);
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      return true;
    }
    else
      return false;


  }


  makeRandomAIMove() {
    console.log("MakeRandomAIMove start");
    var index: number = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    console.log("AI Check Square " + index);
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      return true;
    }
    else
      return false;


  }


  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  checkForTie() {
    console.log("Check for tie start");
    if (!this.winner) {
      for (var index: number = 0; index < 9; index++) {
        if (!this.squares[index]) {
          return false;
          console.log("Found Tie");
        }
      }
      console.log("No tie found");
      return true;
    }
  }

}
