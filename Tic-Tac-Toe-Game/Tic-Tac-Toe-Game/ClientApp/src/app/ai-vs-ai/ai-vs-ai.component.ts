import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ai-vs-ai',
  templateUrl: './ai-vs-ai.component.html',
  styleUrls: ['./ai-vs-ai.component.css']
})
export class AIVsAIComponent implements OnInit {

  GameType: string;
  BoardSize: string;

  constructor(private _Activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.GameType = 'AIvsAI';
    this.BoardSize = this._Activatedroute.snapshot.paramMap.get("BoardSize");
  }
}
