import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMultiplayerComponent } from './local-multiplayer.component';

describe('LocalMultiplayerComponent', () => {
  let component: LocalMultiplayerComponent;
  let fixture: ComponentFixture<LocalMultiplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalMultiplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMultiplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
