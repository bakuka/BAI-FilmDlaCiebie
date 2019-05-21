import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../models/Films';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  valueOfSlider=0;

  films: Film[];
  filteredSkippedFilms: Film[] = []; /*the list of film after filtering, which has been skipped by user*/
  filteredOptionsMin: Observable<string[]>;
  filteredOptionsMax: Observable<string[]>;
  public genresTab :string[];

  getGenres(){
    return this.genresTab;
  }

  //START years LOV initialization
  yearsMinForm = new FormControl();
  yearsMinTable: string[] = this.getYears();

  yearsMaxForm = new FormControl();
  yearsMaxTable: string[] = this.getYears();
  //END years LOV

  //START genres LOV initialization
  movieGenre = new FormControl();
  movieGenreList: string[] = [""]; 
  //END genres LOV

  //START countries LOV initialization
  filmCountry = new FormControl();
  filmCountryList: string[] = [""];
  //End - countries LOV

  constructor(private filmService: FilmService,) { }

  /*YT*/
  player: YT.Player;
  private id: string = 'kRPhuj8f_3U';

  savePlayer (player){
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event){
    console.log('player state',event.data);
  }
  /*****/

  ngOnInit() {
    console.log('ngOnInit run');
    this.filmService.getFilms().subscribe(films => {
      this.films = films;
      this.movieGenreList = this.getAllGenres();
      this.filmCountryList = this.getAllCountries();
    });

    

    this.filteredOptionsMin = this.yearsMinForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMin(value))
    );  

    this.filteredOptionsMax = this.yearsMaxForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMax(value))
    );
  }

  getAllCountries() {
    var countriesArray: string[];
    countriesArray = [""];
    countriesArray.pop();

    for (var i = 0; i < this.films.length; i++) {
      for (var j = 0; j < this.films[i].countries.length; j++) {
        countriesArray.push(this.films[i].countries[j]);
      }
    }

    /*remove duplicate*/
    countriesArray = countriesArray.filter((el, i, a) => i === a.indexOf(el))
    countriesArray.sort();

    return countriesArray;
  }

  getAllGenres() :string[] {
    var genresArray: string[];
    genresArray = [""];
    genresArray.pop();

    for (var i = 0; i < this.films.length; i++) {
      for (var j = 0; j < this.films[i].genres.length; j++) {
        genresArray.push(this.films[i].genres[j]);
      }
    }

    /*remove duplicate*/
    genresArray = genresArray.filter((el, i, a) => i === a.indexOf(el))
    genresArray.sort();

    return genresArray;
  }

  clickRandomFilm() {
    var chooseFilm: Film;
    var minYearFilter :string = this.yearsMinForm.value;
    var maxYearFilter :string = this.yearsMaxForm.value;
    var movieGenres :string[] = this.movieGenre.value;
    var movieCountries :string[] = this.filmCountry.value;

    /* if fields are null, this is the support of it*/
    if (minYearFilter == null || minYearFilter == ""){
      minYearFilter = "1850";
    }
    if (maxYearFilter == null || minYearFilter == ""){
      maxYearFilter = "2050";
    }   
    if (this.movieGenre.value == ""){
      movieGenres = null;
    }
    if (this.filmCountry.value == ""){
      movieCountries = null;
    }
    /*****/

    var filteredFilms: Film[] = [];
    filteredFilms = this.filterFilms(this.films, minYearFilter, maxYearFilter, movieGenres, movieCountries, this.valueOfSlider );

    if (filteredFilms.length == 0  ){
      window.alert("brak filmu z podanymi kryteriami");
    }else if( filteredFilms.length == 1){
      chooseFilm = filteredFilms[0];
      window.alert(chooseFilm.tittle +" - " +chooseFilm.score + " - " + chooseFilm.year+ " - " + chooseFilm.genres + " - " + chooseFilm.countries );

      this.filteredSkippedFilms.push(chooseFilm) /* adding to skipped list*/
    }else{
      chooseFilm = this.randomFilm(filteredFilms);
      window.alert(chooseFilm.tittle +" - " +chooseFilm.score + " - " + chooseFilm.year+ " - " + chooseFilm.genres + " - " + chooseFilm.countries );

      this.filteredSkippedFilms.push(chooseFilm) /* adding to skipped list*/
    }
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
                                                        for (var i = 0; i < this.filteredSkippedFilms.length; i++){ 
                                                          if ( this.filteredSkippedFilms[i].id == filterData.id){
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

  private _filterMin(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.yearsMinTable.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterMax(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.yearsMaxTable.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getYears() :string[] {
    var years :string[] = [];
    for (var i = 1950; i < 2030; i++) {
      years.push(i.toString());
    }
    return years;
  }
}




