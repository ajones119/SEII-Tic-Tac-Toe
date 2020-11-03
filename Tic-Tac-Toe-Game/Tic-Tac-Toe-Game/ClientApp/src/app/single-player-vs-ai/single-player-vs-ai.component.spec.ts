import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayerVsAIComponent } from './single-player-vs-ai.component';

describe('SinglePlayerVsAIComponent', () => {
  let component: SinglePlayerVsAIComponent;
  let fixture: ComponentFixture<SinglePlayerVsAIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePlayerVsAIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerVsAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
