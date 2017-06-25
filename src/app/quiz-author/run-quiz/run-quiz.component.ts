import {Component, OnInit, Input} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Component({
  selector: 'app-run-quiz',
  templateUrl: 'run-quiz.component.html',
  styleUrls: ['run-quiz.component.css']
})
export class RunQuizComponent implements OnInit{
  constructor(private firebaseDb: AngularFireDatabase) { }
  currentQuestionId = 0;
  questions = [];
  @Input()
  sessionKey;
  timer;
  timeLeft;
  results;

  ngOnInit(){
    this.firebaseDb.object(`/sessions/${this.sessionKey}`).take(1).subscribe(session => {
      this.questions = Object.keys(session.questions).map(key => session.questions[key]);
      this.currentQuestionId = -1;
      this.next();
    });
  }
  next(){
    if(this.currentQuestionId+1 < (this.questions.length)){
      this.currentQuestionId++;
      this.results = null;
      this.firebaseDb.object(`/sessions/${this.sessionKey}/`).update({currentQuestionId:this.currentQuestionId});
      this.timeLeft = Number(this.questions[this.currentQuestionId].timer);
      this.timer = setInterval(() => {
        this.timeLeft = this.timeLeft - 1;
        if(this.timeLeft <= 0) {
          this.showResults();
        }
      }, 1000);
    }
    else {
      //final results, delete session & export data
    }
  }

  showResults(){
    clearInterval(this.timer);
    this.timeLeft = 0;
    this.firebaseDb.list(`/sessions/${this.sessionKey}/responses/${this.currentQuestionId}`).subscribe(responses => {
      let resultsObject = responses.reduce((acc, val) => {
        acc[val.$value] = acc[val.$value] + 1 || 1;
        return acc;
      }, {});
      this.results = Object.keys(resultsObject).map(key => {
        return {key, count:resultsObject[key]};
      });
    });
  }
}
