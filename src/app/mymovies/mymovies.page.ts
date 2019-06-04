import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { Film } from '../models/Films';

@Component({
  selector: 'app-mymovies',
  templateUrl: './mymovies.page.html',
  styleUrls: ['./mymovies.page.scss'],
})
export class MymoviesPage implements OnInit {
  
  userFilms = {} as Film[];
  userUID: String = null;

  constructor(private router: Router) {
    this.userFilms = this.router.getCurrentNavigation().extras.state.filmsUserList;
  }

  ngOnInit() {
  }

  test(){
    console.log("weszlo: "+ this.userFilms.length);
    console.log("test: "+ this.userFilms[1].imgURL);
    console.log("test: "+ this.userFilms[1].tittle);
  }

}
