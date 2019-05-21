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

    if (minYearFilter == null){
      minYearFilter = "1850";
    }
    if (maxYearFilter == null){
      maxYearFilter = "2050";
    }    

    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();  
    filteredFilms = this.filterFilms(this.films, minYearFilter, maxYearFilter, this.movieGenre.value, this.filmCountry.value, this.valueOfSlider );

    if (filteredFilms.length == 0  ){
      window.alert("brak filmu z podanymi kryteriami");
    }else if( filteredFilms.length == 1){
      chooseFilm = filteredFilms[0];
      window.alert(chooseFilm.tittle +" - " +chooseFilm.score + " - " + chooseFilm.year+ " - " + chooseFilm.genres + " - " + chooseFilm.countries );
    }else{
      chooseFilm = this.randomFilm(filteredFilms);
      window.alert(chooseFilm.tittle +" - " +chooseFilm.score + " - " + chooseFilm.year+ " - " + chooseFilm.genres + " - " + chooseFilm.countries );
    }
  }

  filterFilms(films,minYar,maxYear, genresTab, countriesTab, minScore) {
    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();

    var filteredFilms2: Film[];
    filteredFilms2 = [];
    filteredFilms2.pop();

    return filteredFilms = films.filter(filterData => { 
                                                        if (genresTab != null){
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
    for (var i = 1839; i < 2050; i++) {
      years.push(i.toString());
    }
    return years;
  }
}




