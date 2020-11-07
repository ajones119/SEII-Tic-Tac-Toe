import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-player-vs-ai',
  templateUrl: './single-player-vs-ai.component.html',
  styleUrls: ['./single-player-vs-ai.component.css']
})
export class SinglePlayerVsAIComponent implements OnInit {

  GameType: string;
  BoardSize: number;

  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.GameType = 'PlayerVsAI';
    this.BoardSize = this._Activatedroute.snapshot.paramMap.get("BoardSize");

  }

}
