import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../models/Films';
import { Filter } from '../models/Filters';
import { FilterComponent } from '../filter/filter.component';
import { YouTubeSearchService } from '../youtube-search/youtube-search.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

@Component({
  selector: 'custom-counter',
  template: `
    <button (click)="decrement()">-</button>
    <span>{{counter}}</span>
    <button (click)="increment()">+</button>
  `
})

export class MovieComponent implements OnInit {

  /*YT*/
  player: YT.Player;

  savePlayer (player){
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event){
  }
  /*****/

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
  filterReference :FilterComponent;
  /*******/
  show: boolean = false;

  constructor(private router: Router,
              private youtube: YouTubeSearchService) {
                this.initializePage();
  }

  ngOnInit() {
  }

  initializePage(){
    this.choosedFilm = this.router.getCurrentNavigation().extras.state.filmObj;
    this.skippedFilms = this.router.getCurrentNavigation().extras.state.skippedFilms;
    this.filterProperty = this.router.getCurrentNavigation().extras.state.filterObj;
    this.filmsList = this.router.getCurrentNavigation().extras.state.filmsList;

    this.bindVariables(this.choosedFilm);
  }

  bindVariables(film :Film){
    this.pageFilmTitle = film.tittle;
    this.pageFilmYear = film.year;
    this.pagefilmScore = film.score;
    this.pageFilmGenres = film.genres;
    this.pageFilmCountries = film.countries;
    this.pageimgURL = film.imgURL;

    this.youtube.search(film.tittle + "zwiastun PL").switch().subscribe(); / load trailer from YT /
  }

  clickRandomNextFilm() {   
    var chooseFilm: Film;
    var minYearFilter :number = this.filterProperty.minYear;
    var maxYearFilter :number = this.filterProperty.maxYear;
    var movieGenres :string[] = this.filterProperty.genres;
    var movieCountries :string[] = this.filterProperty.countries;

    var filteredFilms: Film[] = [];
    filteredFilms = this.filterFilms(this.filmsList, minYearFilter, maxYearFilter, movieGenres, movieCountries, this.filterProperty.score );

    if (filteredFilms.length == 0  ){
      window.alert("brak filmu z podanymi kryteriami");
    }else if( filteredFilms.length == 1){
      chooseFilm = filteredFilms[0];
      this.skippedFilms.push(chooseFilm) /* adding to skipped list*/
    }else{
      chooseFilm = this.randomFilm(filteredFilms);
      this.skippedFilms.push(chooseFilm) /* adding to skipped list*/
    }
    this.bindVariables(chooseFilm);
    
    /***turn off the trialer*/
    this.show = false;
    this.player.stopVideo();
    /*****/
  }

  filterFilms(films,minYar,maxYear, genresTab, countriesTab, minScore) {
    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();

    return filteredFilms = films.filter(filterData => { 
                                                        if (genresTab != null ){
                                                          var checkFilmGenre :Boolean = false;
                                                          for (var i = 0; i < filterData.genres.length; i++){ 
                                                            for (var j = 0; j < genresTab.length; j++){
                                                              if (filterData.genres[i] == genresTab[j]){
                                                                checkFilmGenre = true;
                                                              }
                                                            }
                                                          }
                                                          if (checkFilmGenre == false ){
                                                            return null;
                                                          }
                                                        }
                                                        if (countriesTab != null ){
                                                          var checkFilmCountries :Boolean = false;
                                                          for (var i = 0; i < filterData.countries.length; i++){ 
                                                            for (var j = 0; j < countriesTab.length; j++){
                                                              if (filterData.countries[i] == countriesTab[j]){
                                                                checkFilmCountries = true;
                                                              }
                                                            }
                                                          }
                                                          if (checkFilmCountries == false ){
                                                            return null;
                                                          }
                                                        }
                                                        
                                                        /* checking if the film has been choosen before, if yes, it cannot be choosen*/
                                                        for (var i = 0; i < this.skippedFilms.length; i++){ 
                                                          if ( this.skippedFilms[i].id == filterData.id){
                                                            return null;
                                                          }
                                                        }
                                                        /********* */

                                                        return filterData.year >= Number.parseFloat(minYar) && filterData.year <= Number.parseFloat(maxYear) 
                                                                && filterData.score >= minScore;
                                                      }
                                        );
  }
  
  randomFilm(films: Film[]) {
    var random = Math.floor(Math.random() * (films.length - 1) + 1);
    return films[random];
  }

  clickTrailer(){
    this.show = true;
    this.player.loadVideoById(String(this.youtube.getFilmId()));
  }

}
