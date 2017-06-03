import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  isAnswering = true;
  currentQuestion;
  currentQuestionId = 0;
  questions = [];
  pin:number;
  nickname = 'Sam';
  session;
  constructor(private firebaseDb: AngularFireDatabase,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.pin = Number(this.route.snapshot.params['id']);
    this.nickname = this.route.snapshot.params['nickname'];
    this.firebaseDb.list('/sessions')
      .map(sessions => sessions.find(session => session.pin === this.pin))
      .subscribe(session => {
        if(!session){
          this.router.navigate(['']); 
        }
        this.session = session;
        this.questions = Object.keys(session.questions).map(key => {return session.questions[key]});
        this.firebaseDb.object(`/sessions/${session.$key}/currentQuestionId`).map(x => x.$value).subscribe(id => {
          this.currentQuestion = this.questions[id];
          this.currentQuestion.answers = Object.keys(this.currentQuestion.answers).map(key => {return this.currentQuestion.answers[key]});
          this.isAnswering = true;
        });
      });
  }

  answered(answerIndex){
    this.firebaseDb.list(`/sessions/${this.session.$key}/responses/${this.currentQuestionId}`).push({
      nickname:this.nickname,
      answerIndex
    });
    this.isAnswering = false;
  }

}
