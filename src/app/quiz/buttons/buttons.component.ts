import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input()
  answers = [
    'ueouoe','uoeu','uoeeo','uouoe'
  ]

  @Output()
  answer = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  buttonClick(index){
    this.answer.next(index);
  }

}
