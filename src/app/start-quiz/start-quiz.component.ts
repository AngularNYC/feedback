import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  isError = false;
  pin;
  constructor(private router: Router) {}

  ngOnInit() {
  }

  start(){
    if(this.pin) { //todo add template validation
      this.router.navigate(['quiz',this.pin]);
    }
  }

}
