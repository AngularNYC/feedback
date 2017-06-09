import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/take';
import {isCombinedNodeFlagSet} from "tslint";

@Component({
  selector: 'app-create-quiz',
  templateUrl: 'create-quiz.component.html',
  styleUrls: ['create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  questionsJson;
  pin: number;
  sessionKey;
  @Output()
  started = new EventEmitter();
  constructor(private firebaseDb: AngularFireDatabase) { }

  ngOnInit() {
  }

  create(){
    let session = JSON.parse(this.questionsJson);
    this.firebaseDb.list('/sessions').take(1).subscribe(sessions => {
      let pin = Math.floor(Math.random() * 1000) + 1;
      while(sessions.find(x => x.pin === pin)){
        pin = Math.floor(Math.random() * 1000) + 1;
      }
      session['pin'] = pin;
      session['currentQuestionId'] = -1;
      this.sessionKey = this.firebaseDb.list('/sessions').push(session).key;
      this.pin = pin;
    });
  }
  start(){
    this.started.next(this.sessionKey);
  }
}
