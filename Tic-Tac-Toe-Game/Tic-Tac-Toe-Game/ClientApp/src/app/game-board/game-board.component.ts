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

  board: string[] = [];
  humanPlayer: string;
  aiPlayer: string;
  xIsNext: boolean;
  winner: string;
  isTie: boolean;
  isGameOver = true;

  xWins: number;
  oWins: number;

  constructor() { }

  ngOnInit() {
    this.newGame();
    this.xWins = 0;
    this.oWins = 0;
    this.isTie = false;
    this.aiPlayer = 'O';
    this.humanPlayer = 'X';
    this.isGameOver = false;

    
  }

  newGame() {
    console.log("newGame init begin");
    this.board = Array(9).fill(null);
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

 /*
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


 */

  onMoveWithAI(index: number) {
    if (this.isGameOver) {
      return;
    }
    if (this.board[index] === null) {
      this.board[index] = this.humanPlayer;
      const winner = this.checkWin(this.board);
      if (winner) {
        this.writeWinner(winner);
        if (winner.winner == 'X')
          this.xWins++;

        else
          this.oWins++;
      } else {
        this.onMoveAi();
      }
    }
  }

  private onMoveAi() {
    const index = this.minMax(this.board, 0, this.aiPlayer);
    this.board[index] = this.aiPlayer;
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
    const result = this.checkWin(board);
    if (result) {
      if (result.winner === this.humanPlayer) {
        return -100 + depth;
      } else if (result.winner === this.aiPlayer) {
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
          player === this.humanPlayer ? this.aiPlayer : this.humanPlayer
        );
        moves.push({
          index: i,
          score: score,
        });
      }
    });

    const minOrMax =
      player === this.humanPlayer
        ? Math.min(...moves.map(x => x.score))
        : Math.max(...moves.map(x => x.score));

    const move = moves.find(x => x.score === minOrMax);
    if (depth === 0) {
      return move.index;
    } else {
      return move.score;
    }
  }

  checkWin(board: string[]) {
    if (board[0] === board[1] && board[0] === board[2] && board[0]) {
      return { winner: board[0], cells: [0, 1, 2] };
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3]) {
      return { winner: board[3], cells: [3, 4, 5] };
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6]) {
      return { winner: board[6], cells: [6, 7, 8] };
    }

    if (board[0] === board[3] && board[0] === board[6] && board[0]) {
      return { winner: board[0], cells: [0, 3, 6] };
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1]) {
      return { winner: board[1], cells: [1, 4, 7] };
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2]) {
      return { winner: board[2], cells: [2, 5, 8] };
    }

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

  writeWinner(winner) {
    this.isGameOver = true;
    this.winner = winner;
    if (winner.winner === 'draw') {
      this.isTie = true;
      this.winner.text = 'It is a draw!';
    } else if (winner.winner === this.aiPlayer) {
      this.winner.text = 'You lost!';
    } else if (winner.winner === this.humanPlayer) {
      // impossible :)
      this.winner.text = 'You won!';
    }
  }











}
