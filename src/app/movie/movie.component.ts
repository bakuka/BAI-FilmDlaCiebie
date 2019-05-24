import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../models/Films';
import { Filter } from '../models/Filters';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  choosedFilm = {} as Film;
  skippedFilms = {} as Film[];
  filmsList = {} as Film[];
  filterProperty = {} as Filter;

  constructor(private router: Router) {
    this.initializeObjPrvPage();
  }

  ngOnInit() {
  }

  initializeObjPrvPage(){
    this.choosedFilm = this.router.getCurrentNavigation().extras.state.filmObj;
    this.skippedFilms = this.router.getCurrentNavigation().extras.state.skippedFilms;
    this.filterProperty = this.router.getCurrentNavigation().extras.state.filterObj;
    this.filmsList = this.router.getCurrentNavigation().extras.state.filmsList;
  }

}
