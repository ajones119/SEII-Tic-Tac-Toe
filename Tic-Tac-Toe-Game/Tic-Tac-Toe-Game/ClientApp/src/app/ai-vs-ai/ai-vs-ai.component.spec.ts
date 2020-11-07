import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AIVsAIComponent } from './ai-vs-ai.component';

describe('AIVsAIComponent', () => {
  let component: AIVsAIComponent;
  let fixture: ComponentFixture<AIVsAIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AIVsAIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AIVsAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
