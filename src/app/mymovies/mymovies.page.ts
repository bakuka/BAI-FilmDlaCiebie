import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Film } from '../models/Films';
import { FilmService } from '../services/film.service';
import { Filter } from '../models/filters';
import { FilterPage } from '../filter/filter.page';
import { YouTubeSearchService } from '../youtube-search/youtube-search.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mymovies',
  templateUrl: './mymovies.page.html',
  styleUrls: ['./mymovies.page.scss'],
})
export class MymoviesPage implements OnInit {

  userUID: String = null;
  userFilms: Film[];
  userAvoidFilms: Film[];

  constructor(private router: Router, private filmService: FilmService) {}

  
  


ngOnInit() {
}

}
