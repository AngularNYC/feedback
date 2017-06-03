import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  questionsJson;
  constructor(private firebaseDb: AngularFireDatabase) { }

  ngOnInit() {
  }

  start(){
    let session = JSON.parse(this.questionsJson);
    session['currentQuestionId'] = 0;
    this.firebaseDb.list('/sessions').take(1).subscribe(sessions => {
      let pin = Math.floor(Math.random() * 1000) + 1;
      while(sessions.find(x => x.pin === pin)){
        pin = Math.floor(Math.random() * 1000) + 1;
      }
      session['pin'] = pin;
      this.firebaseDb.list('/sessions').push(session);
    });
  }
}
