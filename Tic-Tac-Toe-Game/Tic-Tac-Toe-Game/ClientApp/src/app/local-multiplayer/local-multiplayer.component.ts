import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-local-multiplayer',
  templateUrl: './local-multiplayer.component.html',
  styleUrls: ['./local-multiplayer.component.css']
})
export class LocalMultiplayerComponent implements OnInit {

  GameType: string;
  BoardSize: string;

  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.GameType = 'Local';
    this.BoardSize = this._Activatedroute.snapshot.paramMap.get("BoardSize");

  }

}
