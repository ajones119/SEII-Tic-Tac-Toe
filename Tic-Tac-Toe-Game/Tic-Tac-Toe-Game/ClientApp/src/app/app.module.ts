import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { SquareComponent } from './square/square.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LocalMultiplayerComponent } from './local-multiplayer/local-multiplayer.component';
import { SinglePlayerVsAIComponent } from './single-player-vs-ai/single-player-vs-ai.component';
import { AIVsAIComponent } from './ai-vs-ai/ai-vs-ai.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GameBoardComponent,
    SquareComponent,
    LocalMultiplayerComponent,
    SinglePlayerVsAIComponent,
    AIVsAIComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'LocalMultiplayer/:BoardSize', component: LocalMultiplayerComponent, pathMatch: 'full' },
      { path: 'SinglePlayerVsAI/:BoardSize', component: SinglePlayerVsAIComponent, pathMatch: 'full' },
      { path: 'AIvsAI/:BoardSize', component: AIVsAIComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
