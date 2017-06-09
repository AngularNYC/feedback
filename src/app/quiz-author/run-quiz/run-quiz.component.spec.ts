import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunQuizComponent } from './run-quiz.component';

describe('RunQuizComponent', () => {
  let component: RunQuizComponent;
  let fixture: ComponentFixture<RunQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
