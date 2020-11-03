import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-player-vs-ai',
  templateUrl: './single-player-vs-ai.component.html',
  styleUrls: ['./single-player-vs-ai.component.css']
})
export class SinglePlayerVsAIComponent implements OnInit {

  GameType: string;

  constructor() { }

  ngOnInit() {
    this.GameType= 'Local';
  }

}
