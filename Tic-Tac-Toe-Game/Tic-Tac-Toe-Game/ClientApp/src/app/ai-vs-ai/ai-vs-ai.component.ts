import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-vs-ai',
  templateUrl: './ai-vs-ai.component.html',
  styleUrls: ['./ai-vs-ai.component.css']
})
export class AIVsAIComponent implements OnInit {

  GameType: string;

  constructor() { }

  ngOnInit() {
    this.GameType = 'AIvsAI';
  }
}
