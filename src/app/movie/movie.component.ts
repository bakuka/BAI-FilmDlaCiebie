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

  /*page binds*/
  pageFilmTitle :string;
  pageFilmYear :number;
  pagefilmScore :number;
  pageFilmGenres: string[];
  pageFilmCountries: string[];
  pageimgURL: string;
  /*******/

  constructor(private router: Router) {
    this.initializePage();
  }

  ngOnInit() {
  }

  initializePage(){
    this.choosedFilm = this.router.getCurrentNavigation().extras.state.filmObj;
    this.skippedFilms = this.router.getCurrentNavigation().extras.state.skippedFilms;
    this.filterProperty = this.router.getCurrentNavigation().extras.state.filterObj;
    this.filmsList = this.router.getCurrentNavigation().extras.state.filmsList;

    this.pageFilmTitle = this.choosedFilm.tittle;
    this.pageFilmYear = this.choosedFilm.year;
    this.pagefilmScore = this.choosedFilm.score;
    this.pageFilmGenres = this.choosedFilm.genres;
    this.pageFilmCountries = this.choosedFilm.countries;
    this.pageimgURL = this.choosedFilm.imgURL;
  }

}
