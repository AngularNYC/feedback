import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAuthorComponent } from './quiz-author.component';

describe('QuizAuthorComponent', () => {
  let component: QuizAuthorComponent;
  let fixture: ComponentFixture<QuizAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
