import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {RouterModule, Routes} from '@angular/router';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { ButtonsComponent } from './quiz/buttons/buttons.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';

const firebaseConfig = {
    apiKey: "AIzaSyBJq3l-gXZEP1z2_yWOsJJRt1TuvE1ItdI",
    authDomain: "meetup-feedback.firebaseapp.com",
    databaseURL: "https://meetup-feedback.firebaseio.com",
    projectId: "meetup-feedback",
    storageBucket: "meetup-feedback.appspot.com",
    messagingSenderId: "359670169522"
};
const routes: Routes = [
  {
    path: 'create',
    component: CreateQuizComponent
  },
  {
    path:'',
    component: StartQuizComponent
  },
  {
    path:'quiz/:id',
    component: QuizComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    QuizComponent,
    ButtonsComponent,
    StartQuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {
}
