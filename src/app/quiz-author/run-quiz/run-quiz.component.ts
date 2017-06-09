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
  timeLeft;

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
      this.firebaseDb.object(`/sessions/${this.sessionKey}/`).update({currentQuestionId:this.currentQuestionId});
      this.timeLeft = Number(this.questions[this.currentQuestionId].timer);
      let timer = setInterval(() => {
        this.timeLeft = this.timeLeft - 1;
        if(this.timeLeft <= 0) {
          clearInterval(timer);
          this.next();
        }
      }, 1000);
    }
    else {
      //results, delete session & export data
    }
  }
}
