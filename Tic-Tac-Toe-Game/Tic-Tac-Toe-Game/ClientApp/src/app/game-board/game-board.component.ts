import { Component, OnInit, Input } from '@angular/core';
import { IGameBoard, ITileSpace } from '../igame-board';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() GameType: string;
  @Input() BoardSize: number;


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




  xWins: number;
  oWins: number;

  constructor() { }

  ngOnInit() {

    if (this.BoardSize == 3) {
      this.is3x3 = true;
      this.is4x4 = false;
    }
    else if (this.BoardSize == 4) {
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
    if (this.BoardSize == 3) {
      this.board = Array(9).fill(null);
    }

    else if (this.BoardSize == 4) {
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

  }

  startAIvsAI() {
    this.newGame();
    this.makeRandomAIMove();
    while (!this.checkWin(this.board)) {
      this.winner = this.checkWin(this.board);
      this.onMoveAi(this.player2, this.player1);
      this.winner = this.checkWin(this.board);
      this.onMoveAi(this.player1, this.player2);
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
        if (winner.winner == 'X')
          this.xWins++;

        else
          this.oWins++;
        this.writeWinner(winner);
      }
      this.xIsNext = !this.xIsNext;
    }
  }

 
  makeRandomAIMove(board: string[]) {
    console.log("MakeRandomAIMove start");
    var pass = false;
    if (!this.checkWin(this.board)) {
      while (pass == false) {
        if (this.BoardSize == 3) {
          var index: number = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
        }
        else if (this.BoardSize == 4) {
          var index: number = Math.floor(Math.random() * (15 - 0 + 1)) + 0;

        }
        console.log("AI Check Square " + index);
        if (!board[index]) {
          console.log("finish Check = space available");
          return index;
          pass = true;
        }
      }
      

    }
  }


 

  onMoveWithAI(index: number) {
    if (this.isGameOver) {
      return;
    }
    if (this.board[index] === null) {
      this.board[index] = this.player1;
      const winner = this.checkWin(this.board);
      if (winner) {
        this.writeWinner(winner);
        if (winner.winner == 'X')
          this.xWins++;

        else
          this.oWins++;
      } else {
        this.onMoveAi(this.player1, this.player2);
      }
    }
  }

  private onMoveAi(player1, player2) {
    const index = this.minMax(this.board, 0, player2);
    this.board[index] = player2;
    const winner = this.checkWin(this.board);
    if (winner) {
      
      this.writeWinner(winner);
      if (winner.winner == 'X')
        this.xWins++;

      else
        this.oWins++;
    }
  }

  minMax(board: string[], depth: number, player: string) {

    if (depth < 3) {
      console.log("DEPTH" + depth);
      const result = this.checkWin(board);
      if (result) {
        if (result.winner === this.player1) {
          return -100 + depth;
        } else if (result.winner === this.player2) {
          return 100 - depth;
        } else if (result.winner === 'draw') {
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
    if (this.BoardSize == 3) {
      return this.checkWin3x3(board);
    }
    else if (this.BoardSize == 4) {
      return this.checkWin4x4(board);
    }
  }


  checkWin3x3(board: string[]) {

    //Rows

    if (board[0] === board[1] && board[0] === board[2] && board[0]) {
      return { winner: board[0], cells: [0, 1, 2] };
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3]) {
      return { winner: board[3], cells: [3, 4, 5] };
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6]) {
      return { winner: board[6], cells: [6, 7, 8] };
    }

    //Columns

    if (board[0] === board[3] && board[0] === board[6] && board[0]) {
      return { winner: board[0], cells: [0, 3, 6] };
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1]) {
      return { winner: board[1], cells: [1, 4, 7] };
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2]) {
      return { winner: board[2], cells: [2, 5, 8] };
    }

    //Diagonals

    if (board[0] === board[4] && board[0] === board[8] && board[0]) {
      return { winner: board[0], cells: [0, 4, 8] };
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2]) {
      return { winner: board[2], cells: [2, 4, 6] };
    }

    if (board.every(cell => cell !== null)) {
      return { winner: 'draw' };
    }
    return false;
  }

  checkWin4x4(board: string[]) {
    //Rows

    if (board[0] === board[1] && board[0] === board[2]  && board[0] === board[3] && board[0]) {
      return { winner: board[0], cells: [0, 1, 2, 3] };
    }

    if (board[4] === board[5] && board[4] === board[6] && board[4] === board[7] && board[4]) {
      return { winner: board[4], cells: [4, 5, 6, 7] };
    }

    if (board[8] === board[9] && board[8] === board[10] && board[8] === board[11] && board[8]) {
      return { winner: board[8], cells: [8, 9, 10, 11] };
    }

    if (board[12] === board[13] && board[12] === board[14] && board[12] === board[15] && board[12]) {
      return { winner: board[12], cells: [12, 13, 14, 15] };
    }

    //Columns

    if (board[0] === board[4] && board[0] === board[8] && board[0] === board[12] && board[0]) {
      return { winner: board[0], cells: [0, 4, 8, 12] };
    }

    if (board[1] === board[5] && board[1] === board[9] && board[1] === board[13] && board[1]) {
      return { winner: board[1], cells: [1, 5, 8, 13] };
    }

    if (board[2] === board[6] && board[2] === board[10] && board[2] === board[14] && board[2]) {
      return { winner: board[2], cells: [2, 6, 10, 14] };
    }

    if (board[3] === board[7] && board[3] === board[11] && board[3] === board[15] && board[3]) {
      return { winner: board[3], cells: [3, 7, 11, 15] };
    }

    //Diagonals

    if (board[0] === board[5] && board[0] === board[10] && board[0] === board[15] && board[0]) {
      return { winner: board[0], cells: [0, 5, 10, 15] };
    }

    if (board[3] === board[6] && board[3] === board[9] && board[3] === board[12] && board[3]) {
      return { winner: board[3], cells: [3, 6, 9, 12] };
    }

    //Squares

    if (board[0] === board[1] && board[0] === board[4] && board[0] === board[5] && board[0]) {
      return { winner: board[0], cells: [0, 1, 4, 5] };
    }

    if (board[2] === board[3] && board[2] === board[6] && board[2] === board[7] && board[2]) {
      return { winner: board[2], cells: [2, 3, 6, 7] };
    }

    if (board[8] === board[9] && board[8] === board[12] && board[8] === board[13] && board[8]) {
      return { winner: board[8], cells: [8, 9, 12, 13] };
    }

    if (board[10] === board[11] && board[10] === board[14] && board[10] === board[15] && board[10]) {
      return { winner: board[10], cells: [10, 11, 14, 15] };
    }

    if (board[1] === board[2] && board[1] === board[5] && board[1] === board[6] && board[1]) {
      return { winner: board[1], cells: [1, 2, 5, 6] };
    }

    if (board[4] === board[5] && board[4] === board[8] && board[4] === board[9] && board[4]) {
      return { winner: board[4], cells: [4, 5, 8, 9] };
    }

    if (board[9] === board[10] && board[9] === board[13] && board[9] === board[14] && board[9]) {
      return { winner: board[9], cells: [9, 10, 13, 14] };
    }

    if (board[6] === board[7] && board[6] === board[10] && board[6] === board[11] && board[6]) {
      return { winner: board[6], cells: [6, 7, 10, 11] };
    }

    if (board[5] === board[6] && board[5] === board[9] && board[5] === board[10] && board[5]) {
      return { winner: board[5], cells: [5, 6, 9, 10] };
    }

    //Diamonds

    if (board[1] === board[4] && board[1] === board[6] && board[1] === board[9] && board[1]) {
      return { winner: board[1], cells: [1, 4, 6, 9] };
    }

    if (board[2] === board[5] && board[2] === board[7] && board[2] === board[10] && board[2]) {
      return { winner: board[2], cells: [2, 5, 7, 10] };
    }

    if (board[5] === board[8] && board[5] === board[10] && board[5] === board[13] && board[5]) {
      return { winner: board[5], cells: [5, 8, 10, 13] };
    }

    if (board[6] === board[9] && board[6] === board[11] && board[6] === board[14] && board[6]) {
      return { winner: board[6], cells: [6, 9, 11, 14] };
    }


    if (board.every(cell => cell !== null)) {
      return { winner: 'draw' };
    }
    return false;
  }



  writeWinner(winner) {
    this.isGameOver = true;
    this.winner = winner;
    if (winner.winner === 'draw') {
      this.isTie = true;
      this.winner.text = 'It is a draw!';
    } else if (winner.winner === this.player2) {
      this.winner.text = 'You lost!';
    } else if (winner.winner === this.player1) {
      // impossible :)
      this.winner.text = 'You won!';
    }
  }











}
