import { Component, OnInit, Input } from '@angular/core';
import { IGameBoard, ITileSpace } from '../igame-board';
import { cloneDeep } from 'lodash';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Winner } from '../i-winner';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() GameType: string;
  @Input() BoardSize: string;


  board: string[] = [];
  player1: string;
  player2: string;
  winner: string;
  xIsNext: boolean;
  isTie: boolean;
  isGameOver = true;

  is3x3: boolean;
  is4x4: boolean;
  isAIvsAI: boolean = false;

  delayTime: number = 5000;//timer delay in milliseconds




  xWins: number;
  oWins: number;

  constructor() { }

  ngOnInit() {

    if (this.BoardSize == '3') {
      this.is3x3 = true;
      this.is4x4 = false;
    }
    else if (this.BoardSize == '4') {
      this.is4x4 = true;
      this.is3x3 = false;
    }


    this.newGame();
    this.xWins = 0;
    this.oWins = 0;
    this.isTie = false;
    this.player2 = 'O';
    this.player1 = 'X';
    this.isGameOver = false;
    this.winner = null;
    if (this.GameType == "AIvsAI") {
      this.isAIvsAI = true;
    }
  
  }




  newGame() {
    console.log("newGame init begin");
    if (this.BoardSize == '3') {
      this.board = Array(9).fill(null);
    }

    else if (this.BoardSize == '4') {
      this.board = Array(16).fill(null);

    }

    this.winner = null;
    this.xIsNext = true;
    this.isGameOver = false;
    this.isTie = false;


    console.log("newGame init end");
  }

  get player() {
      return this.xIsNext ? 'X' : 'O';
    
  }


  makeMove(idx) {
    if (this.GameType == 'Local') {
      this.makeLocalMove(idx);
    }
    else if (this.GameType == 'PlayerVsAI') {
      this.onMoveWithAI(idx)

      //this.makeLocalMove(idx);
      //this.makeRandomAIMove();
    }

    const winner = this.checkWin(this.board);
    if (winner) {
      this.writeWinner(winner);
    }

  }

  private delay(ms: number) { //pass a time in milliseconds to this function

    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  private async startAIvsAI() {
    
    this.newGame();
    var winner: string;
    this.makeLocalMove(this.makeRandomAIMove(this.board));
    while (!this.checkWin(this.board)) {
      const winnerCheck = this.checkWin(this.board);
      if (winnerCheck) {
        this.writeWinner(winnerCheck);
      }

     // winner = this.checkWin(this.board);
      
        await this.delay(this.delayTime);
          this.onMoveAi(this.player1, this.player2);
        

      //winner = this.checkWin(this.board);

      if (!this.checkWin(this.board)) {
        await this.delay(this.delayTime);
           this.onMoveAi(this.player2, this.player1);

        }
      
    }
    winner = this.checkWin(this.board);
    console.log("WINNER: " + winner);
    if (winner != 'draw') {
      this.winner = winner;
    }
    else if (winner == 'draw') {
      this.isTie = true;
    }

  }


  makeLocalMove(index) {
    if (this.isGameOver) {
      return;
    }
    if (this.board[index] === null) {
      this.board[index] = this.player;
      const winner = this.checkWin(this.board);
      if (winner) {
        if (winner == 'X')
          this.xWins++;

        else if (winner == 'O')
          this.oWins++;

        this.writeWinner(winner);
      }
      this.xIsNext = !this.xIsNext;
    }
  }

 
  makeRandomAIMove(board: string[]) {
    //console.log("MakeRandomAIMove start");
    var pass = false;
    if (!this.checkWin(this.board)) {
      while (pass == false) {
        if (this.BoardSize == '3') {
          var index: number = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
        }
        else if (this.BoardSize == '4') {
          var index: number = Math.floor(Math.random() * (15 - 0 + 1)) + 0;

        }
        //console.log("AI Check Square " + index);
        if (!board[index]) {
          //console.log("finish Check = space available");
          return index;
          pass = true;
        }
      }
      

    }
  }


 

  onMoveWithAI(index: number) {

    const winner = this.checkWin(this.board);
    if (winner) {
      this.writeWinner(winner);
    }
    if (this.isGameOver) {
      return;
    }
    if (this.board[index] === null) {
      this.board[index] = this.player1;
    }
        if (this.isGameOver == false) {
          this.onMoveAi(this.player1, this.player2);
        }

    if (winner) {
      this.writeWinner(winner);
    }
    
  }

  private onMoveAi(player1, player2) {
    if (this.isGameOver) {
      return;
    }
    else {
      const index = this.minMax(this.board, 0, player2);
      this.board[index] = player2;
      const winner = this.checkWin(this.board);
      if (winner) {
        if (winner == 'X')
          this.xWins++;

        else if (winner == 'O')
          this.oWins++;

      }
    }
  }

  minMax(board: string[], depth: number, player: string) {

    if ((depth <= 3 && depth >= -3) || this.BoardSize == '3') {
      const result = this.checkWin(board);
      if (result) {
        if (result === this.player1) {
          return -100 + depth;
        } else if (result === this.player2) {
          return 100 - depth;
        } else if (result === 'draw') {
          return 0;
        }
      }

      const moves = [];
      board.forEach((v, i) => {
        if (v === null) {
          const newBoard = [...board];
          newBoard[i] = player;
          const score = this.minMax(
            newBoard,
            depth + 1,
            player === this.player1 ? this.player2 : this.player1
          );
          moves.push({
            index: i,
            score: score,
          });
        }
      });



      const minOrMax =
        player === this.player1
          ? Math.min(...moves.map(x => x.score))
          : Math.max(...moves.map(x => x.score));

      const move = moves.find(x => x.score === minOrMax);
      if (depth === 0) {
        return move.index;
      } else {
        return move.score;
      }
    }
    else {

      return this.makeRandomAIMove(board);
    }
  }

  checkWin(board: string[]) {
    if (this.BoardSize == '3') {
      return this.checkWin3x3(board);
    }
    else if (this.BoardSize == '4') {
      return this.checkWin4x4(board);
    }
  }


  checkWin3x3(board: string[]) {

    //Rows

    if (board[0] === board[1] && board[0] === board[2] && board[0]) {
      return board[0];
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3]) {
      return  board[3];
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6]) {
      return board[6];
    }

    //Columns

    if (board[0] === board[3] && board[0] === board[6] && board[0]) {
      return  board[0];
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1]) {
      return  board[1];
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2]) {
      return  board[2];
    }

    //Diagonals

    if (board[0] === board[4] && board[0] === board[8] && board[0]) {
      return  board[0];
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2]) {
      return board[2];
    }

    if (board.every(cell => cell !== null)) {
      return  'draw';
    }
    return null;
  }

  checkWin4x4(board: string[]) {
    //Rows

    if (board[0] === board[1] && board[0] === board[2]  && board[0] === board[3] && board[0]) {
      return  board[0];
    }

    if (board[4] === board[5] && board[4] === board[6] && board[4] === board[7] && board[4]) {
      return  board[4];
    }

    if (board[8] === board[9] && board[8] === board[10] && board[8] === board[11] && board[8]) {
      return  board[8];
    }

    if (board[12] === board[13] && board[12] === board[14] && board[12] === board[15] && board[12]) {
      return  board[12];
    }

    //Columns

    if (board[0] === board[4] && board[0] === board[8] && board[0] === board[12] && board[0]) {
      return  board[0];
    }

    if (board[1] === board[5] && board[1] === board[9] && board[1] === board[13] && board[1]) {
      return  board[1];
    }

    if (board[2] === board[6] && board[2] === board[10] && board[2] === board[14] && board[2]) {
      return  board[2];
    }

    if (board[3] === board[7] && board[3] === board[11] && board[3] === board[15] && board[3]) {
      return  board[3];
    }

    //Diagonals

    if (board[0] === board[5] && board[0] === board[10] && board[0] === board[15] && board[0]) {
      return  board[0];
    }

    if (board[3] === board[6] && board[3] === board[9] && board[3] === board[12] && board[3]) {
      return  board[3];
    }

    //Squares

    if (board[0] === board[1] && board[0] === board[4] && board[0] === board[5] && board[0]) {
      return  board[0];
    }

    if (board[2] === board[3] && board[2] === board[6] && board[2] === board[7] && board[2]) {
      return  board[2];
    }

    if (board[8] === board[9] && board[8] === board[12] && board[8] === board[13] && board[8]) {
      return  board[8];
    }

    if (board[10] === board[11] && board[10] === board[14] && board[10] === board[15] && board[10]) {
      return  board[10];
    }

    if (board[1] === board[2] && board[1] === board[5] && board[1] === board[6] && board[1]) {
      return  board[1];
    }

    if (board[4] === board[5] && board[4] === board[8] && board[4] === board[9] && board[4]) {
      return  board[4];
    }

    if (board[9] === board[10] && board[9] === board[13] && board[9] === board[14] && board[9]) {
      return  board[9];
    }

    if (board[6] === board[7] && board[6] === board[10] && board[6] === board[11] && board[6]) {
      return  board[6];
    }

    if (board[5] === board[6] && board[5] === board[9] && board[5] === board[10] && board[5]) {
      return  board[5];
    }

    //Diamonds

    if (board[1] === board[4] && board[1] === board[6] && board[1] === board[9] && board[1]) {
      return  board[1];
    }

    if (board[2] === board[5] && board[2] === board[7] && board[2] === board[10] && board[2]) {
      return board[2];
    }

    if (board[5] === board[8] && board[5] === board[10] && board[5] === board[13] && board[5]) {
      return  board[5];
    }

    if (board[6] === board[9] && board[6] === board[11] && board[6] === board[14] && board[6]) {
      return board[6];
    }


    if (board.every(cell => cell !== null)) {
      return  'draw' ;
    }
    return null;
  }



  writeWinner(winner) {
    if (winner == 'X') {
      this.isGameOver = true;
      this.winner = 'X';
    }
    else if (winner == 'O') {
      this.isGameOver = true;
      this.winner = 'O';
    }

    
  }











}
