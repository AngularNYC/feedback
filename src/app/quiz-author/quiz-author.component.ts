import {Component, OnInit, ViewChild} from '@angular/core';
import {RunQuizComponent} from "./run-quiz/run-quiz.component";

@Component({
  selector: 'app-quiz-author',
  templateUrl: './quiz-author.component.html',
  styleUrls: ['./quiz-author.component.css']
})
export class QuizAuthorComponent implements OnInit {
  isStarted = false;
  sessionKey;
  constructor() { }

  ngOnInit() {
  }
  start(sessionKey){
    this.isStarted = true;
    this.sessionKey = sessionKey;
  }
}
